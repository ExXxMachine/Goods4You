import React, { useState } from 'react'
import classes from './StarRating.module.css' // Импортируем CSS-модули
import StarIcon from '../../app/assets/StarIcon.svg' // Импортируем иконку звезды

interface StarRatingProps {
	rating: number
}

const StarRating: React.FC<StarRatingProps> = ({ rating: initialRating }) => {
	const [rating, setRating] = useState<number>(initialRating) // Устанавливаем начальный рейтинг
	const [hoveredRating, setHoveredRating] = useState<number>(0) // Устанавливаем рейтинг при наведении

	const handleClick = (value: number) => {
		setRating(value) // Обновляем рейтинг при клике
	}

	const handleMouseEnter = (value: number) => {
		setHoveredRating(value) // Обновляем рейтинг при наведении
	}

	const handleMouseLeave = () => {
		setHoveredRating(0) // Сбрасываем рейтинг при уходе мыши
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
