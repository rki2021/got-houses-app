import React from 'react'
import { Menu, Image, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class MainMenu extends React.Component {
  state = {
      activeItem: null
  }

  handleItemClick = (e: any, name: any) => this.setState({ activeItem: name.name })

  render() {
    const { activeItem } = this.state

    return (
      <Container>

        <Menu stackable borderless size="massive" className="padded-menu">
          <Menu.Item
            as={ Link }
            to="/houses">
              <Image src='https://upload.wikimedia.org/wikipedia/commons/2/2e/Game_of_Thrones_2011_logo.svg' size="small" />
          </Menu.Item>
          <Menu.Menu position="right" className="menu-links">  
            <Menu.Item
              as={ Link }
              to="/"
              name='home'
              active={ activeItem === 'home' }
              onClick={ this.handleItemClick }
              >
                Home
            </Menu.Item>

            <Menu.Item
              as={ Link }
              to="/houses"
              name='houses'
              active={ activeItem === 'houses' }
              onClick={ this.handleItemClick }
              >
                Houses
            </Menu.Item>

            <Menu.Item
              as={ Link }
              to="/about"
              name='about'
              active={ activeItem === 'about' }
              onClick={ this.handleItemClick }
              >
                About
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </Container>
    )
  }
}