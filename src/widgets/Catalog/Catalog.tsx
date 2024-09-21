import classes from './Catalog.module.css'
import { ProductList } from '../authWidgets'
import { FuncBtn } from '../../shared/authShared'
import { useEffect, useState } from 'react'
import { useFetchProductsQuery } from '../../app/store/slice/productsApi'

const Catalog: React.FC = () => {
	const [limit] = useState<number>(12) // Количество продуктов за один раз
	const [skip, setSkip] = useState<number>(0) // Начальное значение для skip
	const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true) // Флаг для проверки наличия новых продуктов
	const [allProducts, setAllProducts] = useState<any[]>([]) // Локальное состояние для хранения всех загруженных продуктов

	// Используем хук для получения продуктов
	const {
		data: fetchedProducts = [],
		error,
		isLoading,
	} = useFetchProductsQuery({ limit, skip })

	// Логируем полученные данные
	console.log('Fetched Products:', fetchedProducts)

	// Проверка на наличие загруженных данных
	useEffect(() => {
		if (fetchedProducts.length < limit) {
			setHasMoreProducts(false) // Если получено меньше продуктов, чем лимит
		}
		if (fetchedProducts.length > 0) {
			setAllProducts(prev => [...prev, ...fetchedProducts]) // Добавляем новые продукты к уже существующим
		}
	}, [fetchedProducts])

	// Функция для загрузки дополнительных продуктов
	const loadMoreProducts = () => {
		if (!hasMoreProducts || isLoading) return // Если нет больше продуктов или идет загрузка

		setSkip(prevSkip => prevSkip + limit) // Увеличиваем skip на количество загружаемых продуктов
		console.log(allProducts)
	}

	return (
		<div className={classes.catalogContainer}>
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
			/>
			{/* Передаем все загруженные продукты в ProductList */}
			<ProductList
				products={fetchedProducts} // Передаем allProducts вместо fetchedProducts
				error={error}
				isLoading={isLoading}
			/>
			<div className={classes.catalogBtnBlock}>
				<FuncBtn
					title='Show more'
					onClick={loadMoreProducts}
					disabled={!hasMoreProducts || isLoading} // Отключаем кнопку при отсутствии товаров или загрузке
				/>
			</div>
		</div>
	)
}

export { Catalog }
