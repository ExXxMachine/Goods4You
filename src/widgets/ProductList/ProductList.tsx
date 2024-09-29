// src/widgets/ProductList/ProductList.tsx

import React from 'react'
import classesProductList from './ProductList.module.css'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store/store'
import { ProductCard } from '../authWidgets'

interface ProductListProps {
	error: any
	isLoading: boolean
}

function ProductList({ error, isLoading }: ProductListProps) {
	const products = useSelector((state: RootState) => state.products.products)

	return (
		<section className={classesProductList.listContainer}>
			{isLoading && <div>Loading...</div>}
			{error && <div>Error loading products</div>}
			{!isLoading && products.length === 0 && <div>No products available.</div>}
			{!isLoading &&
				products.map((product: any) => (
					<ProductCard
						key={product.id}
						id={product.id}
						img={product.thumbnail}
						title={product.title}
						price={product.price}
					/>
				))}
		</section>
	)
}

export { ProductList }
