import { setToken, getToken } from './tokenService'

export const refreshAccessToken = async (refreshToken?: string) => {
	try {
		const response = await fetch('/api/auth/refresh', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				refreshToken: refreshToken || '',
				expiresInMins: 30,
			}),
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Failed to refresh token')
		}

		const data = await response.json()
		setToken(data.accessToken)
		return data.accessToken
	} catch (error) {
		console.error(error)
		return null
	}
}

export const loginUser = async (username: string, password: string) => {
	const response = await fetch('/api/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ username, password }),
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to log in')
	}

	const data = await response.json()
	setToken(data.accessToken)
	return data
}

export const fetchUserData = async () => {
	const token = getToken()

	const response = await fetch('/api/auth/me', {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	})

	if (!response.ok) {
		throw new Error('Failed to fetch user data')
	}

	return await response.json()
}


