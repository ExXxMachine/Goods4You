import { Hero, Catalog, FAQ } from '../../widgets/authWidgets'
import classesHome from './Home.module.css'
import { Helmet } from 'react-helmet'

function Home() {
	return (
		<main className={classesHome.HomePage__container}>
			<Helmet>
				<title>Catalog | Goods4you</title>
				<meta
					name='description'
					content='Discover our product catalog on Goods4you. We have everything you need, from electronics to clothes.'
				/>
			</Helmet>
			<Hero />
			<Catalog />
			<FAQ />
		</main>
	)
}

export { Home }
