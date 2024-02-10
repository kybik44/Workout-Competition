import { ComponentProps, useEffect, useState } from 'react';
import {
	BasketItemData,
	ShopItemData,
} from '../../../../../entities/modules/shop/types';
import { SHOP_ACTIVE } from '../../../../lib/constants/global';
import useMedia from '../../../../lib/hooks/useMedia';
import ShoppingCartIcon from '../../atoms/Icons/ShoppingCartIcon';
import ProductModal from '../modals/ProductModal';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	product: ShopItemData;
	addToBasket: (item: BasketItemData) => void;
	selected?: number;
	score: number;
};

export type CurrentSize = {
	id: number;
	size: string;
};

const Product = ({
	product,
	className,
	addToBasket,
	selected,
	score,
	...props
}: Props) => {
	const [count, setCount] = useState<number>(1);
	const [size, setSize] = useState<CurrentSize>(null);
	const [open, setOpen] = useState<boolean>(false);

	useEffect(() => {
		selected > 0 ? setCount(selected) : setCount(1);
	}, [selected]);

	const isMobile = useMedia('(max-width: 768px)');

	useEffect(() => {
		product?.availability &&
			product?.availability?.length > 0 &&
			setSize({
				id: product?.availability[0]?.id,
				size: product?.availability[0]?.size,
			});
	}, [product]);

	const changeCount = (type: '+' | '-') => {
		if (
			type === '+' &&
			count < product?.quantity_per_hand &&
			product?.price * count <= score
		) {
			setCount(count + 1);
		} else if (type === '-' && count > 1) {
			setCount(count - 1);
		}
	};

	const handleCount = () =>
		product?.availability?.filter((el) => el.available).length > 0
			? false
			: true;

	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<img
				src={product?.images[0]?.image_default}
				alt={product?.title}
				srcSet={`${product?.images[0]?.image_default} 1x, ${product?.images[0]?.image_retina} 2x`}
				width={274}
				height={278}
				loading="lazy"
				className={css['product-photo']}
				onClick={() => setOpen(true)}
			/>
			<div className={css['about']}>
				{product?.title && (
					<h3 className={css['title']}>{product?.title}</h3>
				)}
				{product?.price && (
					<span className={css['price']}>
						{product?.price} баллов
					</span>
				)}
			</div>
			<div className={css['info']}>
				{SHOP_ACTIVE !== 'disabled' && (
					<div className={css['controls']}>
						<div className={css['count-controls']}>
							<span className={css['count']}>{count}</span>
							<div className={css['count-buttons']}>
								<button
									type="button"
									onClick={() => changeCount('+')}
									disabled={
										selected > 0 ||
										SHOP_ACTIVE === 'disabled'
									}
								>
									+
								</button>
								<button
									type="button"
									onClick={() => changeCount('-')}
									disabled={
										selected > 0 ||
										SHOP_ACTIVE === 'disabled'
									}
								>
									-
								</button>
							</div>
						</div>
						<button
							type="button"
							disabled={
								product?.price * count > score ||
								selected > 0 ||
								SHOP_ACTIVE === 'disabled' ||
								handleCount()
							}
							onClick={() =>
								SHOP_ACTIVE !== 'disabled' &&
								addToBasket({
									quantity: count,
									item_availability_id: size?.id,
									price: product?.price,
									quantity_per_hand:
										product?.quantity_per_hand,
									product_id: product?.id,
									image: product?.images[0],
									title: product?.title,
									description: product?.description,
									size: size?.size,
									color: product?.availability[0]?.color,
								})
							}
							className={css['to-basket']}
						>
							{!isMobile &&
								count !== selected &&
								!handleCount() &&
								'В корзину'}
							{!isMobile &&
								count === selected &&
								!handleCount() &&
								'Товар уже в корзине'}
							{!isMobile && handleCount() && 'Товар закончился'}
							{isMobile && <ShoppingCartIcon />}
						</button>
					</div>
				)}
				{product?.availability &&
					product?.availability?.length > 1 &&
					SHOP_ACTIVE !== 'disabled' &&
					!handleCount() && (
						<div className={css['sizes-wrapper']}>
							<p className={css['sizes-title']}>
								Выберите размер:
							</p>
							<ul className={css['sizes']}>
								{product?.availability
									?.filter((i) => i?.available)
									?.map((el) => (
										<li key={el?.id}>
											<button
												type="button"
												onClick={() =>
													setSize({
														id: el?.id,
														size: el?.size,
													})
												}
												className={`${css['size']} ${size?.id === el?.id
														? css['active-size']
														: ''
													}`}
												disabled={selected > 0}
											>
												{el?.size}
											</button>
										</li>
									))}
							</ul>
						</div>
					)}
			</div>
			<ProductModal
				addToBasket={addToBasket}
				isOpen={open}
				setOpen={setOpen}
				product={product}
				count={count}
				changeCount={changeCount}
				selected={selected}
				score={score}
				size={size}
				setSize={setSize}
			/>
		</div>
	);
};

export default Product;
