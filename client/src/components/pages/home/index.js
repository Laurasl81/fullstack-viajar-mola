import React, { Component } from 'react'
import './home.css'
import TripsCard from '../../cards/TripsCard'
import TripService from '../../../service/TripService'
import { Row, Col, Form, Container, Button } from 'react-bootstrap';
import Aside from '../ui/Aside/aside'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originTrips: [],
            trips: [],
            destinyFilter: '',
            priceFilter: 0,
            tripTypeFilter: ''
        }
        this.TripService = new TripService()
    }

    componentDidMount = () => {
        this.getAllTrips()
        window.scrollTo(0, 0)
    }

    getAllTrips = () => {
        this.TripService.getAllTrips()
            .then(alltrips => this.setState({ originTrips: alltrips.data, trips: alltrips.data, }))
            .catch(err => console.log(err))
    }

    resetFilter = () => {

        this.setState({ trips: this.state.originTrips, destinyFilter: '', priceFilter: 0, tripTypeFilter: '' })
    }


    destinyFilter = () => {
        const tripsCopy = [...this.state.trips]
        const newTrip = tripsCopy.filter(trip => trip.destination === this.state.destinyFilter)
        this.setState({ trips: newTrip })
    }

    priceFilter = () => {
        const tripsCopy = [...this.state.trips]
        const newPrice = tripsCopy.filter(trip => trip.price >= this.state.priceFilter)
        this.setState({ trips: newPrice })
    }


    tripTypeFilter = () => {
        const tripsCopy = [...this.state.trips]
        const newTrip = tripsCopy.filter(trip => trip.tripType === this.state.tripTypeFilter)
        this.setState({ trips: newTrip })
    }

    handleInputChange = e => {
        const { name, value } = e.target
        //console.log(name, value);
        // Callback para esperar que el estado se actualice
        if (name === "destinyFilter") this.setState({ [name]: value }, () => this.destinyFilter())
        if (name === "priceFilter") this.setState({ [name]: value }, () => this.priceFilter())
        if (name === "tripTypeFilter") this.setState({ [name]: value }, () => this.tripTypeFilter())

    }


    render() {

        return (
            <>
                <div className='home-hero' >
                    <h1 className="text-center">Hora de desconectar de la rutina. No hay problema, nosotros nos encargamos de todo. </h1>
                </div>

                <div className='texto-parrafo'>
                    <h6>Los viajes que ofrecemos en Viajar Mola han sido creados en primera persona por profesionales de nuestro equipo cuya pasión es viajar. Nosotros los llamamos ‘viajes artesanales’ porque los planificamos como creemos que tú lo harías. ¿Lo mejor? Incluimos rincones secretos que pocos conocen.</h6>

                </div>
                <Container>
                    <h3 className="subtitle">¿QUÉ TAL UN POCO DE INSPIRACIÓN PARA TU PRÓXIMO VIAJE?</h3>
                    <Row className="d-flex">
                        <Col lg={4}>
                            <Form.Group>
                                <Form.Control as="select" onChange={this.handleInputChange} value={this.state.destinyFilter} name="destinyFilter" >
                                    <option value="">Selecciona un destino</option>
                                    <option value="europa">Europa</option>
                                    <option value="asia">Asia</option>
                                    <option value="america">América</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>

                        <Col lg={4}>
                            <Form.Group>
                                <Form.Label>Precios desde {this.state.priceFilter} €</Form.Label>
                                <Form.Control type="range" name='priceFilter' min="0" max="2500" value={this.state.priceFilter} onChange={this.handleInputChange} />
                            </Form.Group>
                        </Col>

                        <Col lg={4}>
                            <Form.Group>
                                <Form.Control as="select" onChange={this.handleInputChange} value={this.state.tripTypeFilter} name="tripTypeFilter" >
                                    <option value="">Selecciona tipo de viaje</option>
                                    <option value="single">Single</option>
                                    <option value="grupos">Grupos</option>
                                    <option value="grupo-reducido">Grupos reducidos</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>


                        <Col lg={3}>
                            <Button block onClick={() => this.resetFilter()} variant="outline-dark" type="submit" >Quitar filtro viajes</Button>
                        </Col>
                    </Row>

                    <Row>
                        {this.state.trips.map((elm, idx) =>
                            <Col md={6} lg={4} key={idx} >
                                <TripsCard {...elm} />
                            </Col>

                        )}
                    </Row>
                </Container>
                <Aside />

            </>
        )
    }
}

export default Home;

