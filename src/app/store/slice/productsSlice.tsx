import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface Product {
	id: number
	title: string
	price: number
	thumbnail: string
}

interface ProductsState {
	products: Product[]
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

const initialState: ProductsState = {
	products: [],
	status: 'idle',
}

// Изменяем fetchProducts, чтобы принимать параметр skip
export const fetchProducts = createAsyncThunk<
	Product[],
	{ limit: number; skip: number }
>('products/fetchProducts', async ({ limit, skip }) => {
	const response = await fetch(
		`https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price,id,thumbnail`
	)
	if (!response.ok) {
		throw new Error('Ошибка при получении данных')
	}
	const data = await response.json()
	return data.products // Здесь мы возвращаем массив продуктов
})

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchProducts.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.status = 'succeeded'
				// Добавляем новые продукты в конец массива
				state.products.push(...action.payload) // Теперь TypeScript знает, что action.payload - это Product[]
			})
			.addCase(fetchProducts.rejected, state => {
				state.status = 'failed'
			})
	},
})

export default productsSlice.reducer
