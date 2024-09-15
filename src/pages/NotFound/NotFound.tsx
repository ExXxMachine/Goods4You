import { Link } from "react-router-dom"
import classesNotFound from './NotFound.module.css'
function NotFound() {
	return (
		<div className={classesNotFound.notFoundContainer}>
			404 page not found
			<Link className={classesNotFound.notFoundLink} to='/'>Go to main page</Link>
		</div>
	)
}

export { NotFound }