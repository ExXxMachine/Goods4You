import { Meta, StoryFn } from '@storybook/react'
import { AddBtn } from './AddBtn'

export default {
	title: 'Компоненты/AddBtn',
	component: AddBtn,
	parameters: {
		docs: {
			description: {
				component: `
                # Компонент AddBtn

                ## Описание

                Компонент \`AddBtn\` предназначен для управления количеством товара в корзине. Он включает кнопки для увеличения и уменьшения количества товара, а также отображает текущее количество.

                ## Пропсы

                Компонент принимает следующие пропсы:

                | Пропс       | Тип          | Описание                                                                                     |
                |-------------|--------------|----------------------------------------------------------------------------------------------|
                | \`quantity\`      | \`number\`   | Текущее количество товара.                                                                   |
                | \`onIncrement\` | \`() => void\`     | Функция, вызываемая при нажатии на кнопку увеличения количества.                             |
                | \`onDecrement\` | \`() => void\`     | Функция, вызываемая при нажатии на кнопку уменьшения количества.                             |

                ## Примеры использования

                ### Пример 1: Стандартное использование

                \`\`\`javascript
                const handleIncrement = () => {
                    // Логика увеличения количества
                };

                const handleDecrement = () => {
                    // Логика уменьшения количества
                };

                <AddBtn 
                    quantity={1} 
                    onIncrement={handleIncrement} 
                    onDecrement={handleDecrement} 
                />
                \`\`\`

                ## Функциональность

                - **Увеличение и уменьшение**: Позволяет пользователю изменять количество товара.
                - **Динамическое отображение**: Отображает текущее количество товара.

                ## Заключение

                Компонент \`AddBtn\` является полезным инструментом для управления количеством товаров в корзине и может быть легко интегрирован в существующие проекты.
                `,
			},
		},
	},
} as Meta


const Template: StoryFn<{
	quantity: number
	onIncrement: () => void
	onDecrement: () => void
}> = args => <AddBtn {...args} />

export const Default = Template.bind({})
Default.args = {
	quantity: 1,
	onIncrement: () => console.log('Incremented'),
	onDecrement: () => console.log('Decremented'),
}

export const FiveItems = Template.bind({})
FiveItems.args = {
	quantity: 5,
	onIncrement: () => console.log('Incremented'),
	onDecrement: () => console.log('Decremented'),
}

export const ZeroItems = Template.bind({})
ZeroItems.args = {
	quantity: 0,
	onIncrement: () => console.log('Incremented'),
	onDecrement: () => console.log('Decremented'),
}
