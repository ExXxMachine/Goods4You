import React, { useState } from 'react'
import classes from './StarRating.module.css'
import StarIcon from '../../app/assets/StarIcon.svg'

const StarRating: React.FC = () => {
	const [rating, setRating] = useState<number>(0)
	const [hoveredRating, setHoveredRating] = useState<number>(0)

	const handleClick = (value: number) => {
		setRating(value)
	}

	const handleMouseEnter = (value: number) => {
		setHoveredRating(value)
	}

	const handleMouseLeave = () => {
		setHoveredRating(0)
	}

	return (
		<div className={classes.starRating}>
			{[1, 2, 3, 4, 5].map(value => (
				<span
					key={value}
					className={`${classes.star} ${
						value <= (hoveredRating || rating) ? classes.filled : ''
					}`}
					onClick={() => handleClick(value)}
					onMouseEnter={() => handleMouseEnter(value)}
					onMouseLeave={handleMouseLeave}
					role='button'
					aria-label={`Rate ${value} stars`}
				>
					<img src={StarIcon} alt='Star' />
				</span>
			))}
		</div>
	)
}

export { StarRating }
