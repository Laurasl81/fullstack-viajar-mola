import React, { Component } from 'react'

import AuthService from '../../service/AuthService'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    handleFormSubmit = e => {
        e.preventDefault()
        this.authService
            .signup(this.state)
            .then(response => {
                this.props.setTheUser(response.data)
                this.props.handleToast(true, 'Registro completo')
                
            })
            .catch(err => console.log(err.response.data.message))  
    }

    render() {
        return (
            <Container as="main">

                <Row>
                    <Col md={{ offset: 3, span: 6 }}>
                        <h3>Registro de usuario</h3>

                        <Form onSubmit={this.handleFormSubmit}>

                            <Form.Group>
                                <Form.Label>Nombre de usuario</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.username} name="username" type="text" />
                                <Form.Text className="text-muted">Todo minuscula</Form.Text>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control onChange={this.handleInputChange} value={this.state.password} name="password" type="password" />
                                <Form.Text className="text-muted">Minimo cuaro caracteres</Form.Text>
                            </Form.Group>

                            <Button variant="dark" type="submit">Registrarme</Button>
                        </Form>

                    </Col>
                </Row>


            </Container>
        )
    }
}

export default Signup