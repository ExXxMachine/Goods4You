// src/App.tsx

import './App.css'
import './rest.css'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Home, OneProduct, Cart, NotFound, Login } from '../pages/authPage'
import { Header, Footer } from '../widgets/authWidgets'
import { useEffect, useState } from 'react'
import { refreshAccessToken } from '../features/authService'
import { getToken, isTokenExpired } from '../features/tokenService'
import { Puff } from 'react-loader-spinner'
import { useAppDispatch } from '../app/store/hooks'
import { fetchUser } from './store/slice/userSlice'

function App() {
	const location = useLocation()
	const isLoginPage = location.pathname === '/login'
	const [loading, setLoading] = useState(true)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const dispatch = useAppDispatch()

	const checkAndRefreshToken = async () => {
		const token = localStorage.getItem('auth_token')
		console.log(token)
		if (token && !isTokenExpired(token)) {
			await dispatch(fetchUser())
			setIsAuthenticated(true)
		} else {
			await refreshAccessToken() // Обновляем токен
			const newToken = localStorage.getItem('accessToken') // Получаем новый токен
			if (newToken && !isTokenExpired(newToken)) {
				await dispatch(fetchUser()) // Если новый токен действителен
				setIsAuthenticated(true)
			} else {
				setIsAuthenticated(false)
			}
		}

		setLoading(false)
	}

	useEffect(() => {
		checkAndRefreshToken()
	}, [])

	if (loading) {
		return (
			<div className='loading-container'>
				<Puff color='#484283' height={100} width={100} ariaLabel='loading' />
			</div>
		)
	}

	return (
		<div className='app'>
			<Header hideNav={isLoginPage} isAuthenticated={isAuthenticated} />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/product/:id' element={<OneProduct />} />
				<Route
					path='/cart'
					element={
						isAuthenticated ? <Cart /> : <Navigate to='/login' replace />
					}
				/>
				<Route path='*' element={<NotFound />} />
				<Route path='/login' element={<Login />} />
			</Routes>
			{!isLoginPage && <Footer />}
		</div>
	)
}

export default App
