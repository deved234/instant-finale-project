import axios from './axios'

export const getProducts = () =>
    axios.get('/products').then((res) => res.data)

export const getProductById = (id) =>
    axios.get(`/products/${id}`).then((res) => res.data)