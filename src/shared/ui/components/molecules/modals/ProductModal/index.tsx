import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import {
	BasketItemData,
	ShopItemData,
} from '../../../../../../entities/modules/shop/types';
import { SHOP_ACTIVE } from '../../../../../lib/constants/global';
import ArrowIcon from '../../../atoms/Icons/ArrowIcon';
import SmallCrossIcon from '../../../atoms/Icons/SmallCrossIcon';
import { CurrentSize } from '../../Product';
import css from './index.module.css';

type Props = {
	product: ShopItemData;
	isOpen: boolean;
	setOpen: (state: boolean) => void;
	addToBasket: (item: BasketItemData) => void;
	count: number;
	changeCount: (type: '+' | '-') => void;
	selected?: number;
	score: number;
	size: CurrentSize;
	setSize: (state: CurrentSize) => void;
};

const ProductModal = ({
	product,
	isOpen,
	setOpen,
	count,
	addToBasket,
	changeCount,
	selected,
	size,
	setSize,
	score,
}: Props) => {
	const [currentImage, setCurrentImage] = useState<number>(0);

	const handleImage = (type: 'next' | 'prev') => {
		if (type === 'next' && currentImage < product?.images?.length - 1) {
			setCurrentImage(currentImage + 1);
		} else if (type === 'prev' && currentImage > 0) {
			setCurrentImage(currentImage - 1);
		} else {
			setCurrentImage(0);
		}
	};

	const handleCount = () =>
		product?.availability?.filter((el) => el.available).length > 0
			? false
			: true;

	return (
		<Modal
			center
			open={isOpen}
			onClose={() => setOpen(false)}
			showCloseIcon={false}
			classNames={{
				modal: css['modal'],
			}}
		>
			<button
				className={css['close']}
				type="button"
				onClick={() => setOpen(false)}
			>
				<SmallCrossIcon />
			</button>
			<div className={css['wrapper']}>
				<ul className={css['images']}>
					{product?.images?.map((i, idx) => (
						<li
							className={`${css['image']} ${currentImage === idx ? css['active-image'] : ''
								}`}
							key={`${i?.image_default}${idx}`}
							onClick={() => setCurrentImage(idx)}
						>
							<img
								src={i?.image_default}
								alt={product?.title}
								width={124}
								height={148}
								loading="lazy"
								srcSet={`${i?.image_default} 1x, ${i?.image_retina} 2x`}
							/>
						</li>
					))}
				</ul>
				<div className={css['current-image']}>
					<button
						type="button"
						onClick={() => handleImage('prev')}
						disabled={currentImage <= 0}
					>
						<ArrowIcon />
					</button>
					<div className={css['image-wrapper']}>
						<img
							src={product?.images[currentImage]?.image_default}
							alt={product?.title}
							loading="lazy"
							srcSet={`${product?.images[currentImage]?.image_default} 1x, ${product?.images[currentImage]?.image_retina} 2x`}
							width={420}
							height={470}
						/>
						<ul className={css['dots']}>
							{product?.images?.map((el, idx) => (
								<li
									className={`${css['dot']} ${idx === currentImage
											? css['active']
											: ''
										}`}
									key={`${el?.image_default}${idx}`}
								></li>
							))}
						</ul>
					</div>
					<button
						type="button"
						onClick={() => handleImage('next')}
						disabled={currentImage === product?.images?.length - 1}
					>
						<ArrowIcon
							style={{
								transform: 'rotate(180deg)',
							}}
						/>
					</button>
				</div>
				<div className={css['info']}>
					<h2 className={css['title']}>{product?.title}</h2>
					<h3 className={css['price']}>{product?.price} баллов</h3>
					<ReactMarkdown className={css['description']}>
						{product?.description}
					</ReactMarkdown>
					{product?.availability &&
						product?.availability?.filter((i) => i?.available)
							?.length > 1 && (
							<div className={css['sizes-wrapper']}>
								<p className={css['current-size']}>
									Размер: <span>{size?.size}</span>
								</p>
								<ul className={css['sizes']}>
									{product?.availability
										?.filter((i) => i?.available)
										?.map((s, idx) => (
											<li key={`${s?.id}${idx}`}>
												<button
													type="button"
													onClick={() =>
														setSize({
															id: s?.id,
															size: s?.size,
														})
													}
													className={`${css['size']
														} ${size?.id === s?.id
															? css['active-size']
															: ''
														}`}
													disabled={selected > 0}
												>
													{s?.size}
												</button>
											</li>
										))}
								</ul>
							</div>
						)}
					{SHOP_ACTIVE !== 'disabled' && (
						<div className={css['count-wrapper']}>
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
								{count !== selected &&
									!handleCount() &&
									'В корзину'}
								{count === selected &&
									!handleCount() &&
									'Товар уже в корзине'}
								{handleCount() && 'Товар закончился'}
							</button>
						</div>
					)}
				</div>
			</div>
		</Modal>
	);
};

export default ProductModal;
