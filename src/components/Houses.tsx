import * as React from 'react'
import { getHouses, getHouse, getCharacter } from '../api/got-api'
import { House } from '../types/House'
import { images, shuffle, imagesLength, getRandomRating, sleep } from '../helpers'

import { Modal, Button, Grid, Header, Image, Loader, Card,  Icon, List, Container, Rating, Divider } from 'semantic-ui-react'

interface HousesState {
    houses: House[]
    loadingHouses: boolean
    page: number
    perPage: number
    currentHouse: House
    modalOpen: boolean
}

export interface HousesProps {}

export class Houses extends React.Component<HousesProps, HousesState>  {
    
    _isMounted = false

    constructor(props: HousesProps) {
        super(props)
    }

    state: HousesState = {
        houses: [],
        loadingHouses: true,
        page: 1,
        perPage: 8,
        currentHouse: Object(),
        modalOpen: false
    }

    handleLoadMore = () => {
        this.setState((prevState: any) => ({ page: prevState.page + 1 }))
    }

    handleModalClick(house: House) {

        this.setState({ modalOpen: true })
        this.setState({ currentHouse: house})
    }

    async componentDidMount() {
        this._isMounted = true
        await this.loadHouses()
    }

    async componentDidUpdate(prevProps: any, prevState: any) {
        if (prevState.page !== this.state.page) {
            this.loadHouses()
        }
    }

    async componentWillUnmount() {
        this._isMounted = false
    }

    async loadHouses() {
        
        const { page, perPage } = this.state
        this.setState({ loadingHouses: true })

        // Visualizing delay for loading 
        await sleep(1000)

        try {
            const fetchedHouses =  await getHouses(page, perPage)

            if (fetchedHouses.length != 0) {

                const numbers = []
                for (var i=1; i <= imagesLength; i++) {
                    numbers.push(i)
                }
                var nums = shuffle(numbers)

                fetchedHouses.map((house: any) => {
                    house.imageId = nums.next().value
                    house.rating = getRandomRating([1,2,3,4,5])
                })

                await fetchedHouses.map(async (house) => {
                    if(house.overlord) {
                        house.overlordName = await this.getOverlordNameFromUrl(house.overlord)
                    }

                    if(house.currentLord) {
                        house.currentLordName = await this.getCharacterFromUrl(house.currentLord)
                    }

                    if(house.founder) {
                        house.founderName = await this.getCharacterFromUrl(house.founder)
                    }

                    const members: any[] = []
                    if(house.swornMembers) {
                        await house.swornMembers.map(async(url) => (members.push(await this.getCharacterFromUrl(url))))
                    }
                    house.swornMemberArr = members
                })

                if (this._isMounted) {
                    this.setState((prevState: any) => ({
                        houses: [...prevState.houses, ...fetchedHouses],
                        loadingHouses: false
                    }))
                }
            } else {
                this.setState({
                    loadingHouses: false
                })
            }
            
        } catch (e) {
            alert(`Error fetching houses: ${e.message}`)
        }
    }

    async getOverlordNameFromUrl(url: string) {
        const strArr = url.split('/')
        const houseId = parseInt(strArr[strArr.length - 1])
        try {
            const fetchedHouse = await getHouse(houseId)
            if (typeof fetchedHouse !== "undefined") {
                return fetchedHouse.name
            }
        } catch (e) {
            alert(`Error fetching overlord: ${e.message}`)
        }
    }

    async getCharacterFromUrl(url: string) {
        const strArr = url.split('/')
        const characterId = parseInt(strArr[strArr.length - 1])
        try {
            const fetchedCharacter = await getCharacter(characterId)
            if (typeof fetchedCharacter !== "undefined") {
                return fetchedCharacter.name
            }
        } catch (e) {
            alert(`Error fetching character: ${e.message}`)
        }
    }

    renderHouses() {

        return(
            <Card.Group itemsPerRow="4" stackable>
                { this.state.houses.map((house, pos) => {

                    // Get the house id from the url (last element of string)
                    const strArr = house.url.split('/')
                    house.id = parseInt(strArr[strArr.length - 1])

                    return(
                            <Card key={ house.id } color="grey" >
                                <Image src={ images[`got${house.imageId}.png`]} size="medium" disabled />
                                <Card.Content>
                                    <Card.Meta> <p># { house.id }</p><p></p></Card.Meta>
                                    
                                    <Card.Header>{ house.name }</Card.Header>
                                    <Card.Description>
                                        Located in { house.region || '<unknown>' }
                                    </Card.Description>
                                    <Card.Description style={{ marginTop: 20}}>
                                        <Rating  defaultRating={house.rating} maxRating={5}  disabled />
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                                <Button color="grey" onClick={ () => this.handleModalClick(house) } >
                                                        Details
                                                </Button>
                                </Card.Content>
                            </Card>
                    )
                }) 
            }
            </Card.Group>
        )
    }

    renderModal() {

            const house = this.state.currentHouse
            const members = this.state.currentHouse.swornMemberArr

        return(
            <Modal
            onClose={() => this.setState({ modalOpen:  false })}
            onOpen={() =>  this.setState({ modalOpen:  true })}
            open={ this.state.modalOpen }
            >
            <Modal.Header>{ house.name }  (<Icon name="map" /> { this.state.currentHouse.region })</Modal.Header>
            <Modal.Content image>
                        <Image src={ images[`got${house.imageId}.png`]} size='medium' disabled wrapped />
                        
                <Modal.Description>
                        <List>
                            <List.Item className="listItem">
                                <div className="listIcon">  
                                    <List.Icon name='info' size='large' verticalAlign='top' />
                                </div>
                                <List.Content>
                                    <List.Header>Info</List.Header>
                                    <List.Description>{ (house.founderName || house.founded) ? (`${house.name} was founded ${house.founderName ? 'by '+ house.founderName : ''} ${house.founded ? ' in '+ house.founded : ''}`) : '-' }</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item className="listItem">
                                <div className="listIcon">
                                    <List.Icon name='flag' size='large' verticalAlign='top' />
                                </div>
                                <List.Content>
                                    <List.Header>Coat of Arms</List.Header>
                                    <List.Description>{ house.coatOfArms ? house.coatOfArms : '-' }</List.Description>
                                </List.Content>
                            </List.Item>

                            <List.Item className="listItem">
                                <div className="listIcon">
                                    <List.Icon name='male' size='large' verticalAlign='top' />
                                </div>
                                <List.Content>
                                    <List.Header>Current Lord</List.Header>
                                    <List.Description>{ house.words ? house.currentLordName : '-' }</List.Description>
                                </List.Content>
                            </List.Item >

                            <List.Item  className="listItem">
                                <div className="listIcon">
                                    <List.Icon name='chess king' size='large' verticalAlign='top' />
                                </div>
                                <List.Content>
                                    <List.Header>Current Overlord</List.Header>
                                    <List.Description>{ house.overlord ? house.overlordName : '-' }</List.Description>
                                </List.Content>
                            </List.Item>
                            <List.Item>
                                <div className="listIcon">
                                    <List.Icon name='group' size='large' verticalAlign='top' />
                                </div>
                                <List.Content>
                                    <List.Header>Sworn Members</List.Header>
                                    <List.Description>
                                        <List className="membersList" >
                                        { members ? members.map((name) => <List.Item>{name}</List.Item>) : '-' }
                                        </List>
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        </List>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Rating size="large" defaultRating={house.rating} maxRating={5} className="ratingClass"  disabled/>
                <Button color='black' onClick={() =>  this.setState({ modalOpen:  false})}>
                Go Back
                </Button>
            </Modal.Actions>
        </Modal>
        
        )
    }

    renderLoading() {
        return(
            <Grid.Row>
                <Loader indeterminate active inline="centered">
                    Loading Houses
                </Loader>
            </Grid.Row>

        )
    }

    renderLoadButton() {
        return(
            <div>
                <Button
                    color="black"
                    content="Load more"
                    size="large"
                    icon="plus"
                    onClick={ this.handleLoadMore }
                    >
                </Button>
            </div>
        )
    }
    render () {
        
        return (
            <Container>
                <Grid padded={true} centered>
                    <Grid.Row centered>
                        <Divider></Divider>
                        <Header as="h1" dividing>Game of Thrones - Houses</Header>
                        <Divider></Divider>
                    </Grid.Row>
                        <Grid.Row centered>
                            { this.state.modalOpen && this.renderModal() }
                            { this.renderHouses() }
                        </Grid.Row>
                    <Grid.Row className="centered padded">
                        { this.state.loadingHouses ? this.renderLoading() : this.renderLoadButton() }
                    </Grid.Row>
                </Grid>
            </Container>
        )
    }
}