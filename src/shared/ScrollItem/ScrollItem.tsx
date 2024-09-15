import React, { useState } from 'react'
import classesScroll from './ScrollItem.module.css'
interface ScrollItemProps {
	img: string
}

const ScrollItem: React.FC<ScrollItemProps> = ({ img }) => {
	const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

	const handleItemClick = (index: number) => {
		setSelectedIndex(index)
	}

	return (
		<div className={classesScroll.Scroll__container}>
			{[1, 2, 3, 4, 5, 6].map((_, index) => (
				<img
					key={index}
					src={img}
					alt={`Scroll item ${index + 1}`}
					className={`${classesScroll.scroll__item} ${
						selectedIndex === index
							? classesScroll.selected
							: selectedIndex === null && index === 0
							? classesScroll.selected
							: ''
					}`}
					onClick={() => handleItemClick(index)}
				/>
			))}
		</div>
	)
}

export { ScrollItem }
