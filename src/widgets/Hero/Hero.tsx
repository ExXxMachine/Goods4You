import classesHero from './Hero.module.css'

function Hero() {
	return (
		<section className={classesHero.heroContainer}>
			<div className={classesHero.heroBackText}>Goods4you</div>
			<div className={classesHero.heroContent}>
				<h1 className={classesHero.heroHeading}>
					Any products from famous brands with worldwide delivery
				</h1>
				<p className={classesHero.heroParagraph}>
					We sell smartphones, laptops, clothes, shoes and many other products
					at low prices
				</p>
				<a
					href='#catalog'
					className={classesHero.heroRedirect}
					aria-label='Go to shopping section'
				>
					Go to shopping
				</a>
			</div>
		</section>
	)
}

export { Hero }
