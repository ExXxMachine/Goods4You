import { Link, Outlet } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import classes from './Footer.module.css'

function Footer() {
	return (
		<>
			<Outlet />
			<footer className={classes.footerContainer}>
				<nav className={classes.footerNavBlock}>
					<Link
						to='/'
						className={classes.footerLogo}
						aria-label='Перейти на главную'
					>
						Goods4you
					</Link>
					<ul className={classes.footerNavUl}>
						<li>
							<HashLink
								className={classes.footerNavLink}
								to={'/#catalog'}
								aria-label='Перейти к каталогу'
							>
								Catalog
							</HashLink>
						</li>
						<li>
							<HashLink
								className={classes.footerNavLink}
								to={'/#FAQ'}
								aria-label='Перейти к FAQ'
							>
								FAQ
							</HashLink>
						</li>
					</ul>
				</nav>
			</footer>
		</>
	)
}

export { Footer }
