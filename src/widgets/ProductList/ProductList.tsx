import { description } from './ProductDescription'
import { ProductCard } from '../authWidgets'
import classesProductList from './ProductList.module.css'

function ProductList() {
	return (
		<div className={classesProductList.listContainer}>
			{description.map(card => (
				<ProductCard
					key={card.id}
					id={card.id}
					quantity={card.quantity}
					imgFull={card.imgFull}
					img={card.img}
					title={card.title}
					price={card.price}
					sale={card.sale}
				/>
			))}
		</div>
	)
}

export { ProductList }
