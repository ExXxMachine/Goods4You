import { Meta, StoryFn } from '@storybook/react'
import { ScrollItem } from './ScrollItem'

export default {
	title: 'Компоненты/ScrollItem',
	component: ScrollItem,
	parameters: {
		docs: {
			description: {
				component: `
                # Компонент ScrollItem

                ## Описание

                Компонент \`ScrollItem\` предназначен для отображения основного изображения с прокручиваемым набором миниатюр. Он позволяет пользователям выбирать различные изображения, которые будут показаны в большом формате. Компонент поддерживает эффект затухания при смене изображений, что делает интерфейс более плавным и приятным для пользователя.

                ## Установка

                Убедитесь, что компонент \`ScrollItem\` правильно импортирован в ваш проект:

                \`\`\`javascript
                import { ScrollItem } from './ScrollItem';
                \`\`\`

                ## Пропсы

                Компонент принимает следующие пропсы:

                | Пропс       | Тип          | Описание                                                                                     |
                |-------------|--------------|----------------------------------------------------------------------------------------------|
                | \`img\`      | \`string[]\`   | Массив строк, содержащий URL-адреса изображений для прокрутки. Если массив пустой, будет отображена только миниатюра. |
                | \`thumbnail\` | \`string\`     | URL-адрес миниатюры, которая будет отображаться в компоненте, когда нет изображений для прокрутки. |

                ## Примеры использования

                ### Пример 1: Стандартное использование

                \`\`\`javascript
                <ScrollItem 
                    img={[
                        'https://via.placeholder.com/300/0000FF/FFFFFF?text=Image+1',
                        'https://via.placeholder.com/300/FF0000/FFFFFF?text=Image+2',
                        'https://via.placeholder.com/300/00FF00/FFFFFF?text=Image+3',
                    ]}
                    thumbnail='https://via.placeholder.com/300/000000/FFFFFF?text=Thumbnail'
                />
                \`\`\`

                ### Пример 2: Использование с одной миниатюрой

                \`\`\`javascript
                <ScrollItem 
                    img={[]} 
                    thumbnail='https://via.placeholder.com/300/000000/FFFFFF?text=Thumbnail' 
                />
                \`\`\`

                ## Функциональность

                - **Выбор изображения**: Пользователь может кликнуть на миниатюры для выбора изображения, которое будет отображаться в основном окне.
                - **Эффект затухания**: При смене выбранного изображения применяется эффект затухания, который улучшает визуальное восприятие.
                - **Адаптивный дизайн**: Компонент адаптируется под различные размеры экранов и обеспечивает хорошую пользовательскую опытность на мобильных устройствах.

                ## Заключение

                Компонент \`ScrollItem\` является полезным инструментом для реализации галерей изображений в ваших приложениях. Он предоставляет удобный интерфейс для просмотра изображений и может быть легко интегрирован в существующие проекты.
                `,
			},
		},
	},
} as Meta

const Template: StoryFn<{ img: string[]; thumbnail: string }> = args => (
	<ScrollItem {...args} />
)

export const Default = Template.bind({})
Default.args = {
	img: [
		'https://via.placeholder.com/300/0000FF/FFFFFF?text=Image+1',
		'https://via.placeholder.com/300/FF0000/FFFFFF?text=Image+2',
		'https://via.placeholder.com/300/00FF00/FFFFFF?text=Image+3',
	],
	thumbnail: 'https://via.placeholder.com/300/000000/FFFFFF?text=Thumbnail',
}

export const MultipleImages = Template.bind({})
MultipleImages.args = {
	img: [
		'https://via.placeholder.com/300/111111/FFFFFF?text=Image+1',
		'https://via.placeholder.com/300/222222/FFFFFF?text=Image+2',
		'https://via.placeholder.com/300/333333/FFFFFF?text=Image+3',
		'https://via.placeholder.com/300/444444/FFFFFF?text=Image+4',
	],
	thumbnail: 'https://via.placeholder.com/300/000000/FFFFFF?text=Thumbnail',
}

export const FadingEffect = Template.bind({})
FadingEffect.args = {
	img: [
		'https://via.placeholder.com/300/C0C0C0/FFFFFF?text=Fade+Image+1',
		'https://via.placeholder.com/300/D3D3D3/FFFFFF?text=Fade+Image+2',
	],
	thumbnail: 'https://via.placeholder.com/300/A9A9A9/FFFFFF?text=Thumbnail',
}
