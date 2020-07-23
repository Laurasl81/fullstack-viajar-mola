import axios from 'axios'

export default class AuthService {

    constructor(){

        this.service = axios.create({
            baseURL: 'http://localhost:5000/api',
            withCredentials: true
        })
    }
    login = credentials => this.service.post('/auth/login', credentials)
    signup = credentials => this.service.post('/auth/signup', credentials)
    logout = () => this.service.post('/auth/logout')
    isLoggedIn = () => this.service.get('/auth/loggedin')
}