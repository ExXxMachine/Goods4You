import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/store' 

const StoreRouterDecorator = (Story: any) => (
	<Provider store={store}>
		<BrowserRouter>
			<Story />
		</BrowserRouter>
	</Provider>
)

export default StoreRouterDecorator
