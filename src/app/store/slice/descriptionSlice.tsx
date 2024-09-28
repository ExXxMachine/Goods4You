import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { ProductDescription, DescriptionState} from '../../../entities/authEntities'

const initialState: DescriptionState = {
	descriptions: null,
	status: 'idle',
}

export const fetchDescriptionById = createAsyncThunk<
	ProductDescription,
	number
>('descriptions/fetchDescriptionById', async id => {
	const response = await fetch(
		`https://dummyjson.com/products/${id}?select=title,price,id,warrantyInformation,shippingInformation,stock,description,tags,rating,thumbnail,discountPercentage,images`
	)
	if (!response.ok) {
		throw new Error('Ошибка при получении данных')
	}
	return await response.json()
})

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
				state.descriptions = action.payload
			})
			.addCase(fetchDescriptionById.rejected, state => {
				state.status = 'failed'
			})
	},
})

export default descriptionSlice.reducer
