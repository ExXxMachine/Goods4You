import React from 'react'
import classesFuncBtn from './FuncBtn.module.css'

interface FuncBtnProps {
	title: string
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
	disabled?: boolean
	type?: 'button' | 'submit' | 'reset',
}

const FuncBtn: React.FC<FuncBtnProps> = ({
	title,
	onClick,
	type,
	disabled = false,
}) => {
	return (
		<button
			type={type}
			className={classesFuncBtn.FuncBtn}
			onClick={onClick}
			disabled={disabled}
		>
			{title}
		</button>
	)
}

export { FuncBtn }
