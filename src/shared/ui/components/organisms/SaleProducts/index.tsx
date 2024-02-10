import { ComponentProps } from 'react';
import {
	BasketItemData,
	ShopItemData,
} from '../../../../../entities/modules/shop/types';
import Product from '../../molecules/Product';
import css from './index.module.css';

type Props = ComponentProps<'section'> & {
	products: ShopItemData[];
	addToBasket: (item: BasketItemData) => void;
	totalPrice: number;
	handleSelected: (id: number) => number;
	score: number;
};

const SaleProducts = ({
	products,
	addToBasket,
	className,
	score,
	totalPrice,
	handleSelected,
	...props
}: Props) => {
	return (
		<section
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={`content ${css['inner']}`}>
				<h3 className={css['title']}>
					Коллекция прошлого сезона (2021)
				</h3>
				<ul className={css['products']}>
					{products?.map((p, idx) => (
						<li key={`${p?.id}${idx}`}>
							<Product
								product={p}
								addToBasket={addToBasket}
								score={score - totalPrice}
								selected={handleSelected(p?.id)}
							/>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default SaleProducts;
