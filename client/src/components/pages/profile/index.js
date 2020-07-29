import React, { Component } from 'react'
import UserService from '../../../service/UserService'
import TripsCard from '../../cards/TripsCard'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userWithBooking: null,
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
        this.getUser()
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
        this.setState({ user: { ...this.state.user, [name]: value } })
    }

    handleFormSubmit = e => {
        //console.log(this.state);
        e.preventDefault()
        this.UserService.editUser(this.props.loggedInUser._id, this.state.user)
            .then(response => {
                this.props.handleToast(true, 'Usuario modificado')
            })
            .catch(err => {
                this.props.handleToast(true, err.response.data.message)
            })

    }

    getUser = () => {
        this.UserService
            .getUser(this.props.loggedInUser._id)
            .then(response => this.setState({ userWithBooking: response.data }))
            .catch(err => console.log(err))

    }

    deleteBooking = (idx) => {
        const copyBooking = this.state.userWithBooking.booking
        copyBooking.splice(idx, 1)
        this.UserService.editUser(this.props.loggedInUser._id, { booking: copyBooking })
            .then(() => this.getUser())
            .then(() => {
                this.props.handleToast(true, 'Reserva eliminada')
            })
            .catch(err => console.log(err))

    }



    render() {
        //console.log('props', this.state.userWithBooking);

        return (
            <Container>
                <h1>Tu Perfil</h1>

                <Form onSubmit={this.handleFormSubmit} style={{ maxWidth: 400, margin: 'auto' }}>


                    <Form.Group>
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.email} name="email" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.phone} name="phone" type="number" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.name} name="name" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.user.lastname} name="lastname" type="text" />
                    </Form.Group>

                    <Button variant="dark" block type="submit">Editar usuario</Button>
                </Form>



                {this.props.loggedInUser && this.props.loggedInUser.role === "cliente" ?
                    (
                        <>
                            <h2> Reservas</h2>
                            {!this.state.userWithBooking ? <h3>CARGANDO</h3> :

                                <Row>
                                    {this.state.userWithBooking.booking.map((elm, idx) =>

                                        <Col key={elm._id} xs={12} md={4} lg={3}>
                                            <TripsCard  {...elm.trip[0]} />
                                            <Button variant="danger" className='mr-3' onClick={() => this.deleteBooking(idx)}>Eliminar viaje</Button>

                                        </Col>
                                    )}
                                </Row>
                            }

                        </>
                    ) : null}


            </Container>



        );
    }
}

export default Profile;

