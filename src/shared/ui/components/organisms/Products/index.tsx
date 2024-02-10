import Link from 'next/link';
import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import {
	BasketItemData,
	ShopItemData,
} from '../../../../../entities/modules/shop/types';
import { ShopPageContent } from '../../../../../entities/types';
import { SHOP_ACTIVE } from '../../../../lib/constants/global';
import useMedia from '../../../../lib/hooks/useMedia';
import ShoppingCartIcon from '../../atoms/Icons/ShoppingCartIcon';
import WarningIcon from '../../atoms/Icons/WarningIcon';
import Product from '../../molecules/Product';
import css from './index.module.css';

type Props = ComponentProps<'section'> & {
	score: number;
	products: ShopItemData[];
	addToBasket: (item: BasketItemData) => void;
	totalPrice: number;
	totalCount: number;
	basketItems: BasketItemData[];
	content: ShopPageContent;
	handleSelected: (id: number) => number;
};

const Products = ({
	score,
	products,
	addToBasket,
	className,
	totalPrice,
	totalCount,
	basketItems,
	content,
	handleSelected,
	...props
}: Props) => {
	const isMobile = useMedia('(max-width: 820px)');

	return (
		<section
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className="content">
				<h2 className={css['title']}>Магазин</h2>
			</div>
			<div className={css['message-wrapper']}>
				<div className={`content ${css['message']}`}>
					<h3 className={css['message-title']}>
						{content?.shopPage?.message_title}
					</h3>
					<article className={css['info']}>
						<WarningIcon />
						<p>{content?.shopPage?.info}</p>
					</article>
					<ReactMarkdown className={css['description']}>
						{content?.shopPage?.description}
					</ReactMarkdown>
				</div>
			</div>
			<div className={`content ${css['inner']}`}>
				{SHOP_ACTIVE !== 'disabled' && (
					<div className={css['head']}>
						<div className={css['score-info']}>
							<p>
								Остаток: <span>{score - totalPrice}</span>{' '}
								баллов.
							</p>
							<p>Всего: {score} баллов.</p>
						</div>
						<div className={css['basket-wrapper']}>
							<Link href="/basket">
								<a className={css['basket-link']}>
									<ShoppingCartIcon />{' '}
									{!isMobile && 'Корзина'}
								</a>
							</Link>
							{totalCount > 0 && (
								<span className={css['basket-count']}>
									{totalCount}
								</span>
							)}
						</div>
					</div>
				)}
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

export default Products;
