import React from 'react'
import classes from './OneProduct.module.css'
import { useLocation } from 'react-router-dom'
import { StarRating, ScrollItem, FuncBtn } from '../../shared/authShared'
import { Helmet } from 'react-helmet'

const OneProduct: React.FC = () => {
	const location = useLocation()
	const { imgFull, title, price, sale } = location.state || {}

	if (!imgFull || !title || price === undefined || sale === undefined) {
		return <div>Product not found</div>
	}

	const discountedPrice = price - (price * sale) / 100

	return (
		<div className={classes.productContainer}>
			<Helmet>
				<title>{title} | Goods4you</title>
			</Helmet>
			<div className={classes.productImageContainer}>
				<img src={imgFull} alt={title} className={classes.productImage} />
				<ScrollItem img={imgFull} />
			</div>
			<div className={classes.productDescription}>
				<h2 className={classes.productTitle}>{title}</h2>
				<div className={classes.productRating}>
					<StarRating /> <p>electronics, selfie accessories</p>
				</div>
				<p className={classes.productAlert}>In Stock - Only 5 left!</p>
				<p className={classes.productDescriptionText}>
					The Essence Mascara Lash Princess is a popular mascara known for its
					volumizing and lengthening effects.
				</p>
				<p className={classes.productDelivery}>1 month warranty</p>
				<p className={classes.productDelivery}>Ships in 1 month</p>
				<div className={classes.productPriceBlock}>
					<div className={classes.devBlock}>
						<div className={classes.productPriceContainer}>
							<h2 className={classes.productPriceNew}>
								${discountedPrice.toFixed(2)}
							</h2>
							<p className={classes.productPriceOld}>${price.toFixed(2)}</p>
						</div>
						<p className={classes.productSale}>
							Your discount: <span>{sale}%</span>
						</p>
					</div>
					<FuncBtn title='Add to cart' />
				</div>
			</div>
		</div>
	)
}

export { OneProduct }
