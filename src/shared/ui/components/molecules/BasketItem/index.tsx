import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import { BasketItemData } from '../../../../../entities/modules/shop/types';
import { declOfNum } from '../../../../lib/utils/declOfNum';
import BasketIcon from '../../atoms/Icons/BasketIcon';
import css from './index.module.css';

type Props = ComponentProps<'li'> & {
	item: BasketItemData;
	removeItem: (item: BasketItemData) => void;
	handleCount: (type: '+' | '-', item: BasketItemData) => void;
};

const BasketItem = ({
	item,
	className,
	removeItem,
	handleCount,
	...props
}: Props) => {
	return (
		<li
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={css['info-wrapper']}>
				<img
					src={item?.image?.image_default}
					alt={item?.title}
					srcSet={`${item?.image?.image_default} 1x, ${item?.image?.image_retina} 2x`}
					width={146}
					height={174}
				/>
				<article className={css['info']}>
					<h3 className={css['product-title']}>{item?.title}</h3>
					{(item?.size || item?.color) && (
						<div className={css['params']}>
							{item?.size && (
								<p>
									Размер: <span>{item?.size}</span>
								</p>
							)}
							{item?.color && (
								<p>
									Цвет: <span>{item?.color}</span>
								</p>
							)}
						</div>
					)}
					<ReactMarkdown className={css['description']}>
						{item?.description}
					</ReactMarkdown>
				</article>
			</div>
			<article className={css['price-wrapper']}>
				<p className={css['price']}>{item?.price} баллов</p>
				<p className={css['price-info']}>за 1 единицу</p>
			</article>
			<div className={css['count-wrapper']}>
				<div className={css['count-controls']}>
					<button
						type="button"
						onClick={() => handleCount('-', item)}
					>
						-
					</button>
					<span
						className={css['count']}
						onClick={() => handleCount('-', item)}
					>
						{item?.quantity}
					</span>
					<button
						type="button"
						onClick={() => handleCount('+', item)}
					>
						+
					</button>
				</div>
				<p className={css['count-info']}>
					Вы можете заказать не более {item?.quantity_per_hand}{' '}
					{item?.quantity_per_hand?.toString()[
						item?.quantity_per_hand?.toString()?.length
					] === '1'
						? 'единицы'
						: 'единиц'}{' '}
					данного товара
				</p>
			</div>
			<div className={css['total-price-wrapper']}>
				<p className={css['total-price']}>
					{+item?.quantity * +item?.price}{' '}
					{declOfNum(+item?.quantity * +item?.price, [
						'балл',
						'балла',
						'баллов',
					])}
				</p>
				<button
					onClick={() => removeItem(item)}
					type="button"
					className={css['remove']}
				>
					<BasketIcon />
				</button>
			</div>
		</li>
	);
};

export default BasketItem;
