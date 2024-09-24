import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
	id: number
	title: string
	price: number
	quantity: number
	total: number
	discountedTotal: number
	thumbnail: string
	discountPercentage?: number 
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
			throw new Error('Error fetching cart')
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
	reducers: {
		updateCartQuantity(
			state,
			action: PayloadAction<{ id: number; quantity: number }>
		) {
			const { id, quantity } = action.payload

			const product = state.products.find(item => item.id === id)
			if (product) {
				product.quantity = quantity
				product.total = product.price * quantity 
				product.discountedTotal =
					product.total * (1 - (product.discountPercentage || 0) / 100)

				state.totalQuantity = state.products.reduce(
					(acc, item) => acc + item.quantity,
					0
				)
				state.total = state.products.reduce((acc, item) => acc + item.total, 0)
				state.discountedTotal = state.products.reduce(
					(acc, item) => acc + item.discountedTotal,
					0
				)
			}
		},
	},
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

export const { updateCartQuantity } = cartSlice.actions

export default cartSlice.reducer
