import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { NewsContent } from '../../entities/types';
import { getNewsById, getNewsPageData } from '../../shared/api/cms/gql';

export { default } from '../../features/private/NewsSinglePage';

export const getServerSideProps: GetServerSideProps = async ({
	params: { id },
}): Promise<
	GetServerSidePropsResult<{
		news: NewsContent;
		next: number;
		prev: number;
	}>
> => {
	try {
		const { news } = await getNewsById(id);
		const allNews = await getNewsPageData(null, 1);

		const arrayOfId = allNews.news.map((item) => item.id);
		const positionInArray = arrayOfId.indexOf(news?.id);

		const next = arrayOfId[positionInArray + 1] || null;
		const prev = arrayOfId[positionInArray - 1] || null;

		if (news) {
			return {
				props: {
					news,
					next,
					prev,
				},
			};
		} else {
			return {
				props: {
					news: null,
					next: null,
					prev: null,
				},
				redirect: {
					destination: '/news',
					permanent: false,
				},
			};
		}
	} catch (e) {
		return {
			props: {
				news: null,
				next: null,
				prev: null,
			},
		};
	}
};
