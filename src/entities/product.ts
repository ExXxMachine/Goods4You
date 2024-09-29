export interface ProductDescription {
	id: number
	title: string
	price: number
	discountPercentage: number
	stock: number
	thumbnail: string
	description: string
	warrantyInformation: string
	shippingInformation: string
	tags: string[]
	rating: number
	images: string[]
}

export interface DescriptionState {
	descriptions: ProductDescription | null
	status: 'idle' | 'loading' | 'succeeded' | 'failed'
}
