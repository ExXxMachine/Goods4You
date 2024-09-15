import React from 'react'
import classesFuncBtn from './FuncBtn.module.css'
interface FuncBtnProps {
	title: string 
	onClick?: () => void 
}

const FuncBtn: React.FC<FuncBtnProps> = ({ title, onClick }) => {
	return <button className={classesFuncBtn.FuncBtn} onClick={onClick}>{title}</button>
}

export { FuncBtn }
