import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import classesHeader from './Header.module.css'
import cardIco from '../../app/assets/card__ico.svg'
import { fetchCart } from '../../app/store/slice/cartSlice'
import { fetchUser } from '../../app/store/slice/userSlice'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'

const Header: React.FC<{ hideNav: boolean; isAuthenticated: boolean }> = ({
	hideNav,
	isAuthenticated,
}) => {
	const dispatch = useAppDispatch()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const totalProducts = useAppSelector(state => state.cart.totalProducts)
	const user = useAppSelector(state => state.user.user)

	useEffect(() => {
		const loadUserData = async () => {
			await dispatch(fetchUser())
			if (user) {
				await dispatch(fetchCart(user.id))
			}
		}

		loadUserData()
	}, [dispatch, user])

	const toggleMenu = () => {
		setIsMenuOpen(prevState => !prevState)
	}

	return (
		<>
			<header className={classesHeader.headerContainer}>
				<nav className={classesHeader.navBlock}>
					<Link to='/' className={classesHeader.logo}>
						Goods4you
					</Link>

					{!hideNav && (
						<ul className={classesHeader.navUl}>
							<li>
								<HashLink className={classesHeader.navLink} to={'/#catalog'}>
									Catalog
								</HashLink>
							</li>
							<li>
								<HashLink className={classesHeader.navLink} to={'/#FAQ'}>
									FAQ
								</HashLink>
							</li>
							{isAuthenticated && (
								<li>
									<Link to='/cart' className={classesHeader.navLink}>
										Cart
										<div className={classesHeader.cartIcon}>
											<img src={cardIco} alt='Cart Icon' />
											{totalProducts > 0 && (
												<svg
													width='14'
													height='18'
													className={classesHeader.cartBadge}
												>
													<circle
														cx='7'
														cy='9'
														r='7'
														strokeWidth='1'
														fill='#F14F4F'
													/>
													<text
														x='50%'
														y='50%'
														dominantBaseline='middle'
														textAnchor='middle'
														fill='white'
														fontSize='6'
														fontFamily="'Jost', sans-serif"
													>
														{totalProducts}
													</text>
												</svg>
											)}
										</div>
									</Link>
								</li>
							)}
							<li>
								<Link to='/login' className={classesHeader.navLink}>
									{user ? `${user.firstName} ${user.lastName}` : 'Login'}
								</Link>
							</li>
						</ul>
					)}

					<div className={classesHeader.burger} onClick={toggleMenu}>
						<div className={classesHeader.burgerLine}></div>
						<div className={classesHeader.burgerLine}></div>
						<div className={classesHeader.burgerLine}></div>
					</div>
				</nav>
			</header>

			<div
				className={`${classesHeader.navOverlay} ${
					isMenuOpen ? classesHeader.active : ''
				}`}
			>
				<button
					className={classesHeader.closeButton}
					onClick={toggleMenu}
					aria-label='Close menu'
				>
					&times;
				</button>

				{/* Mobile Navigation */}
				<ul className={classesHeader.mobileNavUl}>
					<li>
						<HashLink className={classesHeader.navLink} to={'/#catalog'}>
							Catalog
						</HashLink>
					</li>
					<li>
						<HashLink className={classesHeader.navLink} to={'/#FAQ'}>
							FAQ
						</HashLink>
					</li>

					{/* Cart link in mobile view */}
					{isAuthenticated && totalProducts > 0 && (
						<li>
							<Link to='/cart' className={classesHeader.navLink}>
								Cart
								<div className={classesHeader.cartIcon}>
									<img src={cardIco} alt='Cart Icon' />
									<svg
										width='14'
										height='18'
										className={classesHeader.cartBadge}
									>
										<circle
											cx='7'
											cy='9'
											r='7'
											strokeWidth='1'
											fill='#F14F4F'
										/>
										<text
											x='50%'
											y='50%'
											dominantBaseline='middle'
											textAnchor='middle'
											fill='white'
											fontSize='6'
											fontFamily="'Jost', sans-serif"
										>
											{totalProducts}
										</text>
									</svg>
								</div>
							</Link>
						</li>
					)}

					{/* Login link in mobile view */}
					<li>
						<Link to='/login' className={classesHeader.navLink}>
							{user ? `${user.firstName} ${user.lastName}` : 'Login'}
						</Link>
					</li>
				</ul>
			</div>

			<Outlet />
		</>
	)
}

export { Header }
