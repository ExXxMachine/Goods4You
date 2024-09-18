import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
interface CartItem {
	id: number
	title: string
	price: number
	quantity: number
	total: number
	discountedTotal: number
	thumbnail: string
}

interface CartState {
	products: CartItem[]
	totalQuantity: number
	totalProducts: number 
	total: number 
	discountedTotal: number 
	status: 'idle' | 'loading' | 'succeeded' | 'failed' 
}

export const fetchCart = createAsyncThunk<CartState, number>(
	'cart/fetchCart',
	async userId => {
		const response = await fetch(`https://dummyjson.com/carts/user/${userId}`)
		if (!response.ok) {
			throw new Error('Ошибка при получении корзины')
		}
		const data = await response.json()
		const cart = data.carts[0] 
		return {
			products: cart.products || [],
			totalQuantity: cart.totalQuantity || 0,
			totalProducts: cart.totalProducts || 0,
			total: cart.total || 0,
			discountedTotal: cart.discountedTotal || 0,
			status: 'succeeded', 
		}
	}
)

const initialState: CartState = {
	products: [],
	totalQuantity: 0,
	totalProducts: 0,
	total: 0,
	discountedTotal: 0,
	status: 'idle',
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCart.pending, state => {
				state.status = 'loading'
			})
			.addCase(
				fetchCart.fulfilled,
				(state, action: PayloadAction<CartState>) => {
					state.status = action.payload.status 
					state.products = action.payload.products 
					state.totalQuantity = action.payload.totalQuantity
					state.totalProducts = action.payload.totalProducts 
					state.total = action.payload.total 
					state.discountedTotal = action.payload.discountedTotal 
				}
			)
			.addCase(fetchCart.rejected, state => {
				state.status = 'failed'
			})
	},
})

export default cartSlice.reducer
