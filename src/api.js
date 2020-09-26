import Axios from 'axios'

const BASE_URL = 'https://react-eshop-spring.herokuapp.com/api/'
// const BASE_URL = 'http://localhost:8081/api'

export const api = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})
