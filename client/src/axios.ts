import Axios from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:5400/api',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axios
