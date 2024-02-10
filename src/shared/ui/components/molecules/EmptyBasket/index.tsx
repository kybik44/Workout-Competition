import Link from 'next/link';
import React, { ComponentProps } from 'react';
import ArrowIcon from '../../atoms/Icons/ArrowIcon';
import css from './index.module.css';

type Props = ComponentProps<'div'>;

const EmptyBasket = ({ ...props }: Props) => {
	return (
		<div {...props}>
			<p className={css['message']}>
				В корзине пока нет ни одного товара.
			</p>
			<Link href="/shop">
				<a className={css['to-shop']}>
					<ArrowIcon />
					Назад в магазин
				</a>
			</Link>
		</div>
	);
};

export default EmptyBasket;
