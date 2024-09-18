import classes from './Cart.module.css'
import { CartList } from '../../widgets/authWidgets'
import { Helmet } from 'react-helmet'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { useEffect } from 'react'
import { fetchCart } from '../../app/store/slice/cartSlice'

const Cart = () => {
	const userId = 6
	const dispatch = useAppDispatch()

	const products = useAppSelector(state => state.cart.products)

	
	useEffect(() => {
		dispatch(fetchCart(userId))
	}, [dispatch, userId])


	const totalSum = products.reduce((accumulator, product) => {
		return accumulator + product.total
	}, 0) 

	const discountedTotal = products.reduce((accumulator, product) => {
		return accumulator + product.discountedTotal 
	}, 0)

	const quantity = products.reduce((accumulator, product) => {
		return accumulator + product.quantity 
	}, 0)
	return (
		<div className={classes.cartContainer}>
			<Helmet>
				<title>My cart | Goods4you</title>
			</Helmet>
			<h1 className={classes.cartHeading}>My cart</h1>
			<div className={classes.cartContent}>
				<CartList userId={userId} />
				<div className={classes.cartPriceBlock}>
					<p className={classes.cartPrice1}>
						Total count{' '}
						<span className={classes.priceMod}>{quantity} items</span>
					</p>
					<p className={classes.cartPrice2}>
						Price without discount
						<span className={classes.priceMod}>${totalSum}</span>
					</p>
					<p className={classes.cartPrice3}>
						Total price{' '}
						<span className={classes.priceMod}>${discountedTotal}</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export { Cart }
