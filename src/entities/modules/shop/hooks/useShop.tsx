import { useEffect, useState } from 'react';
import { BASKET_NAME } from '../../../../shared/lib/constants/global';
import localStorage from '../../../../shared/lib/utils/localStorage';
import { BasketItemData } from '../types';

export type ShopModuleReturn = {
	basketItems: BasketItemData[] | undefined;
	setBasketItems: (state: BasketItemData[]) => void;
	addToBasket: (item: BasketItemData) => void;
	totalPrice: number;
	totalCount: number;
	removeFromBasket: (item: BasketItemData) => void;
	setPickupPoint: (state: number) => void;
	pickupPoint: number;
	clearBasket: () => void;
};

type Props = {
	userScore: number;
	token: string;
};

const useShop = ({ userScore, token }: Props): ShopModuleReturn => {
	const [basketItems, setBasketItems] = useState<BasketItemData[]>(null);
	const [totalPrice, setTotalPrice] = useState<number>(0);
	const [totalCount, setTotalCount] = useState<number>(0);
	const [pickupPoint, setPickupPoint] = useState<number>(null);

	useEffect(() => {
		setBasketItems(JSON.parse(localStorage.get(BASKET_NAME)));
	}, []);

	const clearBasket = () => {
		setBasketItems(null);
		localStorage.remove(BASKET_NAME);
	};

	useEffect(() => {
		const price =
			basketItems && basketItems?.length > 0
				? basketItems?.reduce(
						(sum, item) => sum + +item?.price * +item?.quantity,
						0
				  )
				: 0;
		const count =
			basketItems && basketItems?.length > 0
				? basketItems?.reduce((sum, item) => sum + +item?.quantity, 0)
				: 0;

		setTotalPrice(price);
		setTotalCount(count);
	}, [basketItems]);

	const addToBasket = (item: BasketItemData) => {
		const basketItem =
			basketItems && basketItems?.length > 0
				? basketItems?.find(
						(el) =>
							el?.item_availability_id ===
							item?.item_availability_id
				  )
				: null;

		const isAvailable = +item?.price * +item?.quantity <= +userScore;

		if (
			isAvailable &&
			basketItems &&
			basketItems?.length > 0 &&
			basketItem
		) {
			let newItems = basketItems?.map((el) =>
				el?.item_availability_id === item?.item_availability_id
					? {
							...el,
							quantity: item?.quantity,
					  }
					: el
			);
			setBasketItems(newItems);
			localStorage.set(BASKET_NAME, JSON.stringify(newItems));
		} else if (
			isAvailable &&
			basketItems &&
			basketItems?.length > 0 &&
			!basketItem
		) {
			setBasketItems([...basketItems, item]);
			localStorage.set(
				BASKET_NAME,
				JSON.stringify([...basketItems, item])
			);
		} else if (isAvailable && item) {
			setBasketItems([item]);
			localStorage.set(BASKET_NAME, JSON.stringify([item]));
		} else {
			setBasketItems(basketItems);
		}
	};

	const removeFromBasket = (item: BasketItemData) => {
		let newItems = basketItems?.filter(
			(i) => i?.item_availability_id !== item?.item_availability_id
		);
		setBasketItems(newItems);
		if (basketItems?.length === 1) {
			localStorage.remove(BASKET_NAME);
		} else {
			localStorage.set(BASKET_NAME, JSON.stringify(newItems));
		}
	};

	return {
		basketItems,
		setBasketItems,
		addToBasket,
		totalPrice,
		totalCount,
		removeFromBasket,
		setPickupPoint,
		pickupPoint,
		clearBasket,
	};
};

export default useShop;
