import React from 'react'
import classesAddBtn from './AddBtn.module.css'

interface AddBtnProps {
	quantity: number
	onIncrement: () => void
	onDecrement: () => void
}

const AddBtn: React.FC<AddBtnProps> = ({
	quantity,
	onIncrement,
	onDecrement,
}) => {
	return (
		<div className={classesAddBtn.AddBtn__container}>
			<button className={classesAddBtn.AddBtn} onClick={onDecrement}>
				<svg width='18' height='3' viewBox='0 0 18 3' fill='none'>
					<rect width='18' height='3' fill='white' />
				</svg>
			</button>
			<p className={classesAddBtn.AddBtn__counter}>{quantity} item</p>
			<button className={classesAddBtn.AddBtn} onClick={onIncrement}>
				<svg width='19' height='19' viewBox='0 0 19 19' fill='none'>
					<rect x='8' y='0' width='3' height='19' fill='white' />
					<rect x='0' y='8' width='19' height='3' fill='white' />
				</svg>
			</button>
		</div>
	)
}

export { AddBtn }
