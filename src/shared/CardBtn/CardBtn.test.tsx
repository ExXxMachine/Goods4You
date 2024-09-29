// src/shared/CardBtn/CardBtn.test.tsx

import React from 'react' // Импортируем React
import { render, screen, fireEvent } from '@testing-library/react'
import { CardBtn } from './CardBtn' // Настройте путь по необходимости
import '@testing-library/jest-dom/vitest' // Импортируем jest-dom для дополнительных матчеров
import { describe, it, expect, vi } from 'vitest' // Импортируем необходимые функции

describe('Компонент CardBtn', () => {
	const mockOnClick = vi.fn() // Используем vi.fn() для создания мока

	it('должен вызывать onClick при нажатии на кнопку', () => {
		render(<CardBtn onClick={mockOnClick} label='Нажми меня' />) // Передаем нужный текст

		fireEvent.click(screen.getByRole('button'))
		expect(mockOnClick).toHaveBeenCalledTimes(1)
	})

	it('должен отображать правильный текст', () => {
		render(<CardBtn onClick={mockOnClick} label='Нажми меня' />)

		const buttons = screen.getAllByRole('button')
		expect(buttons[0]).toHaveTextContent('Нажми меня') 
	})
})
