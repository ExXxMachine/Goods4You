import { Link } from 'react-router-dom'
import classesNotFound from './NotFound.module.css'
import { Helmet } from 'react-helmet'

function NotFound() {
	return (
		<main className={classesNotFound.notFoundContainer}>
			<Helmet>
				<title>404 Not Found | Goods4you</title>
				<meta
					name='description'
					content='The page was not found. Go back to the main page and continue shopping on Goods4you.'
				/>
			</Helmet>
			<h1>404 Page Not Found</h1>
			<Link className={classesNotFound.notFoundLink} to='/'>
				Go to main page
			</Link>
		</main>
	)
}

export { NotFound }
