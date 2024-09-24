import classes from './Catalog.module.css'
import { ProductList } from '../authWidgets'
import { FuncBtn } from '../../shared/authShared'
import { FC, useEffect, useState } from 'react'
import { useFetchProductsQuery } from '../../app/store/slice/productsApi'
import { useDispatch } from 'react-redux'
import { addProducts, clearProducts } from '../../app/store/slice/productsSlice'

const Catalog: FC = () => {
	const dispatch = useDispatch()
	const [limit] = useState<number>(12)
	const [skip, setSkip] = useState<number>(0)
	const [searchQuery, setSearchQuery] = useState<string>('')
	const [debouncedQuery, setDebouncedQuery] = useState<string>('')

	const {
		data: fetchedProducts,
		error,
		isLoading,
	} = useFetchProductsQuery({ limit, skip, q: debouncedQuery })

	useEffect(() => {
		if (fetchedProducts && Array.isArray(fetchedProducts.products)) {
			dispatch(addProducts(fetchedProducts.products))
		}
	}, [fetchedProducts, dispatch])

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedQuery(searchQuery === '' ? ' ' : searchQuery)
			if (searchQuery) {
				setSkip(0)
				dispatch(clearProducts())
			} else {
				dispatch(clearProducts())
			}
		}, 1000)

		return () => {
			clearTimeout(handler)
		}
	}, [searchQuery, dispatch])

	return (
		<section className={classes.catalogContainer}>
			<h2 className={classes.catalogTitle}>
				<a id='catalog' className={classes.catalogAnchor}>
					Catalog
				</a>
			</h2>
			<input
				type='text'
				placeholder='Search by title'
				className={classes.catalogSearchInput}
				aria-label='Search products by title'
				value={searchQuery}
				onChange={e => setSearchQuery(e.target.value)}
			/>
			<ProductList error={error} isLoading={isLoading} />
			<div className={classes.catalogBtnBlock}>
				{fetchedProducts && fetchedProducts.products.length >= limit && (
					<FuncBtn
						title='Show more'
						onClick={() => {
							setSkip(prevSkip => prevSkip + limit)
						}}
						disabled={
							!fetchedProducts || fetchedProducts.products.length < limit
						}
					/>
				)}
			</div>
		</section>
	)
}

export { Catalog }
