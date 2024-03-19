import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:5400/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
