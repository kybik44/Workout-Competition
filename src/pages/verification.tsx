import { GetServerSideProps, GetServerSidePropsResult } from 'next';

export { default } from '../features/public/VerificationPage';

export const getServerSideProps: GetServerSideProps = async ({
	query,
}): Promise<
	GetServerSidePropsResult<{
		token: string;
	}>
> => {
	const { token } = query;
	return {
		props: {
			token: token ? token?.toString() : null,
		},
	};
};
