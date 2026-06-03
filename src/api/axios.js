import axios from 'axios'

const api = axios.create({
    baseURL: 'https://6a1f9defe96c1d13b5860ddd.mockapi.io',
})

export default api