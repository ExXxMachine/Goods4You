import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { User, UserState } from '../../../entities/authEntities'

const initialState: UserState = {
	user: null,
	loading: false,
	error: null,
}

export const fetchUser = createAsyncThunk<User, void>(
	'user/fetchUser',
	async (_, { getState }) => {
		const state = getState() as { user: UserState }
		if (state.user.user) {
			return state.user.user
		}

		const response = await fetch('/api/auth/me', {
			method: 'GET',
			credentials: 'include',
		})

		if (!response.ok) {
			throw new Error('Failed to fetch user data')
		}

		return await response.json()
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearUser(state) {
			state.user = null
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchUser.pending, state => {
				state.loading = true
				state.error = null
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.loading = false
				state.user = action.payload
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.loading = false
				state.error = action.error.message || 'Failed to fetch user data'
			})
	},
})

export const { clearUser } = userSlice.actions
export default userSlice.reducer
