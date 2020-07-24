import axios from 'axios'

export default class UserService {

    constructor() {

        this.service = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/user`,
            withCredentials: true

        })
    }

    getUser = id => this.service.get(`/account/${id}`)
    deleteUser = id => this.service.delete(`/account/delete/${id}`)
    editUser = (id, user) => this.service.put(`/account/edit/${id}`, user)
}