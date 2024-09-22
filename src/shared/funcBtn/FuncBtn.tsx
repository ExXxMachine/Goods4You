import React from 'react'
import classesFuncBtn from './FuncBtn.module.css'

interface FuncBtnProps {
	title: string 
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void 
	disabled?: boolean 
}

const FuncBtn: React.FC<FuncBtnProps> = ({
	title,
	onClick,
	disabled = false,
}) => {
	return (
		<button
			className={classesFuncBtn.FuncBtn}
			onClick={onClick}
			disabled={disabled} 
		>
			{title}
		</button>
	)
}

export { FuncBtn }
