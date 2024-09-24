import React, { useState } from 'react'
import classesScroll from './ScrollItem.module.css'

interface ScrollItemProps {
	img: string[]
	thumbnail: string
}

const ScrollItem: React.FC<ScrollItemProps> = ({ img, thumbnail }) => {
	const [selectedIndex, setSelectedIndex] = useState<number>(0)
	const [fadeOut, setFadeOut] = useState<boolean>(false)

	const handleItemClick = (index: number) => {
		if (selectedIndex !== index) {
			setFadeOut(true)
			setTimeout(() => {
				setSelectedIndex(index)
				setFadeOut(false)
			}, 300)
		}
	}

	if (img.length === 0) {
		return null
	}

	return (
		<div className={classesScroll.Scroll__container}>
			<img
				src={img.length > 1 ? img[selectedIndex] : thumbnail}
				alt='Selected'
				className={`${classesScroll.mainImage} ${
					fadeOut ? classesScroll.fade_out : classesScroll.fade_in
				}`}
			/>

			{img.length > 1 && (
				<div className={classesScroll.previewContainer}>
					{img.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Scroll item ${index + 1}`}
							className={`${classesScroll.scroll__item} ${
								selectedIndex === index ? classesScroll.selected : ''
							}`}
							onClick={() => handleItemClick(index)}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export { ScrollItem }
