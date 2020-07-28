import axios from 'axios'

export default class BookingService {

    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/booking`,
            withCredentials: true

        })
    }

    createTrips = booking => this.service.post(`/newBooking`, booking)

}