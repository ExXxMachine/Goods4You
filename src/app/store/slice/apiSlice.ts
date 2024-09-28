import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getToken } from '../../../features/tokenService'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	endpoints: builder => ({
		login: builder.mutation({
			query: ({ username, password }) => ({
				url: '/auth/login',
				method: 'POST',
				body: { username, password },
				headers: { 'Content-Type': 'application/json' },
			}),
		}),
		fetchUserData: builder.query({
			query: () => ({
				url: '/auth/me',
				method: 'GET',
				headers: { Authorization: `Bearer ${getToken()}` },
			}),
		}),
		fetchCart: builder.query({
			query: userId => ({
				url: `/carts/user/${userId}`,
				method: 'GET',
				headers: { Authorization: `Bearer ${getToken()}` },
			}),
		}),
		updateCartQuantity: builder.mutation({
			query: ({ productId, quantity }) => ({
				url: `/carts/${productId}`,
				method: 'PUT',
				body: { quantity },
				headers: { Authorization: `Bearer ${getToken()}` },
			}),
		}),
		fetchDescriptionById: builder.query({
			query: id => ({
				url: `/products/${id}?select=title,price,id,warrantyInformation,shippingInformation,stock,description,tags,rating,thumbnail,discountPercentage,images`,
				method: 'GET',
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useFetchUserDataQuery,
	useFetchCartQuery,
	useUpdateCartQuantityMutation,
	useFetchDescriptionByIdQuery,
} = apiSlice

export default apiSlice.reducer
