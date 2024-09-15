import classes from './Catalog.module.css'
import { ProductList } from '../authWidgets'
import { FuncBtn } from '../../shared/authShared'

function Catalog() {
	return (
		<div className={classes.catalogContainer}>
			<h2 className={classes.catalogTitle}>
				<a id='catalog' className={classes.catalogAnchor}>
					Catalog
				</a>
			</h2>
			<input
				type='text'
				placeholder='Search by title'
				className={classes.catalogSearchInput}
				aria-label='Search products by title'
			/>
			<ProductList />
			<div className={classes.catalogBtnBlock}>
				<FuncBtn title='Show more' />
			</div>
		</div>
	)
}

export { Catalog }
