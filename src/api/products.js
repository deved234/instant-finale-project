import axios from './axios'

export const getProducts = () =>
    axios.get('/products').then((res) => res.data)

export const getProductById = (id) =>
    axios
        .get(`/products/${id}`)
        .then((res) => res.data)
        .catch(async () => {
            const products = await getProducts()
            const product = products.find((item) => String(item.id) === String(id))

            if (!product) {
                throw new Error('Product not found')
            }

            return product
        })
