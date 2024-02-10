import css from './index.module.css';

const ShopStub = () => {
	return (
		<section className={css['wrapper']}>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>Магазин скоро откроется! </h2>
				<p className={css['text']}>
					А пока, зарабатывай больше баллов, чтобы потом обменять их
					на обновленную коллекцию фирменного мерча третьего сезона{' '}
					<span className={css['marathon']}>Марафона Чемпиона.</span>
				</p>
			</div>
		</section>
	);
};

export default ShopStub;
