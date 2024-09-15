import React, { useState } from 'react'
import classes from './CartItem.module.css'
import { Link } from 'react-router-dom'
import { AddBtn, CardBtn } from '../../shared/authShared'

interface CartItemProps {
	imgFull: string
	imgSml: string
	title: string
	price: number
	quantity: number
	sale: number
	deleted: boolean
	id: number
}

const CartItem: React.FC<CartItemProps> = ({
	title,
	imgSml,
	price,
	id,
	sale,
	imgFull,
	deleted,
	quantity,
}) => {
	const [count, setCount] = useState(quantity)

	const handleAddClick = () => setCount(1)
	const handleIncrement = () => setCount(count + 1)
	const handleDecrement = () => setCount(count > 1 ? count - 1 : 1)

	const isAddBtnVisible = count < 1

	return (
		<div
			className={`${classes.cartItemContainer} ${
				deleted ? classes.deletedBlock : ''
			}`}
		>
			<div className={`${classes.divBlock} ${deleted ? classes.deleted : ''}`}>
				<img src={imgSml} alt={`${title} thumbnail`} />
				<div>
					<Link
						className={classes.cartItemTitle}
						to={`/product/${id}`}
						state={{ title, price, sale, imgFull }}
					>
						{title}
					</Link>
					<p>${price}</p>
				</div>
			</div>
			{deleted ? (
				<CardBtn />
			) : (
				<>
					<AddBtn
						quantity={count}
						onIncrement={handleIncrement}
						onDecrement={handleDecrement}
					/>
					<button
						className={classes.cardItemDeleteBtn}
						onClick={handleAddClick}
						disabled={isAddBtnVisible}
					>
						Delete
					</button>
				</>
			)}
		</div>
	)
}

export { CartItem }
