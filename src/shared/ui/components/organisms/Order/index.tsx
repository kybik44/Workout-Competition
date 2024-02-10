import { ComponentProps } from 'react';
import ReactMarkdown from 'react-markdown';
import { OrderInfoData } from '../../../../../entities/modules/shop/types';
import { CharityInfo } from '../../../../../entities/types';
import useMedia from '../../../../lib/hooks/useMedia';
import { getMonthName } from '../../../../lib/utils/getMonthName';
import CalendarIcon from '../../atoms/Icons/CalendarIcon';
import HeadphonesIcon from '../../atoms/Icons/HeadphonesIcon';
import MapPinIcon from '../../atoms/Icons/MapPinIcon';
import CharityOrder from '../../molecules/CharityOrder';
import MobileCharityOrder from '../../molecules/MobileCharityOrder';
import MobileOrderInfo from '../../molecules/MobileOrderInfo';
import OrderInfo from '../../molecules/OrderInfo';
import css from './index.module.css';

type Props = ComponentProps<'section'> & {
	order: OrderInfoData;
	charity: CharityInfo;
	message: string;
};

const Order = ({ order, className, charity, message, ...props }: Props) => {
	const isMobile = useMedia('(max-width: 820px)');

	return (
		<section
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>Мои заказы</h2>
				<div className={css['point-wrapper']}>
					<article className={css['point-field']}>
						<div className={css['field-title']}>
							<MapPinIcon />
							<span>Пункт выдачи</span>
						</div>
						<p className={css['field-value']}>
							{order?.pickup_point?.address}
						</p>
					</article>
					<article className={css['point-field']}>
						<div className={css['field-title']}>
							<HeadphonesIcon />
							<span>Куратор пункта выдачи</span>
						</div>
						<p className={css['field-value']}>
							{order?.pickup_point?.manager},{' '}
							{order?.pickup_point?.contacts}
						</p>
					</article>
					<article className={css['point-field']}>
						<div className={css['field-title']}>
							<CalendarIcon />
							<span>Дата оформления заказа</span>
						</div>
						<p className={css['field-value']}>
							{new Date(order?.created_at).getDate()}{' '}
							{getMonthName(order?.created_at)}
						</p>
					</article>
				</div>
				<div className={css['orders-wrapper']}>
					{!isMobile && (
						<div className={css['order-head']}>
							<span>Позиция</span>
							<span>Цена</span>
							<span>Количество</span>
							<span>Сумма</span>
						</div>
					)}
					<ul className={css['items']}>
						{order?.items?.map((p, idx) =>
							!isMobile ? (
								<OrderInfo
									key={`${p?.item?.title}${idx}`}
									product={p}
									className={css['item']}
								/>
							) : (
								<MobileOrderInfo
									key={`${p?.item?.title}${idx}`}
									product={p}
									className={css['mobile-item']}
								/>
							)
						)}
						{!isMobile && (
							<CharityOrder
								content={charity}
								points={order?.charity_points}
								className={css['charity']}
							/>
						)}
						{isMobile && (
							<MobileCharityOrder
								content={charity}
								points={order?.charity_points}
								className={css['mobile-charity']}
							/>
						)}
					</ul>
				</div>
				<article className={css['message-wrapper']}>
					<ReactMarkdown className={css['message']}>
						{message}
					</ReactMarkdown>
				</article>
			</div>
		</section>
	);
};

export default Order;
