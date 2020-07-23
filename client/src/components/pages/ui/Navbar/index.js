import React, { Component } from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
// import Nav from 'react-bootstrap/Nav'
import AuthService from '../../../../service/AuthService'

import { Link, NavLink } from 'react-router-dom'

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.AuthService = new AuthService()
    }

    logout = () => {
        this.AuthService
            .logout()
            .then(() => {
                this.props.setTheUser(false)
                this.props.handleToast(true, 'Usuario desconectado')
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Navbar className="nav-hero" variant="dark" expand="lg" sticky="top">
                <Navbar.Brand>
                    <Link to="/"><img class='logo' src="/img/logo.png" alt="#" /></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                        <Nav.Link as="span">
                            <NavLink to="/" exact activeStyle={{ color: 'white' }}>Inicio</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                            <NavLink to="/destino" activeStyle={{ color: 'white' }}>Destino</NavLink>
                        </Nav.Link>
                        <NavDropdown title="Destinos" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/destino/europa">Europa</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/destino/asia">Asia</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/destino/america">America</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as="span">
                            <NavLink to="/#" exact >Sobre Nosotros</NavLink>
                        </Nav.Link>
                        <Nav.Link as="span">
                            <NavLink to="/#" exact ><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-telephone-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M2.267.98a1.636 1.636 0 0 1 2.448.152l1.681 2.162c.309.396.418.913.296 1.4l-.513 2.053a.636.636 0 0 0 .167.604L8.65 9.654a.636.636 0 0 0 .604.167l2.052-.513a1.636 1.636 0 0 1 1.401.296l2.162 1.681c.777.604.849 1.753.153 2.448l-.97.97c-.693.693-1.73.998-2.697.658a17.47 17.47 0 0 1-6.571-4.144A17.47 17.47 0 0 1 .639 4.646c-.34-.967-.035-2.004.658-2.698l.97-.969z" /></svg> +34 666 666</NavLink>

                        </Nav.Link>

                        {this.props.loggedInUser ?
                            (
                                <Nav.Link as="span">
                                    <span onClick={this.logout}>Cerrar sesión</span>
                                </Nav.Link>
                            ) : (
                                <>
                                    <Nav.Link as="span">
                                        <NavLink to="/signup" activeStyle={{ color: 'white' }}>Registro</NavLink>
                                    </Nav.Link>
                                    <Nav.Link as="span">
                                        <NavLink to="/login" activeStyle={{ color: 'white' }}>Inicio sesión</NavLink>
                                    </Nav.Link>
                                </>
                            )
                        }
                    </Nav>

                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default Navigation;