import React from 'react'

import Card from 'react-bootstrap/Card'


const ActivitiesCard = ({ activityPhoto, activityTitle, activityDescription }) => {


    return (
        <Card>
            <Card.Img variant="top" src={activityPhoto}/>
            <Card.Body>
                <Card.Title>{activityTitle}</Card.Title>
                <Card.Text>{activityDescription}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default ActivitiesCard