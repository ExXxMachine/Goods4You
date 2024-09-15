import classes from './Cart.module.css'
import { CartList } from '../../widgets/authWidgets'
import { Helmet } from 'react-helmet'

const Cart = () => {
	return (
		<div className={classes.cartContainer}>
			<Helmet>
				<title>My cart | Goods4you</title>
			</Helmet>
			<h1 className={classes.cartHeading}>My cart</h1>
			<div className={classes.cartContent}>
				<CartList />
				<div className={classes.cartPriceBlock}>
					<p className={classes.cartPrice1}>
						Total count <span className={classes.priceMod}>3 items</span>
					</p>
					<p className={classes.cartPrice2}>
						Price without discount
						<span className={classes.priceMod}>$700</span>
					</p>
					<p className={classes.cartPrice3}>
						Total price <span className={classes.priceMod}>$590</span>
					</p>
				</div>
			</div>
		</div>
	)
}

export { Cart }
