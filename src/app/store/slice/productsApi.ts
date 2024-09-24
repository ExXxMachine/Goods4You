import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Product } from './productsSlice'

interface FetchProductsResponse {
	products: Product[]
	total: number
}

export const productsApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	endpoints: builder => ({
		fetchProducts: builder.query<
			FetchProductsResponse,
			{ limit: number; skip: number; q: string }
		>({
			query: ({ limit, skip, q }) =>
				`products/search?q=${q}&limit=${limit}&skip=${skip}&select=title,price,id,thumbnail`,
		}),
	}),
})

export const { useFetchProductsQuery } = productsApi
export default productsApi.reducer
