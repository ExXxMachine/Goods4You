import React from 'react'

interface CardBtnProps {
	onClick: () => void
	label?: string 
}

const CardBtn: React.FC<CardBtnProps> = ({ onClick, label }) => {
	return (
		<button onClick={onClick}>
			{label} 
		</button>
	)
}

export { CardBtn }
