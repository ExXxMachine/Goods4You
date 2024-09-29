// src/app/store/slice/cartSlice.test.ts

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { fetchCart } from './cartSlice'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice' // Импортируйте ваш редюсер

// Мокируем getToken
vi.mock('../../../features/tokenService', () => ({
	getToken: vi.fn(() => 'mocked-token'), // Возвращаем фиксированное значение
}))

describe('fetchCart', () => {
	const mockFetch = vi.fn() // Создаем мок для fetch

	beforeEach(() => {
		global.fetch = mockFetch // Присваиваем мок fetch
	})

	afterEach(() => {
		vi.clearAllMocks() // Очищаем моки после каждого теста
	})

	it('должен успешно возвращать данные корзины', async () => {
		mockFetch.mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				carts: [
					{
						products: [],
						totalQuantity: 0,
						totalProducts: 0,
						total: 0,
						discountedTotal: 0,
					},
				],
			}),
		})

		const store = configureStore({
			reducer: {
				cart: cartReducer,
			},
		})

		await store.dispatch(fetchCart(1)) // Диспетчируем fetchCart

		const state = store.getState().cart // Получаем состояние корзины
		expect(state.products).toEqual([])
		expect(state.totalQuantity).toBe(0)
	})

	it('должен выбрасывать ошибку при неуспешном ответе', async () => {
		mockFetch.mockResolvedValueOnce({ ok: false })

		const store = configureStore({
			reducer: {
				cart: cartReducer,
			},
		})

		const result = await store.dispatch(fetchCart(1)) // Диспетчируем fetchCart

		expect(result.type).toBe('cart/fetchCart/rejected') // Проверяем тип действия
		
	})
})
