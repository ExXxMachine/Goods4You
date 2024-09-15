import classes from './CartList.module.css'
import { CartItem } from '../authWidgets'
import { description } from '../ProductList/ProductDescription'

function CartList() {
	return (
		<div className={classes.cartListContainer}>
			{description.slice(0, 4).map(card => (
				<CartItem
					key={card.id}
					id={card.id}
					imgFull={card.imgFull}
					imgSml={card.imgSml}
					title={card.title}
					price={card.price}
					sale={card.sale}
					quantity={card.quantity || 1}
					deleted={!!card.deleted}
				/>
			))}
		</div>
	)
}

export { CartList }
