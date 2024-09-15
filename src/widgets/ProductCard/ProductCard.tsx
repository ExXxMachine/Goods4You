import React, { useState } from 'react'
import classesProductCard from './ProductCard.module.css'
import { CardBtn, AddBtn } from '../../shared/authShared'
import { Link } from 'react-router-dom'

interface ProductCardProps {
	img: string
	imgFull: string
	title: string
	price: number
	quantity: number
	sale: number
	id: number
}

const ProductCard: React.FC<ProductCardProps> = ({
	img,
	title,
	price,
	sale,
	imgFull,
	id,
}) => {
	const [count, setCount] = useState(0)
	const isAddBtnVisible = count < 1

	const handleAddClick = () => setCount(1)
	const handleIncrement = () => setCount(prevCount => prevCount + 1)
	const handleDecrement = () =>
		setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 0))

	return (
		<div className={classesProductCard.cardContainer}>
			<Link to={`/product/${id}`} state={{ title, price, sale, imgFull }}>
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
						<h3>{title}</h3>
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
