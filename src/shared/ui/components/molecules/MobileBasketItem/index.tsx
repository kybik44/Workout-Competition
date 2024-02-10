import React, { ComponentProps, useState } from 'react';
import { BasketItemData } from '../../../../../entities/modules/shop/types';
import css from './index.module.css';
import Collapse from 'react-css-collapse';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import ReactMarkdown from 'react-markdown';
import BasketIcon from '../../atoms/Icons/BasketIcon';

type Props = ComponentProps<'li'> & {
	item: BasketItemData;
	removeItem: (item: BasketItemData) => void;
	handleCount: (type: '+' | '-', item: BasketItemData) => void;
};

const MobileBasketItem = ({
	item,
	removeItem,
	handleCount,
	className,
	...props
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<li
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={css['head']}>
				<img
					src={item?.image?.image_default}
					alt={item?.title}
					loading="lazy"
					width={78}
					height={93}
					srcSet={`${item?.image?.image_retina} 1x, ${item?.image?.image_retina} 2x`}
				/>
				<div className={css['short-info']}>
					{item?.title && (
						<h3 className={css['title']}>{item?.title}</h3>
					)}
					{!open && (
						<>
							<p className={css['short-price']}>
								{item?.price} баллов x {item?.quantity}
							</p>
							<p>{+item?.price * +item?.quantity} баллов</p>
						</>
					)}
					{open && (
						<div className={css['params']}>
							<p className={css['size']}>
								Размер: <span>{item?.size}</span>
							</p>
							{item?.color && (
								<p className={css['color']}>
									Цвет: {item?.color}
								</p>
							)}
						</div>
					)}

					<button
						className={`${css['hide-btn']} ${open ? css['open-btn'] : ''
							}`}
						type="button"
						onClick={() => setOpen(!open)}
					>
						<ArrowIcon />
					</button>
				</div>
			</div>
			<Collapse isOpen={open}>
				<div className={css['info']}>
					<ReactMarkdown className={css['description']}>
						{item?.description}
					</ReactMarkdown>
					<ul className={css['fields']}>
						<li className={css['field']}>
							<span className={css['field-title']}>Цена</span>
							<div className={css['line']}></div>
							<div>
								<p className={css['field-value']}>
									{item?.price} баллов
								</p>
								<p className={css['field-caption']}>
									за 1 единицу
								</p>
							</div>
						</li>
						<li className={css['field']}>
							<span className={css['field-title']}>
								Количество
							</span>
							<div className={css['line']}></div>
							<div className={css['count-wrapper']}>
								<button
									type="button"
									onClick={() => handleCount('-', item)}
								>
									-
								</button>
								<span className={css['count']}>
									{item?.quantity}
								</span>
								<button
									type="button"
									onClick={() => handleCount('+', item)}
								>
									+
								</button>
							</div>
						</li>
						<li className={css['field']}>
							<span className={css['field-title']}>Сумма</span>
							<div className={css['line']}></div>
							<span className={css['field-value']}>
								{+item?.quantity * +item?.price} баллов
							</span>
						</li>
					</ul>
					<button
						type="button"
						className={css['remove']}
						onClick={() => removeItem(item)}
					>
						Удалить позицию <BasketIcon />
					</button>
				</div>
			</Collapse>
		</li>
	);
};

export default MobileBasketItem;
