import { ProductCard } from '../authWidgets'
import classesProductList from './ProductList.module.css'

interface ProductListProps {
	products: any[] // Массив продуктов
	error: any // Ошибка, если есть
	isLoading: boolean // Статус загрузки
}

function ProductList({ products, error, isLoading }: ProductListProps) {
	console.log(products)
	return (
		<div className={classesProductList.listContainer}>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error loading products</div>}
			{!isLoading &&
				products?.products.map((product: any) => (
					<ProductCard
						key={product.id}
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
