import React, { Component } from 'react'
import './destination.css'

import { Row, Col, Button } from 'react-bootstrap';

import TripService from '../../../service/TripService'
import TripsCard from '../../cards/TripsCard'

class Destination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            destination: [],
            background: {
                europa: 'https://cdn.civitatis.com/suiza/zurich/zurich.jpg',
                asia: 'https://www.uch.edu.pe/sites/default/files/styles/blog_image/public/blog-img/japon.png?itok=2hT_8nhU',
                america: 'https://staticshare.america.gov/uploads/2018/01/shutterstock_421599727.jpg',
            }
        }
        this.TripService = new TripService()
    }


    componentDidMount = () => this.getDestination()


    getDestination = () => {
        const destiny = this.props.match.params.destino_id
        this.TripService
            .getDestination(destiny)
            .then(response => this.setState({ destination: response.data }))
            .catch(err => console.log(err))
    }

    deleteTrips = (id) => {

        this.TripService
            .deleteTrips(id)
            .then(() => this.getDestination())
            .catch(err => console.log(err))

    }


    render() {

        const destination = this.props.match.params.destino_id
        
        return (
            <>
                <div className='continente' style={{ backgroundImage: `url(${this.state.background[destination]})` }}>
                    <h1 className='text-center'>{destination}</h1>
                </div>
                    
                <Row>
                    {this.state.destination.map((elm, idx) =>
                        <Col md={6} lg={4} key={idx} >
                            <TripsCard {...elm} />
                {this.props.loggedInUser && this.props.loggedInUser.role === "admin" ?
                ( 
                            <Button variant="danger" className='mr-3 mb-3' onClick={() => this.deleteTrips(elm._id)}>Eliminar viaje</Button>

                 ) : null} 
                        </Col>

                    )}
                </Row>

            </>
        )
    }
}

export default Destination;