import Axios from 'axios'

const BASE_URL = 'http://react-eshop-spring.herokuapp.com/api/'

export const api = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
