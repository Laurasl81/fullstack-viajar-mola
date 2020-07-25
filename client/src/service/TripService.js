import axios from 'axios'

export default class TripService {

    constructor(){

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/trips`,
            withCredentials: true
            
        })
    }

    getAllTrips = () => this.service.get('/getAllTrips')
    getDestination = destino => this.service.get(`/getDestination/${destino}`)
    getOneTrips = id => this.service.get(`/getOneTrip/${id}`)
    createTrips = trip => this.service.post(`/newTrip`, trip)
    deleteTrips = id => this.service.delete(`/delete/${id}`)
    editTrip= (id, travel) => this.service.put(`/edit/${id}`, travel)
}