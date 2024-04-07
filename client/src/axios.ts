import Axios from 'axios'
import { API_URL } from './config'

const axios = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5400/api' : API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
