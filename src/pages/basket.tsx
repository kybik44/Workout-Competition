import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { getOrders, getPickupPonts } from '../entities/modules/shop/api';
import { PickupPointData } from '../entities/modules/shop/types';
import { BasketPageContent } from '../entities/types';
import { getBasketPageContent } from '../shared/api/cms/gql';
import { TOKEN_KEY } from '../shared/lib/constants/global';

export { default } from '../features/private/BasketPage';

const getContent = async () => {
	try {
		const data = await getBasketPageContent();
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getPoints = async (token: string) => {
	try {
		const { data } = await getPickupPonts(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getShopOrders = async (token: string) => {
	try {
		const { data } = await getOrders(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

export const getServerSideProps: GetServerSideProps = async ({
	req: { headers },
}): Promise<
	GetServerSidePropsResult<{
		content: BasketPageContent;
		points: PickupPointData[];
	}>
> => {
	const parsedCookies = headers.cookie ? cookie.parse(headers.cookie) : null;
	if (headers.cookie && parsedCookies && parsedCookies[TOKEN_KEY]) {
		const token = parsedCookies[TOKEN_KEY];

		const content = await getContent();
		const points = await getPoints(token);
		const orders = await getShopOrders(token);
		if (orders && orders?.items?.length > 0) {
			return {
				redirect: {
					destination: '/shop',
					permanent: false,
				},
			};
		}
		return {
			props: {
				content: content,
				points: points,
			},
		};
	}

	return {
		redirect: {
			destination: `/register`,
			permanent: false,
		},
	};
};
