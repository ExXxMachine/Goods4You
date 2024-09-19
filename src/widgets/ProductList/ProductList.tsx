import { ProductCard } from '../authWidgets'
import classesProductList from './ProductList.module.css'
import { useAppSelector } from '../../app/store/hooks'

function ProductList() {
	const products = useAppSelector(state => state.products.products)

	return (
		<div className={classesProductList.listContainer}>
			{products.map(product => (
				<ProductCard
					key={product.id} // Убедитесь, что ключ уникален
					id={product.id}
					img={product.thumbnail}
					title={product.title}
					price={product.price}
				/>
			))}
		</div>
	)
}

export { ProductList }
