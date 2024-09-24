import React, { useEffect, useState } from 'react'
import classes from './CartItem.module.css'
import { Link } from 'react-router-dom'
import { AddBtn, CardBtn } from '../../shared/authShared'
import { useAppDispatch } from '../../app/store/hooks'
import { updateCartQuantity } from '../../app/store/slice/cartSlice'

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
	const dispatch = useAppDispatch()
	const [count, setCount] = useState(quantity) 

	
	useEffect(() => {
		setCount(quantity)
	}, [quantity])

	const handleAddClick = () => {
		setCount(1)
		dispatch(updateCartQuantity({ id, quantity: 1 })) 
	}

	const handleIncrement = () => {
		setCount(prevCount => {
			const newCount = prevCount + 1
			dispatch(updateCartQuantity({ id, quantity: newCount })) 
			return newCount
		})
	}

	const handleDecrement = () => {
		setCount(prevCount => {
			if (prevCount > 1) {
				const newCount = prevCount - 1
				dispatch(updateCartQuantity({ id, quantity: newCount })) 
				return newCount
			}
			return 1 
		})
	}

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
