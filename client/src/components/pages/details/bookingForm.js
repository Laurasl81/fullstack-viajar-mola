import React, { Component } from 'react'
import BookingService from '../../../service/BookingService'
import UserService from '../../../service/UserService'


import { Button, Form } from 'react-bootstrap'

class BookingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                phone: '',
                name: '',
                lastname: ''
            },
            error: ''
        }
        this.BookingService = new BookingService()
        this.UserService = new UserService()

    }

    componentDidMount = () => {
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
        this.setState({ error: "" })
        const { name, value } = e.target
        this.setState({ user: { ...this.state.user, [name]: value } })
    }

    handleFormSubmit = e => {

        e.preventDefault()
        if (!this.state.user.email || !this.state.user.phone || !this.state.user.name || !this.state.user.lastname) {
            this.setState({ error: "Todos los campos son obligatorios" })
        }
        this.BookingService
            .createTrips({ user: this.props.loggedInUser._id, trip: this.props.tripId })
            .then(response => {
                const userCopy = this.props.loggedInUser.booking
                userCopy.push(response.data._id)
                this.UserService.editUser(this.props.loggedInUser._id, 
                    { booking: userCopy, 
                    email: this.state.user.email, 
                    phone: this.state.user.phone, 
                    name: this.state.user.name, 
                    lastname: this.state.user.lastname
                })
                .then(() => this.props.fetchUser())
            })
            .catch(err => this.setState({ error: err }))

       
        this.props.handleModal(false)
        this.props.handleToast(true, "Tu viaje ha sido reservado")
    }

    render() {
        //console.log(this.props);
        return (
            <>
                <h1>Formulario de Reserva</h1>

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
                    {this.state.error && <p className="alert alert-danger">{this.state.error}</p>}

                    <Button variant="dark" type="submit">Hacer reserva</Button>
                </Form>
            </>
        );
    }
}

export default BookingForm