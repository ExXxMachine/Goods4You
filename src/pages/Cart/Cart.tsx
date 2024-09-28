import classes from './Cart.module.css'
import { CartList } from '../../widgets/authWidgets'
import { Helmet } from 'react-helmet'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { useEffect } from 'react'
import { fetchCart } from '../../app/store/slice/cartSlice'

const Cart = () => {
	const dispatch = useAppDispatch()
	const user = useAppSelector(state => state.user.user)
	const products = useAppSelector(state => state.cart.products)

	useEffect(() => {
		if (user?.id) {
			dispatch(fetchCart(user.id))
		}
	}, [dispatch, user])

	if (products.length === 0) {
		return (
			<main className={classes.cartContainer}>
				<Helmet>
					<title>My cart | Goods4you</title>
					<meta
						name='description'
						content='Browse and manage the items in your shopping cart.'
					/>
				</Helmet>
				<h1 className={classes.cartHeading}>My cart</h1>
				<p className={classes.noItems}>No items in the cart</p>
			</main>
		)
	}

	const totalSum = products.reduce(
		(accumulator, product) => accumulator + product.total,
		0
	)
	const discountedTotal = products.reduce(
		(accumulator, product) => accumulator + product.discountedTotal,
		0
	)
	const quantity = products.reduce(
		(accumulator, product) => accumulator + product.quantity,
		0
	)

	return (
		<main className={classes.cartContainer}>
			<Helmet>
				<title>My cart | Goods4you</title>
				<meta
					name='description'
					content='Browse and manage the items in your shopping cart.'
				/>
			</Helmet>
			<h1 className={classes.cartHeading}>My cart</h1>
			<div className={classes.cartContent}>
				<CartList userId={Number(user?.id)} />
				<div className={classes.cartPriceBlock}>
					<p className={classes.cartPrice1}>
						Total count{' '}
						<span className={classes.priceMod}>{quantity} items</span>
					</p>
					<p className={classes.cartPrice2}>
						Price without discount
						<span className={classes.priceMod}>${totalSum.toFixed(2)}</span>
					</p>
					<p className={classes.cartPrice3}>
						Total price{' '}
						<span className={classes.priceMod}>
							${discountedTotal.toFixed(2)}
						</span>
					</p>
				</div>
			</div>
		</main>
	)
}

export { Cart }
