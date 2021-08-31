import React, { Component } from 'react'
import './index.scss'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'

import { Houses } from './components/Houses'
import MainMenu from './components/Menu'
import Home from './components/Home'
import About from './components/About'

import { Container, Divider} from 'semantic-ui-react'

export interface AppProps {}
export interface AppState {}

export default class App extends Component<AppProps, AppState> {

    constructor(props: AppProps) {
        super(props)
    }
    render() { 
        return (
            <div>
                <Container>
                    <Router >
                        <MainMenu />
                        { this.generateCurrentPage() }
                    </Router>
                    <Divider hidden />
                    <Divider />
                    <footer>&copy; 2021</footer>
                    <Divider hidden />
                </Container>
            </div>   
        )
    }

    generateCurrentPage() {
        return (
                <Switch>
                    <Route 
                        key={0}
                        path="/"
                        exact
                        render = {() => {
                            return <Home />
                        }}
                        />
                    
                    <Route
                        key={1}
                        path="/houses"
                        exact
                        render = {(props) => {
                            return <Houses {...props} />
                        }}
                        />

                    <Route
                        key={2}
                        path="/about"
                        exact
                        render = {(props) => {
                            return <About {...props} />
                        }}
                        />

                </Switch>
        )    
    }
}


