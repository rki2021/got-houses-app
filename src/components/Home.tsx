import * as React from 'react'
import { Link } from 'react-router-dom'
import Quotes from './Quotes'

import { Container, Button, Header, Segment, Icon, Divider } from 'semantic-ui-react'

export default class Home extends React.Component {

    render() {
        return(
            <Container >
                <Divider></Divider>
                <Segment className="welcome-banner">
        
                    <div className="banner-message">
                                <Header inverted as="h1" style={{ fontSize: '4em' }}>
                                        Game of Thrones App
                                </Header>
                                <Header inverted as="h3" style={{"width": "45%"}}>
                                        This is a small simple GoT houses discovery app. Chose from 444 different
                                        houses from the GoT universe. After clicking on "Get started" button you
                                        will get further infromations like "current lord", "coat of arms", "founder"
                                        and many more informations.
                                </Header>
                                <Link to="/houses">
                                    <Button style={{marginTop: 30, fontweight: 100}} inverted size='huge'>
                                        Get Started
                                        <Icon name="arrow right" />
                                    </Button>  
                                </Link>
                    </div>
                </Segment>
                <Divider></Divider>
                <Quotes />      
            </Container>              
        )
    }
}