import React, { Component } from 'react'
import './details.css'

import TripService from '../../../service/TripService'
import ActivitiesCard from '../../cards/ActivitiesCard'
import BookingForm from './bookingForm'


import Spinner from '../ui/Spinner'

import { Container, Row, Col, Button, Modal } from 'react-bootstrap'

class TripDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            tripDetails: null,
        }
        this.TripService = new TripService()
    }


    componentDidMount = () => {

        const id = this.props.match.params.trips_id

        this.TripService
            .getOneTrips(id)
            .then(response => this.setState({ tripDetails: response.data }))
            .catch(err => console.log(err))
    }

    handleModal = status => this.setState({ showModal: status })

    

    render() {
        const newText = this.state.tripDetails && this.state.tripDetails.informationPriceIncludes.split('.')

        return (
            <>
                {!this.state.tripDetails ? <Spinner /> :
                    <>
                        <div className='viajeDestino' style={{ backgroundImage: `url(${this.state.tripDetails.image})` }}>
                            <div>
                                <h1>{this.state.tripDetails.title}</h1>
                                <h3>{this.state.tripDetails.duration} días |  p/p desde {this.state.tripDetails.price}€ |  temporada {this.state.tripDetails.season} | {this.state.tripDetails.tripType}</h3>
                                <h3>{this.state.tripDetails.steps.map((elm, idx) => <span key={idx}> {elm} |</span>)} </h3>
                            </div>
                            {this.props.loggedInUser ?
                                <Button className="px-5 mx-auto mt-3 text-uppercase" onClick={() => this.handleModal(true)} variant="warning">Reserva viaje</Button> :
                                <Button className="px-5 mx-auto mt-3 text-uppercase" onClick={() => this.props.history.push("/iniciar-sesion")} variant="warning">Inicia sesión para reservar</Button>}

                        </div>
                        <Container>
                            <div className="informacion">
                                <h2>- Un viaje diferente -</h2>
                                <h3>{this.state.tripDetails.informationTitle} </h3>
                                <p>{this.state.tripDetails.informationDescription} </p>

                                <h3 className='my-4'>El precio incluye</h3>
                                <ul>
                                    {newText ? newText.map((elm, idx) => (<li key={idx}>{elm}.</li>)) : null}
                                </ul>

                            </div>

                        </Container>
                        <div className='actividades my-5'>
                            <h2>ACTIVIDADES DESTACADAS</h2>

                            <Row>
                                {this.state.tripDetails.activities.map((elm, idx) =>
                                    <Col md={6} lg={4} key={idx} >
                                        <ActivitiesCard {...elm} />
                                    </Col>

                                )}
                            </Row>
                        </div>
                    </>}

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>

                    <Modal.Body>
                        <BookingForm handleToast={this.props.handleToast} handleModal={this.handleModal} loggedInUser={this.props.loggedInUser} tripId={this.state.tripDetails && this.state.tripDetails._id} />

                    </Modal.Body>

                </Modal>



            </>

        )
    }
}

export default TripDetails;