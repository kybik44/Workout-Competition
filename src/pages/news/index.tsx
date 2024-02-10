import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { NewsPageContent } from '../../entities/types';
import { getNewsPageData } from '../../shared/api/cms/gql';

export { default } from '../../features/private/NewsPage';

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}): Promise<
	GetServerSidePropsResult<{
		content: NewsPageContent;
	}>
> => {
	try {
		const content = await getNewsPageData(9, 1);
		return {
			props: {
				content,
			},
		};
	} catch (e) {
		return {
			props: {
				content: null,
			},
		};
	}
};
