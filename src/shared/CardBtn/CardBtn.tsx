import classesBtn from './CardBtn.module.css'
import CardImg from '../../app/assets/card__ico.svg'

interface CardBtnProps {
	onClick?: () => void
}

const CardBtn: React.FC<CardBtnProps> = ({ onClick }) => {
	return (
		<button className={classesBtn.CardBtn} onClick={onClick} aria-label='Add to cart'>
			<img src={CardImg} alt='cardimg' />
		</button>
	)
}

export { CardBtn }
