// src/widgets/ProductList/ProductList.test.tsx

import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProductList } from './ProductList' // Настройте путь по необходимости
import { Provider } from 'react-redux'
import { store } from '../../app/store/store' // Убедитесь, что этот путь корректен
import '@testing-library/jest-dom/vitest' // Импортируем jest-dom для дополнительных матчеров
import { describe, it, expect } from 'vitest' // Импортируем необходимые функции

describe('Компонент ProductList', () => {
	it('должен отображать "Loading..." при загрузке', () => {
		render(
			<Provider store={store}>
				<ProductList error={null} isLoading={true} />
			</Provider>
		)

		expect(screen.getByText(/loading/i)).toBeInTheDocument()
	})

	it('должен отображать сообщение об ошибке', () => {
		render(
			<Provider store={store}>
				<ProductList error='Error loading products' isLoading={false} />
			</Provider>
		)

		expect(screen.getByText(/error loading products/i)).toBeInTheDocument()
	})
	
})
