import React from 'react'
import classesFuncBtn from './FuncBtn.module.css'

interface FuncBtnProps {
	title: string // Заголовок кнопки
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void // Обработчик клика
	disabled?: boolean // Свойство для отключения кнопки
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
			disabled={disabled} // Устанавливаем свойство disabled
		>
			{title}
		</button>
	)
}

export { FuncBtn }
