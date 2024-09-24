import { useEffect, useState, FC } from 'react'
import classes from './OneProduct.module.css'
import { useParams, Navigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import {
	StarRating,
	ScrollItem,
	FuncBtn,
	AddBtn,
} from '../../shared/authShared'
import { Helmet } from 'react-helmet'
import { fetchDescriptionById } from '../../app/store/slice/descriptionSlice'

const OneProduct: FC = () => {
	const { id } = useParams<{ id: string }>()
	const dispatch = useAppDispatch()

	const descriptions = useAppSelector(state => state.descriptions.descriptions)
	const status = useAppSelector(state => state.descriptions.status)
	const cartItems = useAppSelector(state => state.cart.products)

	const productInCart = cartItems.find(item => item.id === Number(id))
	const [count, setCount] = useState(0)

	const isAddBtnVisible = count < 1

	const handleAddClick = () => setCount(1)
	const handleIncrement = () => setCount(prevCount => prevCount + 1)
	const handleDecrement = () =>
		setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1))

	useEffect(() => {
		if (id) {
			dispatch(fetchDescriptionById(Number(id)))
		}

		if (productInCart) {
			setCount(productInCart.quantity)
		}
	}, [dispatch, id, productInCart])

	// Check for loading status
	if (status === 'loading') {
		return <p>Loading...</p>
	}

	// Check for failed status and redirect only if descriptions are not available
	if (status === 'failed' || !descriptions) {
		return <Navigate to='/404' />
	}

	const discountPercentage =
		descriptions.price && descriptions.discountPercentage
			? (descriptions.price * (100 - descriptions.discountPercentage)) / 100
			: 0

	return (
		<main className={classes.productContainer}>
			<Helmet>
				<title>{descriptions.title} | Goods4you</title>
				<meta
					name='description'
					content={`Buy ${
						descriptions.title
					} for just $${discountPercentage.toFixed(2)}. Only ${
						descriptions.stock
					} items left in stock!`}
				/>
			</Helmet>

			<ScrollItem
				thumbnail={descriptions.thumbnail}
				img={descriptions.images}
			/>

			<div className={classes.productDescription}>
				<h2 className={classes.productTitle}>{descriptions.title}</h2>
				<div className={classes.productRating}>
					<StarRating rating={Math.round(descriptions.rating)} />{' '}
					<p>{descriptions.tags.join(', ')}</p>
				</div>
				<p className={classes.productAlert}>
					In Stock - Only {descriptions.stock} left!
				</p>
				<p className={classes.productDescriptionText}>
					{descriptions.description}
				</p>
				<div className={classes.productPriceBlock}>
					<div className={classes.devBlock}>
						<div className={classes.productPriceContainer}>
							<h2 className={classes.productPriceNew}>
								${discountPercentage.toFixed(2)}
							</h2>
							<p className={classes.productPriceOld}>${descriptions.price}</p>
						</div>
						<p className={classes.productSale}>
							Your discount: <span>{descriptions.discountPercentage}%</span>
						</p>
					</div>
					{isAddBtnVisible ? (
						<FuncBtn onClick={handleAddClick} title='Add to cart' />
					) : (
						<AddBtn
							quantity={count}
							onIncrement={handleIncrement}
							onDecrement={handleDecrement}
						/>
					)}
				</div>
			</div>
		</main>
	)
}

export { OneProduct }
