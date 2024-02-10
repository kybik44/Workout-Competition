import { useRouter } from 'next/router';
import { useContext } from 'react';
import { AuthContext } from '../../../entities/modules/auth';
import useShop from '../../../entities/modules/shop/hooks/useShop';
import {
	OrderInfoData,
	ShopItemData,
} from '../../../entities/modules/shop/types';
import {
	CharityCount,
	CharityInfo,
	ShopPageContent,
} from '../../../entities/types';
import {
	SHOP_VISIBILITY,
	TOKEN_KEY,
} from '../../../shared/lib/constants/global';
import storage from '../../../shared/lib/utils/storage';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import Footer from '../../../shared/ui/components/molecules/Footer';
import Head from '../../../shared/ui/components/molecules/Head';
import Charity from '../../../shared/ui/components/organisms/Charity';
import Order from '../../../shared/ui/components/organisms/Order';
import Products from '../../../shared/ui/components/organisms/Products';
import SaleProducts from '../../../shared/ui/components/organisms/SaleProducts';
import ShopStub from '../../../shared/ui/components/organisms/ShopStub';
import css from './index.module.css';

type Props = {
	items: ShopItemData[];
	charityInfo: CharityInfo;
	charityCount: CharityCount;
	content: ShopPageContent;
	order: OrderInfoData;
};

const ShopPage = ({
	items,
	charityInfo,
	charityCount,
	content,
	order,
}: Props) => {
	const router = useRouter();
	const { pathname } = router;

	const { auth } = useContext(AuthContext);

	const { basketItems, addToBasket, totalPrice, totalCount } = useShop({
		userScore: auth?.shop_score,
		token: storage.get(TOKEN_KEY),
	});

	const handleSelected = (id: number) => {
		if (basketItems && basketItems?.length > 0) {
			const item = basketItems?.find((el) => el?.product_id === id);
			if (item) {
				return item?.quantity;
			} else {
				return null;
			}
		}
		return null;
	};

	return (
		<PrivateTemplateGeneric title="Магазин">
			<Head isSmallHead={false} pathname={pathname} background="bike" />
			{SHOP_VISIBILITY?.toLowerCase() === 'hidden' && <ShopStub />}
			{SHOP_VISIBILITY?.toLowerCase() !== 'hidden' && (
				<>
					<Charity
						userScore={auth?.shop_score}
						content={charityInfo}
						count={charityCount}
						disableForm={order?.items?.length > 0}
						totalPrice={totalPrice}
					/>

					{order?.items?.length <= 0 && (
						<>
							<Products
								addToBasket={addToBasket}
								score={auth?.shop_score}
								products={items?.filter((el) => !el?.sale)}
								totalPrice={totalPrice}
								totalCount={totalCount}
								basketItems={basketItems}
								className={css['shop-wrapper']}
								content={content}
								handleSelected={handleSelected}
							/>
							{items &&
								items?.filter((el) => el?.sale)?.length > 0 && (
									<SaleProducts
										addToBasket={addToBasket}
										score={auth?.shop_score}
										products={items?.filter(
											(el) => el?.sale
										)}
										totalPrice={totalPrice}
										handleSelected={handleSelected}
									/>
								)}
						</>
					)}
					{order?.items?.length > 0 && (
						<Order
							charity={charityInfo}
							order={order}
							message={content?.shopPage?.order_message}
						/>
					)}
				</>
			)}
			<Footer />
		</PrivateTemplateGeneric>
	);
};

export default ShopPage;
