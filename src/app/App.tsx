import './App.css'
import './rest.css'
import { Routes, Route } from 'react-router-dom'
import { Home, OneProduct, Cart, NotFound } from '../pages/authPage'
import { Header, Footer } from '../widgets/authWidgets'

function App() {
	const userId = 6
	return (
		<div className='app'>
			<Header userId={userId} />
			<main>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/product/:id' element={<OneProduct />} />
					<Route path='/cart' element={<Cart />} />
					<Route path='*' element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	)
}

export default App
