import classes from './CartList.module.css'
import { CartItem } from '../authWidgets'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { useEffect } from 'react'
import { fetchCart } from '../../app/store/slice/cartSlice'

const CartList: React.FC<{ userId: number }> = ({ userId }) => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.cart.products)
	
	useEffect(() => {
		dispatch(fetchCart(userId))
	}, [dispatch, userId])

	return (
		<section className={classes.cartListContainer}>
			{products.slice(0, 4).map(product => (
				<CartItem
					key={product.id}
					id={product.id}
					thumbnail={product.thumbnail}
					title={product.title}
					price={product.price}
					quantity={product.quantity || 1}
					total={product.total}
					discountedTotal={product.discountedTotal} 
				/>
			))}
		</section>
	)
}

export { CartList }
