import * as cookie from 'cookie';
import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { getOrders, getShopItemDatas } from '../entities/modules/shop/api';
import { OrderInfoData, ShopItemData } from '../entities/modules/shop/types';
import { CharityCount, CharityInfo, ShopPageContent } from '../entities/types';
import { getCharityCount, getCharityInfo } from '../shared/api/charity';
import { getShopPageContent } from '../shared/api/cms/gql';
import { TOKEN_KEY } from '../shared/lib/constants/global';

export { default } from '../features/private/ShopPage';

const getItems = async (token: string) => {
	try {
		const { data } = await getShopItemDatas(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getInfo = async (token: string) => {
	try {
		const { data } = await getCharityInfo(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getCount = async (token: string) => {
	try {
		const { data } = await getCharityCount(token);
		return data;
	} catch (error) {
		console.log(JSON.parse(JSON.stringify(error)));
		return null;
	}
};

const getContent = async () => {
	try {
		const data = await getShopPageContent();
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
		items: ShopItemData[];
		charityInfo: CharityInfo;
		charityCount: CharityCount;
		content: ShopPageContent;
		order: OrderInfoData;
	}>
> => {
	const parsedCookies = headers.cookie ? cookie.parse(headers.cookie) : null;
	if (headers.cookie && parsedCookies && parsedCookies[TOKEN_KEY]) {
		const token = parsedCookies[TOKEN_KEY];
		const items = await getItems(token);
		const info = await getInfo(token);
		const charityCount = await getCount(token);
		const content = await getContent();
		const order = await getShopOrders(token);
		return {
			props: {
				charityInfo: info,
				items: items,
				charityCount: charityCount,
				content: content,
				order: order,
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
