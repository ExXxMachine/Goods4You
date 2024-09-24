import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Product {
	id: number
	title: string
	price: number
	thumbnail: string
}

interface ProductsState {
	products: Product[]
}

const initialState: ProductsState = {
	products: [],
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProducts: (state, action: PayloadAction<Product[]>) => {
			state.products = [...state.products, ...action.payload]
		},
		clearProducts: state => {
			state.products = []
		},
	},
})

export const { addProducts, clearProducts } = productsSlice.actions
export default productsSlice.reducer
