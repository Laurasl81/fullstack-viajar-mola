import React, { Component } from 'react'
import './home.css'
import TripsCard from '../../cards/TripsCard'
import TripService from '../../../service/TripService'
import { Row, Col, Form, Container, Button } from 'react-bootstrap';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            originTrips: [],
            trips: [],
            destinyFilter: '',
            priceFilter: 0
        }
        this.TripService = new TripService()
    }

    componentDidMount = () => this.getAllTrips()

    getAllTrips = () => {
        this.TripService.getAllTrips()
            .then(alltrips => this.setState({ originTrips: alltrips.data, trips: alltrips.data, }))
            .catch(err => console.log(err))
    }

    resetFilter = () => {

        this.setState({ trips: this.state.originTrips, destinyFilter: '', priceFilter: 0 })
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

    handleInputChange = e => {
        const { name, value } = e.target
        console.log(name, value);
        // Callback para esperar que el estado se actualice
        if (name === "destinyFilter") this.setState({ [name]: value }, () => this.destinyFilter())
        if (name === "priceFilter") this.setState({ [name]: value }, () => this.priceFilter())


    }


    render() {

        console.log('hola home', this.state.trips);
        return (
            <>
                <div className='home-hero'>
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
                            <Button block onClick={() => this.resetFilter()} variant="outline-dark" type="submit">Mostrar todos los viajes</Button>
                        </Col>
                    </Row>

                    <Row>
                        {this.state.trips.map((elm, idx) =>
                            <Col md={6} lg={4}>
                                <TripsCard key={idx} {...elm} />
                            </Col>

                        )}
                    </Row>
                </Container>
                <div className='diferentes'>
                    <h4>LO QUE REALMENTE NOS HACE DIFERENTES</h4>
                    <p>Organizamos cada detalle para que disfrutes al máximo de cada visita, de cada experiencia y de cada actividad. Queremos que cada momento sea único, irrepetible. Que sea, simplemente, genial y diferente. Viajar es un placer y nuestro objetivo es que disfrutes al máximo. Nuestro equipo de profesionales organiza los tours en primera persona, sin intermediarios, con un mismo estándar y estilo en todos nuestros viajes. Innovando y mejorando la experiencia año tras año para satisfacer a nuestros clientes. Tours diseñados con mimo y dedicación para que solamente tengas que concentrarte en una cosa: disfrutar y vivir la experiencia</p>
                </div>

            </>
        )
    }
}

export default Home;

