// src/pages/authPage/CartItem.tsx

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
}

const CartItem: React.FC<CartItemProps> = ({
	title,
	price,
	id,
	discountPercentage,
	discountedTotal,
	thumbnail,
	quantity,
}) => {
	const dispatch = useAppDispatch()
	const [count, setCount] = useState(quantity)
	const [deleted, setDeleted] = useState(false) // State to track if the item is deleted

	useEffect(() => {
		setCount(quantity)
		if (quantity === 0) {
			setDeleted(true) // Set deleted state to true if quantity is 0
		}
	}, [quantity])

	const handleAddClick = () => {
		setCount(1)
		dispatch(updateCartQuantity({ id, quantity: 1 }))
		setDeleted(false) // Reset deleted state when adding back
	}

	const handleIncrement = () => {
		setCount(prevCount => {
			const newCount = prevCount + 1
			dispatch(updateCartQuantity({ id, quantity: newCount }))
			setDeleted(false) // Reset deleted state when incrementing
			return newCount
		})
	}

	const handleDecrement = () => {
		setCount(prevCount => {
			if (prevCount > 1) {
				const newCount = prevCount - 1
				dispatch(updateCartQuantity({ id, quantity: newCount }))
				return newCount
			} else {
				setDeleted(true) // Set deleted state to true if count becomes 0
				dispatch(updateCartQuantity({ id, quantity: 0 })) // Update Redux state
				return 0 // Set count to 0
			}
		})
	}

	const handleRestore = () => {
		setCount(1)
		dispatch(updateCartQuantity({ id, quantity: 1 })) // Restore quantity in Redux
		setDeleted(false) // Reset deleted state when restoring
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
				<CardBtn onClick={handleRestore} /> // Restore button when deleted
			) : (
				<div className={classes.cartControlBlock}>
					<AddBtn
						quantity={count}
						onIncrement={handleIncrement}
						onDecrement={handleDecrement}
					/>
					<button
						className={classes.cartItemDeleteBtn}
						onClick={() => {
							setCount(0)
							setDeleted(true) // Set deleted state when deleting
							dispatch(updateCartQuantity({ id, quantity: 0 })) // Update Redux state
						}}
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
