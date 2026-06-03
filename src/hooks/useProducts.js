import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById } from '../api/products'

export const useProducts = () => {
    return useQuery({
        queryKey: ['products'],
        queryFn: getProducts,
    })
}

export const useProduct = (id) => {
    return useQuery({
        queryKey: ['product', id],
        queryFn: () => getProductById(id),
    })
}