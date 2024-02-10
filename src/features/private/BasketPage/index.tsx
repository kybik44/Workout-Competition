import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../entities/modules/auth';
import { sendOrder } from '../../../entities/modules/shop/api';
import useShop from '../../../entities/modules/shop/hooks/useShop';
import {
	BasketItemData,
	PickupPointData,
} from '../../../entities/modules/shop/types';
import { BasketPageContent } from '../../../entities/types';
import { donateCharity } from '../../../shared/api/charity';
import { SHOP_ACTIVE, TOKEN_KEY } from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import BasketHead from '../../../shared/ui/components/molecules/BasketHead';
import BasketItems from '../../../shared/ui/components/molecules/BasketItems';
import EmptyBasket from '../../../shared/ui/components/molecules/EmptyBasket';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import PickupPoint from '../../../shared/ui/components/molecules/PickupPoint';
import CharityModal from '../../../shared/ui/components/molecules/modals/CharityModal';
import OrderStatusModal from '../../../shared/ui/components/molecules/modals/OrderStatusModal';
import css from './index.module.css';

type Props = {
	content: BasketPageContent;
	points: PickupPointData[];
};

const BaksetPage = ({ content, points }: Props) => {
	const router = useRouter();
	const { pathname } = router;
	const [step, setStep] = useState<'basket' | 'point'>('basket');
	const [charitySubmitting, setCharitySubmitting] = useState<boolean>(false);
	const [charityError, setCharityError] = useState<string | null>(null);
	const [charityType, setCharityType] = useState<'manual' | 'auto'>('manual');
	const [charityOpen, setCharityOpen] = useState<boolean>(false);
	const [charitySuccess, setCharitySuccess] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string>(null);
	const [orderSubmitting, setOrderSubmitting] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [statusModalOpen, setStatusModalOpen] = useState<boolean>(false);

	const { auth, setAuth } = useContext(AuthContext);

	const manualCharity = () => {
		setCharityOpen(true);
		setCharityType('manual');
	};

	const {
		basketItems,
		addToBasket,
		totalPrice,
		totalCount,
		removeFromBasket,
		setPickupPoint,
		pickupPoint,
		clearBasket,
	} = useShop({
		userScore: auth?.shop_score,
		token: storage.get(TOKEN_KEY),
	});

	const handleCount = (type: '+' | '-', item: BasketItemData) => {
		if (
			type === '+' &&
			auth?.shop_score - totalPrice >= item?.price &&
			+item?.quantity < +item?.quantity_per_hand
		) {
			addToBasket({
				...item,
				quantity: +item?.quantity + 1,
			});
		} else if (type === '-' && +item?.quantity > 1) {
			addToBasket({
				...item,
				quantity: +item?.quantity - 1,
			});
		}
	};

	const sendCharity = async () => {
		try {
			setCharityError(null);
			setCharitySuccess(false);
			setCharitySubmitting(true);
			await donateCharity(
				{ points_number: auth?.shop_score - totalPrice },
				storage.get(TOKEN_KEY)
			);
			setAuth({
				...auth,
				shop_score: totalPrice,
			});
			charityType === 'manual'
				? setCharityOpen(false)
				: setCharitySuccess(true);
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setCharityError(data[Object.keys(data)[0]]);
			} else {
				setCharityError('Что-то пошло не так, попробуйте еще раз');
			}
		} finally {
			setCharitySubmitting(false);
		}
	};

	const onNext = () => {
		if (step === 'basket' && !charityOpen) {
			setCharityType('auto');
			setCharityOpen(true);
		}
	};

	const onBack = () => {
		step === 'point' && setStep('basket');
	};

	const sendOrderData = async () => {
		const items = basketItems?.map((el) => {
			return {
				item_availability_id: el?.item_availability_id,
				quantity: el?.quantity,
			};
		});
		try {
			setServerError(null);
			setOrderSubmitting(true);
			await sendOrder(
				{ items: items, pickup_point: pickupPoint },
				storage.get(TOKEN_KEY)
			);
			setSuccess(true);
			setStatusModalOpen(true);
			clearBasket();
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				const currentError = data[Object.keys(data)[0]];

				if (Array.isArray(currentError)) {
					const error = currentError.map((el) => el[0]);

					const errorText = error.reduce(
						(accumulator, current) =>
							`${accumulator}${current}\n\n`,
						''
					);
					setServerError(errorText);
				} else {
					setServerError(currentError);
				}
			} else {
				setServerError('Что-то пошло не так, попробуйте еще раз');
			}
			setStatusModalOpen(true);
		} finally {
			setOrderSubmitting(false);
		}
	};

	return (
		<PrivateTemplateGeneric title="Корзина">
			<Head isSmallHead={false} pathname={pathname} background="bike" />
			<section className={css['wrapper']}>
				<div className={`content ${css['inner']}`}>
					<h1 className={css['title']}>Корзина</h1>
					{step === 'basket' && SHOP_ACTIVE !== 'disabled' && (
						<BasketHead
							totalScore={auth?.shop_score}
							currentScore={auth?.shop_score - totalPrice}
							sendCharityHandler={manualCharity}
							className={css['head']}
						/>
					)}
					{basketItems &&
						basketItems?.length > 0 &&
						step === 'basket' && (
							<BasketItems
								basketItems={basketItems}
								addToBasket={addToBasket}
								removeFromBasket={removeFromBasket}
								className={css['items']}
								totalCount={totalCount}
								totalPrice={totalPrice}
								handleCount={handleCount}
								onNext={onNext}
								info={content?.basketPage?.items_message}
							/>
						)}
					{(!basketItems || basketItems?.length <= 0) &&
						step === 'basket' && (
							<EmptyBasket className={css['empty']} />
						)}
					{step === 'point' && (
						<PickupPoint
							content={content?.basketPage?.pickup_point_message}
							points={points}
							onBack={onBack}
							setPoint={setPickupPoint}
							onSubmit={sendOrderData}
							submitting={orderSubmitting}
						/>
					)}
				</div>
			</section>
			<Footer />
			<CharityModal
				isOpen={charityOpen}
				onClose={() => {
					if (charityType === 'manual') {
						setCharityError(null);
						setCharityOpen(false);
					} else {
						setCharityError(null);
						setCharityOpen(false);
						setCharitySuccess(false);
					}
				}}
				declineHandler={() => {
					if (charityType === 'manual') {
						setCharityError(null);
						setCharitySuccess(false);
						setCharityOpen(false);
					} else {
						setCharityError(null);
						setCharitySuccess(false);
						setCharityOpen(false);
						step !== 'point' && setStep('point');
					}
				}}
				acceptHandler={sendCharity}
				serverError={charityError}
				acceptText={
					charityType === 'manual'
						? 'Отправить баллы'
						: 'Да, отправить баллы'
				}
				declineText={
					charityType === 'manual'
						? 'Отменить'
						: 'Нет, продолжить оформление'
				}
				title={
					charityType === 'manual'
						? 'Внимание!'
						: 'После оформления заказа все Ваши оставшиеся баллы сгорят. Хотите отправить их на благотворительность?'
				}
				description={
					charityType === 'manual'
						? 'Нажимая на данную кнопку вы отправляете оставшиеся баллы на благотворительность, либо остаток баллов сгорает.'
						: null
				}
				successMessage="Ваши оставшиеся баллы отправлены на благотворительноть!"
				successButtonText="Перейти к оформлению заказа"
				onSuccess={() => {
					setCharityError(null);
					setCharityOpen(false);
					setTimeout(() => setCharitySuccess(false), 500);
					step !== 'point' && setStep('point');
				}}
				success={charitySuccess}
			/>
			<OrderStatusModal
				isOpen={statusModalOpen}
				onClose={() => {
					if (success) {
						router.replace('/shop');
					} else {
						setStatusModalOpen(false);
					}
				}}
				successTitle="Ура! Ваш заказ оформлен!"
				successText='Обновите страницу "Магазин" для получения контактных данных.'
				error={serverError}
				success={success}
			/>
		</PrivateTemplateGeneric>
	);
};

export default BaksetPage;
