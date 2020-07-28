import React from 'react'

import Card from 'react-bootstrap/Card'


const ActivitiesCard = ({ activityPhoto, activityTitle, activityDescription }) => {


    return (
        <Card className="mb-4">
            <Card.Img variant="top" src={activityPhoto} className="img-card" />
            <Card.Body>
                <Card.Title>{activityTitle}</Card.Title>
                <Card.Text>{activityDescription}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ActivitiesCard