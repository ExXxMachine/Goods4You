
import { Meta, StoryFn } from '@storybook/react'
import { CartItem } from './CartItem' 
import StoreRouterDecorator from '../../app/StoreDecorator' 

export default {
	title: 'Компоненты/CartItem',
	component: CartItem,
	decorators: [StoreRouterDecorator], 
	parameters: {
		docs: {
			description: {
				component: `
                # Компонент CartItem

                ## Описание

                Компонент \`CartItem\` используется для отображения информации о товаре в корзине. Он показывает изображение товара, название, цену и количество. Также предоставляет возможность увеличивать или уменьшать количество товара, а также удалять его из корзины.

                ## Пропсы

                Компонент принимает следующие пропсы:

                | Пропс               | Тип          | Описание                                                                                     |
                |---------------------|--------------|----------------------------------------------------------------------------------------------|
                | \`id\`              | \`number\`   | Уникальный идентификатор товара.                                                             |
                | \`title\`           | \`string\`   | Название товара.                                                                             |
                | \`price\`           | \`number\`   | Цена товара.                                                                                 |
                | \`quantity\`        | \`number\`   | Текущее количество товара в корзине.                                                         |
                | \`total\`           | \`number\`   | Общая стоимость товара (количество * цена).                                                 |
                | \`discountedTotal\` | \`number\`   | Скидочная цена товара.                                                                       |
                | \`thumbnail\`       | \`string\`   | URL-адрес миниатюры изображения товара.                                                      |
                | \`discountPercentage\`| \`number?\`  | Процент скидки на товар (опционально).                                                      |
                | \`deleted\`         | \`boolean?\`  | Флаг, указывающий, удален ли товар из корзины (опционально).                                |

                ## Примеры использования

                ### Пример 1: Стандартное использование

                \`\`\`javascript
                <CartItem 
                    id={1}
                    title="Продукт 1"
                    price={29.99}
                    quantity={2}
                    total={59.98}
                    discountedTotal={49.99}
                    thumbnail="https://via.placeholder.com/150"
                    discountPercentage={10}
                    deleted={false}
                />
                \`\`\`

                ## Функциональность

                - **Управление количеством**: Позволяет пользователю увеличивать или уменьшать количество товара.
                - **Удаление товара**: Позволяет пользователю удалить товар из корзины.
                - **Отображение информации**: Показывает изображение, название и цену товара.

                ## Заключение

                Компонент \`CartItem\` является важным элементом для отображения товаров в корзине интернет-магазина и может быть легко интегрирован в существующие проекты.
                `,
			},
		},
	},
} as Meta


const Template: StoryFn<{
	id: number
	title: string
	price: number
	quantity: number
	total: number
	discountedTotal: number
	thumbnail: string
	discountPercentage?: number
	deleted?: boolean
}> = args => <CartItem {...args} />

export const Default = Template.bind({})
Default.args = {
	id: 1,
	title: 'Продукт 1',
	price: 29.99,
	quantity: 2,
	total: 59.98,
	discountedTotal: 49.99,
	thumbnail: 'https://via.placeholder.com/150',
	discountPercentage: 10,
	deleted: false,
}

