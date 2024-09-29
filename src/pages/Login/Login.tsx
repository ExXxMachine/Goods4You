import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FuncBtn } from '../../shared/authShared'
import classesLogin from './Login.module.css'
import { Helmet } from 'react-helmet'
import { getToken } from '../../features/tokenService'
import { loginUser } from '../../features/authService'

const Login = () => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const navigate = useNavigate()

	useEffect(() => {
		if (getToken()) {
			navigate('/')
		}
	}, [navigate])

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			await loginUser(username, password)
			navigate('/')
			window.location.reload()
		} catch (error) {
			setError(
				error instanceof Error ? error.message : 'An unknown error occurred'
			)
			console.log(error)
		}
	}

	return (
		<main className={classesLogin.loginContainer}>
			<Helmet>
				<title>Sign in | Goods4you</title>
				<meta name='description' content='Sign in to your Goods4you account.' />
			</Helmet>

			<label>Sign in</label>

			<form className={classesLogin.loginForm} onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='login'
					value={username}
					onChange={e => setUsername(e.target.value)}
				/>
				<input
					type='password'
					placeholder='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
				/>
				{error && <p className={classesLogin.error}>{error}</p>}
				<FuncBtn title='Sign in' type='submit' />
			</form>
		</main>
	)
}

export { Login }
