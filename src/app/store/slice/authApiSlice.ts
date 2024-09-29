// src/app/store/slice/authApiSlice.ts

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setToken } from '../../../features/tokenService'

interface LoginResponse {
	accessToken: string
}

interface User {
	id: number
	username: string
	firstName: string
	lastName: string
	email: string
}

interface RefreshTokenResponse {
	accessToken: string
}

export const authApiSlice = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
	endpoints: builder => ({
		login: builder.mutation<
			LoginResponse,
			{ username: string; password: string }
		>({
			query: ({ username, password }) => ({
				url: '/auth/login',
				method: 'POST',
				body: { username, password },
				credentials: 'include',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					setToken(data.accessToken) // Сохраните токен
				} catch (error) {
					console.error('Login failed:', error)
				}
			},
		}),
		refreshAccessToken: builder.mutation<RefreshTokenResponse, string>({
			query: refreshToken => ({
				url: '/auth/refresh',
				method: 'POST',
				body: { refreshToken },
				credentials: 'include',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled
					setToken(data.accessToken) // Обновите токен
				} catch (error) {
					console.error('Token refresh failed:', error)
				}
			},
		}),
		fetchUserData: builder.query<User, void>({
			query: () => ({
				url: '/auth/me',
				method: 'GET',
				headers: {
					Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
				},
				credentials: 'include',
			}),
		}),
	}),
})

export const {
	useLoginMutation,
	useRefreshAccessTokenMutation,
	useFetchUserDataQuery,
} = authApiSlice

export default authApiSlice.reducer
