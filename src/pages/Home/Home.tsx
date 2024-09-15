import { Hero, Catalog, FAQ } from '../../widgets/authWidgets'
import classesHome from './Home.module.css'
import { Helmet } from 'react-helmet'
function Home() {
	return (
		<div className={classesHome.HomePage__container}>
			<Helmet>
				<title>Catalog | Goods4you</title>
			</Helmet>
			<Hero />
			<Catalog />
			<FAQ />
		</div>
	)
}

export { Home }
