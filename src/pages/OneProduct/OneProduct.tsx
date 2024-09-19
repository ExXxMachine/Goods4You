import React, { useEffect } from 'react'
import classes from './OneProduct.module.css'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { StarRating, ScrollItem, FuncBtn } from '../../shared/authShared'
import { Helmet } from 'react-helmet'
import { fetchDescriptionById } from '../../app/store/slice/descriptionSlice'

const OneProduct: React.FC = () => {
	const { id } = useParams<{ id: string }>() 
	const dispatch = useAppDispatch()

	const descriptions = useAppSelector(state => state.descriptions.descriptions)
	const status = useAppSelector(state => state.descriptions.status)

	useEffect(() => {
		dispatch(fetchDescriptionById(Number(id))) 
	}, [dispatch, id])

	if (status === 'loading') {
		return <p>Загрузка...</p>
	}

	if (status === 'failed') {
		return <p>Ошибка при загрузке товара.</p>
	}

	if (!descriptions) {
		return <p>Нет данных о товаре.</p>
	}

	const discountPercentage =
		descriptions.price && descriptions.discountPercentage
			? (descriptions.price * (100 - descriptions.discountPercentage)) / 100
			: 0 

	return (
		<div className={classes.productContainer}>
			<Helmet>
				<title>{descriptions.title} | Goods4you</title>
			</Helmet>
			<div className={classes.productImageContainer}>
				<img
					src={descriptions.thumbnail}
					alt={descriptions.title}
					className={classes.productImage}
				/>
				<ScrollItem img={descriptions.thumbnail} />
			</div>
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
				<p className={classes.productDelivery}>
					{descriptions.warrantyInformation}
				</p>
				<p className={classes.productDelivery}>
					{descriptions.shippingInformation}
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
					<FuncBtn title='Add to cart' />
				</div>
			</div>
		</div>
	)
}

export { OneProduct }
