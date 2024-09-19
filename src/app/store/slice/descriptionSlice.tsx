// src/app/store/slice/descriptionSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Определяем интерфейс для описания товара
export interface ProductDescription {
	id: number
	title: string
	price: number
	discountPercentage: number
	stock: number
	thumbnail: string
	description: string
	warrantyInformation: string
	shippingInformation: string
  tags:string[]
  rating: number
}
	
interface DescriptionState {
	descriptions: ProductDescription | null // Описание товара
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

// Начальное состояние
const initialState: DescriptionState = {
	descriptions: null,
	status: 'idle',
}

// Асинхронное действие для получения описания товара по ID
export const fetchDescriptionById = createAsyncThunk<
	ProductDescription,
	number
>('descriptions/fetchDescriptionById', async id => {
	const response = await fetch(
		`https://dummyjson.com/products/${id}?select=title,price,id,warrantyInformation,shippingInformation,stock,description,tags,rating,thumbnail,discountPercentage`
	)
	if (!response.ok) {
		throw new Error('Ошибка при получении данных')
	}
	const data = await response.json()
	return data // Возвращаем данные о товаре
})

// Создаем slice
const descriptionSlice = createSlice({
	name: 'descriptions',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchDescriptionById.pending, state => {
				state.status = 'loading'
			})
			.addCase(fetchDescriptionById.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.descriptions = action.payload // Сохраняем информацию о товаре
			})
			.addCase(fetchDescriptionById.rejected, state => {
				state.status = 'failed'
			})
	},
})

// Экспортируем редьюсер и асинхронные действия
export default descriptionSlice.reducer
