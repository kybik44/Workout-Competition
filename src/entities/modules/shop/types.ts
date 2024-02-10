export type ShopItemData = {
	id: number;
	availability: {
		id: number;
		size: string;
		color: string;
		color_hex: string;
		available: boolean;
	}[];
	images: ShopItemImage[];
	title: string;
	short_description: string;
	description: string;
	quantity_per_hand: number;
	price: number;
	sale: boolean;
};

export type ShopItemImage = {
	image_default: string;
	image_retina: string;
	is_cover: boolean;
};

export type PickupPoint = {
	id: number;
	address: string;
	manager: string;
	contacts: string;
};

export type OrderInfoData = {
	created_at: string;
	items: OrderItem[];
	pickup_point: PickupPointData;
	charity_points: number;
};

export type OrderItem = {
	total_price: number;
	quantity: number;
	size: string;
	color_hex: string;
	color: string;
	item: {
		images: ShopItemImage[];
		price: number;
		short_description: string;
		title: string;
	};
};

export type BasketItemData = {
	item_availability_id: number;
	quantity: number;
	price: number;
	quantity_per_hand: number;
	product_id: number;
	image: ShopItemImage;
	description: string;
	title: string;
	size: string;
	color: string;
};

export type Basket = {
	items: BasketItemData[];
	pickup_point: string;
};

export type PickupPointData = {
	id: number;
	address: string;
	manager: string;
	contacts: string;
};

export type OrderData = {
	items: {
		item_availability_id: number;
		quantity: number;
	}[];
	pickup_point: number;
};
