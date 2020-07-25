import React, { Component } from 'react'
import TripService from '../../../service/TripService'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trips: [],
        }
        this.TripService = new TripService()
    }

    componentDidMount = () => this.getAllTrips()

    getAllTrips = () => {
        this.TripService.getAllTrips()
            .then(alltrips => this.setState({ trips: alltrips }))
            .catch(err => console.log(err))
    }


    render() {
        console.log(this.state.trips);
        return (
            <>
                <h1 className="text-center">Home</h1>

            </>
        )
    }
}

export default Home;

