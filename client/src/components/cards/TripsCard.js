import React from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'


const TripsCard = (props) => {

    // console.log(props);
    const { _id, image, title, duration, price } = props
    return (
        <Card className='trip-card'>
            <Link to={`/viaje/${_id}`} className="btn">
                <Card.Img className='img-card' variant="top" src={image} />
                <Card.Body>

                    <Card.Title>{title}</Card.Title>
                    <Card.Text>{duration} días</Card.Text>
                    <Card.Text>Desde {price} €</Card.Text>

                </Card.Body>
            </Link>
        </Card>
    )
}

export default TripsCard