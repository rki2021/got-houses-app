import * as React from 'react'
import { getQuotes } from '../api/quotes-api'
import { Quote } from '../types/Quote'

import { Grid, Header, Icon, Card, Rating} from 'semantic-ui-react'

  interface QuotesState {
    quotes: Quote[]
    amount: number
}

export default class Quotes extends React.PureComponent {

    state: QuotesState = {
        quotes: [],
        amount: 4
    }

    // async componentDidMount() {
    //     try {
    //         const fetchedQuotes =  await getQuotes(this.state.amount)
    //         this.setState({
    //             quotes: fetchedQuotes
    //         })
            
    //     } catch (e) {
    //         alert(`Error fetching houses: ${e.message}`)
    //     }
    // }

    render() {
        return(
            <Grid padded>
                <Grid.Row centered>
                     <Header as="h1"><Icon name="group" /> What users say</Header>
                </Grid.Row>
                <Grid.Row>
                    <Card.Group itemsPerRow="4" stackable>
                        <Card color="grey" style={{ paddingTop: "1em", paddingBottom: "1em"}}>
                            <Card.Content >
                                <Card.Header>Tyrion Lannister</Card.Header>
                                <Card.Meta>
                                    <Icon
                                        name="home"
                                        size="small"
                                        style={{ marginRight: "0.4em" }}/>
                                            { "House Lannister" }
                                </Card.Meta>
                                <Card.Description>
                                “Never forget what you are. The rest of the world will not. Wear it like armor, and it can never be used to hurt you.”
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra className="ratingHome">
                                <Rating size="large" defaultRating={5} maxRating={5} className="ratingClass" />
                            </Card.Content>
                        </Card>


                        <Card color="grey" style={{ paddingTop: "1em", paddingBottom: "1em"}}>
                            <Card.Content >
                                <Card.Header>Lyanna Mormont</Card.Header>
                                <Card.Meta>
                                    <Icon
                                        name="home"
                                        size="small"
                                        style={{ marginRight: "0.4em" }}/>
                                            { "House Mormont" }
                                </Card.Meta>
                                <Card.Description>
                                “I don’t plan on knitting by the fire while men fight for me. I might be small, Lord Glover, and I might be a girl, but I am every bit as much a Northerner as you… and I don’t need your permission to defend the North.”
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra className="ratingHome">
                                <Rating size="large" defaultRating={3} maxRating={5} className="ratingClass" />
                            </Card.Content>
                        </Card>

                        <Card color="grey" style={{ paddingTop: "1em", paddingBottom: "1em"}}>
                            <Card.Content >
                                <Card.Header>Tywin Lannister</Card.Header>
                                <Card.Meta>
                                    <Icon
                                        name="home"
                                        size="small"
                                        style={{ marginRight: "0.4em" }}/>
                                            { "House Lannister" }
                                </Card.Meta>
                                <Card.Description>
                                “Any man who must say, ‘I am the king,’ is no true king. I’ll make sure you understand that when I’ve won your war for you.”
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra className="ratingHome">
                                <Rating size="large" defaultRating={3} maxRating={5} className="ratingClass" />
                            </Card.Content>
                        </Card>

                        <Card color="grey" style={{ paddingTop: "1em", paddingBottom: "1em"}}>
                            <Card.Content >
                                <Card.Header>Lord Varys</Card.Header>
                                <Card.Meta>
                                    <Icon
                                        name="home"
                                        size="small"
                                        style={{ marginRight: "0.4em" }}/>
                                            { "Unknown house" }
                                </Card.Meta>
                                <Card.Description>
                                “Power resides where men believe it resides. It’s a trick, a shadow on the wall. And a very small man can cast a very large shadow.”
                                </Card.Description>
                            </Card.Content>
                            <Card.Content extra className="ratingHome">
                                <Rating size="large" defaultRating={5} maxRating={5} className="ratingClass" />
                            </Card.Content>
                        </Card>



                    {/* { this.state.quotes.map((quote, pos) => {

                      return (
                        <Card color="brown" style={{ paddingTop: "1em", paddingBottom: "1em"}}>
                            <Card.Content >
                                <Card.Header>{ quote.character.name }</Card.Header>
                                <Card.Meta>
                                    <Icon
                                        name="home"
                                        size="small"
                                        style={{ marginRight: "0.4em" }}/>
                                            { quote.character.house.name || "Unknown house" }
                                </Card.Meta>
                                <Card.Description>
                                    { quote.sentence }
                                </Card.Description>
                            </Card.Content>
                        </Card>
                )
            })} */}
                    </Card.Group>
                </Grid.Row>
            </Grid>
        )
        
    }
}