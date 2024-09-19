import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slice/cartSlice'
import productsReducer from './slice/productsSlice'
import descriptionsReducer from './slice/descriptionSlice'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		products: productsReducer,
		descriptions: descriptionsReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
