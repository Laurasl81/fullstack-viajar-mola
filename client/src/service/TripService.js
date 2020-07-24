import axios from 'axios'

export default class TripService {

    constructor(){

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/trip`,
            withCredentials: true
            
        })
    }

    getAllTravels = () => this.service.get('/getAllTravels')
    getDestination = destino => this.service.get(`/getDestination/${destino}`)
    getOneTravel = id => this.service.get(`/getOneTravel/${id}`)
    createTravel = trip => this.service.post(`/newTravel`, trip)
    deleteTravel = id => this.service.delete(`/delete/${id}`)
    editTravel = (id, travel) => this.service.put(`/edit/${id}`, travel)
}