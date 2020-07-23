import axios from 'axios'

export default class TravelService {

    constructor(){

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api/travels',
            withCredentials: true
            
        })
    }

    getAllTravels = () => this.service.get('/getAllTravels')
    getDestination = destino => this.service.get(`/getDestination/${destino}`)
    getOneTravel = id => this.service.get(`/getOneTravel/${id}`)
    createTravel = travel => this.service.post(`/newTravel`, travel)
    deleteTravel = id => this.service.delete(`/delete/${id}`)
    editTravel = (id, travel) => this.service.put(`/edit/${id}`, travel)
}