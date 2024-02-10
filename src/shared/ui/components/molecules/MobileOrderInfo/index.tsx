import { ComponentProps, useState } from 'react';
import Collapse from 'react-css-collapse';
import {
	OrderItem
} from '../../../../../entities/modules/shop/types';
import { declOfNum } from '../../../../lib/utils/declOfNum';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import css from './index.module.css';

type Props = ComponentProps<'li'> & {
	product: OrderItem;
};

const MobileOrderInfo = ({ product, className, ...props }: Props) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<li
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={css['head']}>
				<img
					src={product?.item?.images[0]?.image_default}
					alt={product?.item?.title}
					loading="lazy"
					width={78}
					height={93}
					srcSet={`${product?.item?.images[0]?.image_default} 1x, ${product?.item?.images[0]?.image_retina} 2x`}
				/>
				<div className={css['short-info']}>
					{product?.item?.title && (
						<h3 className={css['title']}>{product?.item?.title}</h3>
					)}
					{!open && (
						<>
							<p className={css['short-price']}>
								{product?.item?.price}{' '}
								{declOfNum(product?.item?.price, [
									'балл',
									'балла',
									'баллов',
								])}{' '}
								x {product?.quantity}
							</p>
							<p>
								{+product?.total_price}{' '}
								{declOfNum(product?.total_price, [
									'балл',
									'балла',
									'баллов',
								])}
							</p>
						</>
					)}
					{open && (
						<div className={css['params']}>
							<p className={css['size']}>
								Размер: <span>{product?.size}</span>
							</p>
							{product?.color && (
								<p className={css['color']}>
									Цвет: {product?.color}
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
					<ul className={css['fields']}>
						<li className={css['field']}>
							<span className={css['field-title']}>Цена</span>
							<div className={css['line']}></div>
							<div>
								<p className={css['field-value']}>
									{product?.item?.price}{' '}
									{declOfNum(product?.item?.price, [
										'балл',
										'балла',
										'баллов',
									])}
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
							<span className={css['count']}>
								{product?.quantity}{' '}
								{declOfNum(product?.quantity, [
									'единица',
									'единицы',
									'единиц',
								])}
							</span>
						</li>
						<li className={css['field']}>
							<span className={css['field-title']}>Сумма</span>
							<div className={css['line']}></div>
							<span className={css['field-value']}>
								{+product?.total_price}{' '}
								{declOfNum(product?.total_price, [
									'балл',
									'балла',
									'баллов',
								])}
							</span>
						</li>
					</ul>
				</div>
			</Collapse>
		</li>
	);
};

export default MobileOrderInfo;
