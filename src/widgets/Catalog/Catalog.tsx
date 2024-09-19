import classes from './Catalog.module.css'
import { ProductList } from '../authWidgets'
import { FuncBtn } from '../../shared/authShared'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/store/hooks'
import { fetchProducts } from '../../app/store/slice/productsSlice'

const Catalog: React.FC = () => {
	const dispatch = useAppDispatch()
	const products = useAppSelector(state => state.products.products) // Получаем продукты из состояния
	const [limit] = useState<number>(12) // Количество продуктов за один раз
	const [skip, setSkip] = useState<number>(0) // Начальное значение для skip
	const [loading, setLoading] = useState<boolean>(false) // Флаг загрузки
	const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(true) // Флаг для проверки наличия новых продуктов

	// Функция для загрузки начальных продуктов
	const loadInitialProducts = async () => {
		if (products.length === 0) {
			// Проверяем, есть ли уже загруженные продукты
			setLoading(true)
			try {
				const action = await dispatch(fetchProducts({ limit, skip }))
				if (Array.isArray(action.payload) && action.payload.length < limit) {
					setHasMoreProducts(false) // Если получено меньше продуктов, чем лимит
				}
			} catch (error) {
				console.error('Ошибка при загрузке продуктов:', error)
			} finally {
				setLoading(false) // Сбрасываем флаг после завершения запроса
			}
		}
	}

	// Загружаем продукты только один раз при монтировании компонента
	useEffect(() => {
		loadInitialProducts() // Вызываем функцию загрузки продуктов
	}, [dispatch]) // Зависимость только от dispatch

	// Функция для загрузки дополнительных продуктов
	const loadMoreProducts = async () => {
		if (loading || !hasMoreProducts) return // Если уже загружается или нет больше продуктов, не запускаем новый запрос

		const newSkip = skip + limit // Увеличиваем skip на количество загружаемых продуктов
		setSkip(newSkip) // Обновляем состояние skip
		setLoading(true) // Устанавливаем флаг загрузки

		try {
			const action = await dispatch(fetchProducts({ limit, skip: newSkip }))
			if (Array.isArray(action.payload) && action.payload.length < limit) {
				setHasMoreProducts(false) // Если получено меньше продуктов, чем лимит
			}
		} catch (error) {
			console.error('Ошибка при загрузке дополнительных продуктов:', error)
		} finally {
			setLoading(false) // Сбрасываем флаг после завершения запроса
		}
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
			{/* Передаем количество видимых продуктов в ProductList */}
			<ProductList />
			<div className={classes.catalogBtnBlock}>
				<FuncBtn
					title='Show more'
					onClick={loadMoreProducts}
					disabled={loading || !hasMoreProducts}
				/>{' '}
				{/* Добавляем обработчик клика */}
			</div>
		</div>
	)
}

export { Catalog }
