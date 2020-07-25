import React, { Component } from 'react'
import UserService from '../../../service/UserService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                phone: '',
                name: '',
                lastname: ''

            }
        }
        this.UserService = new UserService()
    }
    componentDidMount = () => {
        console.log(this.props)
        this.props.loggedInUser && this.setState({
            ...this.state, user: {
                email: this.props.loggedInUser.email ? this.props.loggedInUser.email : '',
                phone: this.props.loggedInUser.phone ? this.props.loggedInUser.phone : '',
                name: this.props.loggedInUser.name ? this.props.loggedInUser.name : '',
                lastname: this.props.loggedInUser.lastname ? this.props.loggedInUser.lastname : ''

            }

        })

    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ user: { [name]: value } })
    }

    handleFormSubmit = e => {
        console.log(this.state);
        e.preventDefault()
        this.UserService.editUser(this.props.loggedInUser._id, this.state.user)
            .then(response => {
                this.props.handleToast(true, 'Usuario modificado')
            })
            .catch(err => {
                this.props.handleToast(true, err.response.data.message)
            })

    }


    render() {
        //console.log('props', this.props);
        return (
            <Container>
                <h1>Hola profile</h1>

                <Form onSubmit={this.handleFormSubmit}>


                    <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.email} name="email" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.phone} name="phone" type="number" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.name} name="name" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.lastname} name="lastname" type="text" />
                    </Form.Group>

                    <Button variant="dark" type="submit">Editar usuario</Button>
                </Form>
            </Container>

        );
    }
}

export default Profile;

