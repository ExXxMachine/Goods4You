import React, { useState } from 'react'
import classes from './CartItem.module.css'
import { Link } from 'react-router-dom'
import { AddBtn, CardBtn } from '../../shared/authShared'

interface CartItemProps {
	id: number
	title: string
	price: number
	quantity: number
	total: number
	discountedTotal: number
	thumbnail: string
	discountPercentage?: number
	deleted?: boolean
}

const CartItem: React.FC<CartItemProps> = ({
	title,
	price,
	id,
	discountPercentage,
	discountedTotal,
	thumbnail,
	deleted,
	quantity,
}) => {
	const [count, setCount] = useState(quantity)

	const handleAddClick = () => setCount(1)
	const handleIncrement = () => setCount(count + 1)
	const handleDecrement = () => setCount(count > 1 ? count - 1 : 1)

	const isAddBtnVisible = count < 1

	const truncateText = (text: string, length: number) => {
		if (text.length > length) {
			return text.substring(0, length) + '...'
		}
		return text
	}

	return (
		<div
			className={`${classes.cartItemContainer} ${
				deleted ? classes.deletedBlock : ''
			}`}
		>
			<div className={`${classes.divBlock} ${deleted ? classes.deleted : ''}`}>
				<img
					src={thumbnail}
					alt={`${title} thumbnail`}
					className={classes.cartImg}
				/>
				<div>
					<Link
						className={classes.cartItemTitle}
						to={`/product/${id}`}
						state={{
							title,
							price,
							discountPercentage,
							thumbnail,
							discountedTotal,
						}}
					>
						{truncateText(title, 30)}
					</Link>
					<p>${price}</p>
				</div>
			</div>
			{deleted ? (
				<CardBtn />
			) : (
				<div className={classes.cartControlBlock}>
					<AddBtn
						quantity={count}
						onIncrement={handleIncrement}
						onDecrement={handleDecrement}
					/>
					<button
						className={classes.cartItemDeleteBtn}
						onClick={handleAddClick}
						disabled={isAddBtnVisible}
					>
						Delete
					</button>
				</div>
			)}
		</div>
	)
}

export { CartItem }
