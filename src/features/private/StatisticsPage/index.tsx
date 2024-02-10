import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Table, { Type } from '../../../entities/modules/Table';
import { LeadersPeriod } from '../../../entities/types';
import {
	deleteProfileLike,
	getStatisticsActivities,
	postProfileLike,
} from '../../../shared/api/statistics';
import { ACTIVITIES } from '../../../shared/lib/constants/activitites';
import { API_URL, TOKEN_KEY } from '../../../shared/lib/constants/global';
import dateLiveTape from '../../../shared/lib/utils/dateLiveTape';
import storage from '../../../shared/lib/utils/storage';
import timeDisplayHelper from '../../../shared/lib/utils/timeDisplayHelper';
import PrivateTemplateGeneric from '../../../shared/templates/PrivateTemplateGeneric';
import Graphs from '../../../shared/ui/components/molecules/Graphs';
import Head from '../../../shared/ui/components/molecules/Head';
import Leaders from '../../../shared/ui/components/molecules/Leaders';
import css from './index.module.css';

type Props = {
	periods: LeadersPeriod[];
};

type SwitchButtons = {
	name: string;
	stats: 'rating' | 'tape' | 'leaders' | 'graph';
};

const statiscsTypes: SwitchButtons[] = [
	{
		name: 'Общий рейтинг',
		stats: 'rating',
	},
	{
		name: 'Живая лента',
		stats: 'tape',
	},
	{
		name: 'Лидеры недели',
		stats: 'leaders',
	},
	{
		name: 'График',
		stats: 'graph',
	},
];

const StatisticsPage = ({ periods }: Props) => {
	const [stats, setStats] = useState<'rating' | 'tape' | 'leaders' | 'graph'>(
		'rating'
	);
	const [liveTapeData, setLiveTapeData] = useState<any[] | null>(null);

	const [likeProcess, setLikeProcess] = useState<boolean>(false);

	const token = storage.get(TOKEN_KEY);

	const getLiveTapeData = async () => {
		try {
			const { data } = await getStatisticsActivities(
				storage.get(TOKEN_KEY)
			);
			const result = data?.map((row, idx) => {
				const discipline = ACTIVITIES.find(
					(i) => Number(i.id) === row.discipline
				);
				return [
					idx + 1,
					{
						full_name: row.full_name,
						avatar: row.avatar,
						city: row.city,
						team: row.team,
						likes: row.likes,
						is_liked: row.is_liked,
						profile_id: row.profile_id,
					},
					`${discipline?.name}`,
					`${row.value}`,
					`${row.score}`,
					dateLiveTape(row.created_at),
					timeDisplayHelper(row.created_at),
					`${row.full_name}`,
					`${row.city}`,
					`${row.team}`,
				];
			});
			setLiveTapeData(result);
		} catch (e) {
			setLiveTapeData(null);
		}
	};

	useEffect(() => {
		stats === 'tape' && getLiveTapeData();
	}, [stats]);

	const onLike = async (id: string) => {
		if (!likeProcess) {
			try {
				setLikeProcess(true);
				await postProfileLike(id, token);
				setLiveTapeData(
					await liveTapeData?.map((p) => {
						if (p[1]?.profile_id === id) {
							p[1].likes = p[1].likes + 1;
							p[1].is_liked = true;
							return p;
						}
						return p;
					})
				);
			} catch (err) {
				if (err && err.response) {
					console.error(`Action error:`);
				} else {
					throw err;
				}
			} finally {
				setLikeProcess(false);
			}
		} else {
			return;
		}
	};

	const onDislike = async (id: string) => {
		if (!likeProcess) {
			try {
				setLikeProcess(true);
				await deleteProfileLike(id, token);
				setLiveTapeData(
					await liveTapeData?.map((p) => {
						if (p[1]?.profile_id === id) {
							p[1].likes =
								p[1].likes - 1 < 0 ? 0 : p[1].likes - 1;
							p[1].is_liked = false;
							return p;
						}
						return p;
					})
				);
			} catch (err) {
				if (err && err.response) {
					console.error(`Action error:`);
				} else {
					throw err;
				}
			} finally {
				setLikeProcess(false);
			}
		} else {
			return;
		}
	};

	const handleLike = (id: string, liked: boolean) => {
		liked ? onDislike(id) : onLike(id);
	};

	const router = useRouter();
	const { pathname } = router;

	return (
		<PrivateTemplateGeneric title="Статистика">
			<Head background="bike" isSmallHead={false} pathname={pathname} />
			<section className={css['wrapper']}>
				<div className={`content ${css['inner']}`}>
					<h1 className={css['title']}>Статистика</h1>
					<div className={css['switcher']}>
						{statiscsTypes.map((s, idx) => (
							<button
								type="button"
								onClick={() => setStats(s.stats)}
								key={`${s.name}${idx}`}
								className={`${css['switch-button']} ${
									stats === s?.stats ? css['active'] : ''
								}`}
							>
								{s.name}
							</button>
						))}
					</div>
					{stats === 'rating' && (
						<Table
							type={Type.INDIVIDUAL}
							pagination={{
								enabled: true,
								limit: 11,
								summary: false,
							}}
							search={{
								enabled: true,
								debounceTimeout: 5000,
								ignoreHiddenColumns: false,
							}}
							className={{
								container: `${css['table-container']}`,
								table: `${css['table']}`,
								thead: `${css['thead']}`,
								tbody: `${css['tbody']}`,
								pagination: `${css['pagination']}`,
								paginationButton: `${css['btn-pagination']}`,
								paginationButtonNext: `${css['btn-pagination--next']}`,
								paginationButtonPrev: `${css['btn-pagination--prev']}`,
								paginationButtonCurrent: `${css['btn-pagination--active']}`,
								search: css['search'],
								sort: `${css['sort-button']}`,
							}}
							server={{
								url: `${API_URL}/score/statistics/members/`,
								then: (data) => data,
								headers: {
									Authorization: `Token ${storage.get(
										TOKEN_KEY
									)}`,
								},
								handle: async (res: any) => {
									// no matching records found
									if (res.status === 404) return { data: [] };
									if (res.ok) return res.json();

									throw Error('oh no :(');
								},
							}}
						/>
					)}
					{stats === 'tape' && liveTapeData && (
						<Table
							handleLike={handleLike}
							type={Type.LIVE_TAPE_STATISTIC}
							pagination={{
								enabled: true,
								limit: 11,
								summary: false,
							}}
							search={{
								enabled: true,
								debounceTimeout: 5000,
								ignoreHiddenColumns: false,
							}}
							setData={setLiveTapeData}
							sort={false}
							className={{
								container: `${css['table-container']}`,
								table: `${css.table}`,
								thead: `${css.thead}`,
								tbody: `${css.tbody}`,
								pagination: `${css.pagination}`,
								paginationButton: `${css['btn-pagination']}`,
								paginationButtonNext: `${css['btn-pagination--next']}`,
								paginationButtonPrev: `${css['btn-pagination--prev']}`,
								paginationButtonCurrent: `${css['btn-pagination--active']}`,
								search: `${css['search']}`,
								sort: `${css['sort-button']}`,
							}}
							data={liveTapeData}
						/>
					)}
					{stats === 'leaders' && <Leaders periods={periods} />}
					{stats === 'graph' && <Graphs />}
				</div>
			</section>
		</PrivateTemplateGeneric>
	);
};

export default StatisticsPage;
