import React, { useEffect, useState } from 'react'
import classesProductCard from './ProductCard.module.css'
import { CardBtn, AddBtn } from '../../shared/authShared'
import { Link } from 'react-router-dom'
import { useAppSelector } from '../../app/store/hooks'	

interface ProductCardProps {
	img: string
	title: string
	price: number
	id: number
}

const ProductCard: React.FC<ProductCardProps> = ({ img, title, price, id }) => {
	const [count, setCount] = useState(0)
	const isAddBtnVisible = count < 1

	const cartItems = useAppSelector(state => state.cart.products) 
	const productInCart = cartItems.find(item => item.id === id) 

	useEffect(() => {
		if (productInCart) {
			setCount(productInCart.quantity)
		}
	}, [productInCart])

	const handleAddClick = () => setCount(1)
	const handleIncrement = () => setCount(prevCount => prevCount + 1)
	const handleDecrement = () =>
		setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 0))

	return (
		<div className={classesProductCard.cardContainer}>
			<Link to={`/product/${id}`}>
				<div className={classesProductCard.cardImgBlock}>
					<img src={img} alt={title} />
					<div className={classesProductCard.overlay}>
						<span>Show details</span>
					</div>
				</div>
			</Link>
			<div className={classesProductCard.cardDescriptionBlock}>
				<div className={classesProductCard.cardTextBlock}>
					<Link to={`/product/${id}`} className={classesProductCard.cardTitle}>
						<span>{title}</span>
					</Link>
					<p className={classesProductCard.cardPrice}>${price.toFixed(2)}</p>
				</div>
				{isAddBtnVisible ? (
					<CardBtn onClick={handleAddClick} />
				) : (
					<AddBtn
						quantity={count}
						onIncrement={handleIncrement}
						onDecrement={handleDecrement}
					/>
				)}
			</div>
		</div>
	)
}

export { ProductCard }
