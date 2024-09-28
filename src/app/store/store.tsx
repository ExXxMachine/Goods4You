import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import productsReducer from "./slice/productsSlice";
import descriptionsReducer from "./slice/descriptionSlice";
import { productsApi } from "./slice/productsApi";
import userReducer from './slice/userSlice'

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		products: productsReducer,
		descriptions: descriptionsReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		user: userReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(productsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

