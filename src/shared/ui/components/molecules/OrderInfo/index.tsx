import { ComponentProps } from 'react';
import { OrderItem } from '../../../../../entities/modules/shop/types';
import { declOfNum } from '../../../../lib/utils/declOfNum';
import css from './index.module.css';

type Props = ComponentProps<'li'> & {
	product: OrderItem;
};

const OrderInfo = ({ product, className, ...props }: Props) => {
	return (
		<li
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={css['info-wrapper']}>
				<img
					src={product?.item?.images[0]?.image_default}
					alt={product?.item?.title}
					srcSet={`${product?.item?.images[0]?.image_default} 1x, ${product?.item?.images[0]?.image_retina} 2x`}
					width={146}
					height={174}
				/>
				<article className={css['info']}>
					<h3 className={css['product-title']}>
						{product?.item?.title}
					</h3>
					{(product?.color || product?.size) && (
						<div className={css['params']}>
							{product?.size && (
								<p>
									Размер: <span>{product?.size}</span>
								</p>
							)}

							{product?.color && (
								<p>
									Цвет: <span>{product?.color}</span>
								</p>
							)}
						</div>
					)}
				</article>
			</div>
			<article className={css['price-wrapper']}>
				<p className={css['price']}>
					{product?.item?.price}{' '}
					{declOfNum(product?.item?.price, [
						'балл',
						'балла',
						'баллов',
					])}
				</p>
				<p className={css['price-info']}>за 1 единицу</p>
			</article>
			<span className={css['count']}>
				{product?.quantity}{' '}
				{declOfNum(product?.quantity, ['единица', 'единицы', 'единиц'])}
			</span>
			<span className={css['total-price']}>
				{product?.total_price}{' '}
				{declOfNum(product?.total_price, ['балл', 'балла', 'баллов'])}
			</span>
		</li>
	);
};

export default OrderInfo;
