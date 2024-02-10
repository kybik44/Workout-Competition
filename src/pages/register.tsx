import { GetServerSideProps, GetServerSidePropsResult } from 'next';
import { Team } from '../entities/types';
import { getAllTeams } from '../shared/api/content';

export { default } from '../features/public/RegisterPage';

export const getServerSideProps: GetServerSideProps = async (): Promise<
	GetServerSidePropsResult<{
		teams: Team[];
	}>
> => {
	try {
		const { data } = await getAllTeams();
		return {
			props: {
				teams: data,
			},
		};
	} catch (e) {
		console.log(JSON.parse(JSON.stringify(e)));
		return {
			props: {
				teams: null,
			},
		};
	}
};
