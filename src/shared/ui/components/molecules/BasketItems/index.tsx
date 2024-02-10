import Link from 'next/link';
import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import { BasketItemData } from '../../../../../entities/modules/shop/types';
import useMedia from '../../../../lib/hooks/useMedia';
import { declOfNum } from '../../../../lib/utils/declOfNum';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import BasketItem from '../BasketItem';
import MobileBasketItem from '../MobileBasketItem';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	basketItems: BasketItemData[];
	addToBasket: (item: BasketItemData) => void;
	removeFromBasket: (item: BasketItemData) => void;
	totalCount: number;
	totalPrice: number;
	handleCount: (type: '+' | '-', item: BasketItemData) => void;
	onNext: () => void;
	info?: string;
};

const BasketItems = ({
	basketItems,
	addToBasket,
	className,
	removeFromBasket,
	totalCount,
	totalPrice,
	handleCount,
	onNext,
	info,
	...props
}: Props) => {
	const isMobile = useMedia('(max-width: 820px)');
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			{!isMobile && (
				<div className={css['head']}>
					<span>Товар</span>
					<span>Цена</span>
					<span>Количество</span>
					<span>Сумма</span>
				</div>
			)}
			<ul className={css['items']}>
				{basketItems?.map((el, idx) =>
					!isMobile ? (
						<BasketItem
							item={el}
							key={`${el?.item_availability_id}${idx}`}
							removeItem={removeFromBasket}
							className={css['item']}
							handleCount={handleCount}
						/>
					) : (
						<MobileBasketItem
							item={el}
							key={`${el?.item_availability_id}${idx}`}
							removeItem={removeFromBasket}
							className={css['item']}
							handleCount={handleCount}
						/>
					)
				)}
			</ul>
			{!isMobile && (
				<div className={css['total-wrapper']}>
					<Link href="/shop">
						<a className={css['to-shop']}>
							<ArrowIcon />
							Назад в магазин
						</a>
					</Link>
					<span className={css['total']}>Итого:</span>
					<span className={css['total-count']}>
						{totalCount}{' '}
						{declOfNum(totalCount, ['товар', 'товара', 'товаров'])}
					</span>
					<span className={css['total-price']}>
						{totalPrice}{' '}
						{declOfNum(totalPrice, ['балл', 'балла', 'баллов'])}
					</span>
					{info && (
						<ReactMarkdown className={css['info']}>
							{info}
						</ReactMarkdown>
					)}
					<div className={css['line']}></div>
					<button
						onClick={() => onNext()}
						type="button"
						className={css['next']}
					>
						Далее
					</button>
				</div>
			)}
			{isMobile && (
				<div className={css['mobile-total']}>
					<div className={css['values']}>
						<span className={css['total-title']}>Итого:</span>
						<span className={css['value']}>
							{totalCount}{' '}
							{declOfNum(totalCount, [
								'товар',
								'товара',
								'товаров',
							])}
						</span>
						<span className={css['value']}>
							{totalPrice}{' '}
							{declOfNum(totalPrice, ['балл', 'балла', 'баллов'])}
						</span>
					</div>
					<Link href="/shop">
						<a className={css['to-shop']}>
							<ArrowIcon />
							Назад в магазин
						</a>
					</Link>
					{info && (
						<ReactMarkdown className={css['info']}>
							{info}
						</ReactMarkdown>
					)}
					<button
						onClick={() => onNext()}
						type="button"
						className={css['next']}
					>
						Далее
					</button>
				</div>
			)}
		</div>
	);
};

export default BasketItems;
