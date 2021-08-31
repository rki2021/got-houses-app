import * as React from 'react'
import { avatar } from '../images'

import { Grid, Header, List, Image, Button, Divider, Container } from 'semantic-ui-react'

export default class About extends React.Component {
    render() {
        return(
            <Container>
                <Grid stackable padded={true} columns={4}>
                    <Grid.Row centered>
                            <Divider></Divider>
                            <Header as="h1" dividing>About</Header>
                            <Divider></Divider>
                    </Grid.Row>

                    <Grid.Row centered columns={3}>

                        <Grid.Column>
                            <Image src={ avatar } size="medium" circular/>
                        </Grid.Column>
                        <Grid.Column>
                            <List>
                                <List.Item as="h1">
                                    "A little progress each day adds up to BIG results"
                                </List.Item>
                                    <List.Item>
                                        <List.Icon name='users' size="large" />
                                        <List.Content>MHP Challenge</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='marker' size="large" />
                                        <List.Content>Ludwigsburg, BW</List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='mail' size="large" />
                                        <List.Content>
                                            <a href='mailto:mhp@mhp-challenge.com'>mhp@mhp-challenge.com</a>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item>
                                        <List.Icon name='github' size="large" />
                                        <List.Content>
                                            <a href='https://github.com/rki2021/got-houses-app'>mhp-challenge.com</a>
                                        </List.Content>
                                    </List.Item>
                                    <List.Item style={{marginBottom: 30}}>
                                        <List.Icon name='flask' size="large" />
                                        <List.Content>
                                            Made with React, Webpack, TypeScript, VS Code, Semantic UI, SASS and DEDICATION
                                        </List.Content>
                                    </List.Item>
                            </List>
                            <Button primary onClick={ () => alert("Congratulation! You hired me!" )}>Hire me</Button>
                            <Button onClick={ () => alert("Download complete..." )}>Download CV</Button>
                        </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
        )
    }
}