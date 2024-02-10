import { useEffect, useState } from 'react';
import Pagination from '../../../../../entities/pagination/components';
import usePagination from '../../../../../entities/pagination/hooks';
import { ActivitiesResponse } from '../../../../../entities/types';
import {
	getProfileActivities,
	getProfileActivitiesById,
	removeProfileActivity,
} from '../../../../api/profile';
import { TOKEN_KEY } from '../../../../lib/constants/global';
import storage from '../../../../lib/utils/storage';
import ProfileTable, { TableColumn } from '../ProfileTable';
import ParticipationModal from '../modals/ParticipationModal';

import css from './index.module.css';

type Props = {
	activitiesData: ActivitiesResponse;
	personal?: boolean;
	profile?: string;
};

const tableHead: TableColumn[] = [
	{
		name: '№',
		centerText: true,
	},
	{
		name: 'Вид активности',
	},
	{
		name: 'Значение (км, мин.)',
	},
	{
		name: 'Значение (баллы)',
	},
	{
		name: 'Дата',
	},
	{
		name: 'Время',
	},
];

const LiveTape = ({ activitiesData, personal, profile }: Props) => {
	const [activities, setActivities] = useState<ActivitiesResponse | null>(
		null
	);
	const [remove, setRemove] = useState<boolean>(false);
	const [error, setServerError] = useState<boolean>(false);
	const [removeId, setRemoveId] = useState<number | null>(null);

	const token = storage.get(TOKEN_KEY);

	const getItemsForPage = async (
		page: string | number,
		limit: string | number
	) => {
		try {
			const { data } = await getProfileActivities(
				storage.get(TOKEN_KEY),
				`?offset=${page}&limit=${limit}`
			);
			return data;
		} catch (e) {
			return null;
		}
	};

	const getItemsForPageById = async (
		page: string | number,
		limit: string | number
	) => {
		try {
			const { data } = await getProfileActivitiesById(
				storage.get(TOKEN_KEY),
				profile,
				`?offset=${page}&limit=${limit}`
			);
			return data;
		} catch (e) {
			return null;
		}
	};

	const { currentPage, pageCount, handlePageClick } = usePagination({
		itemsPerPage: 10,
		count: activities?.count,
		getItemsForPage: personal ? getItemsForPage : getItemsForPageById,
		next: activities?.next,
		previous: activities?.previous,
		setItems: setActivities,
		token: storage.get(TOKEN_KEY),
	});

	const onClose = () => {
		setRemove(false);
		setRemoveId(null);
		setServerError(null);
	};

	const onRemove = async () => {
		try {
			await removeProfileActivity(token, removeId);
			await setRemoveId(null);
			setActivities(await getItemsForPage(currentPage, 10));
		} catch (e) {
			setServerError(true);
		}
	};

	useEffect(() => {
		!activities && setActivities(activitiesData);
	}, [activities]);

	return (
		<section className={css['wrapper']}>
			<div className={`content ${css['inner']}`}>
				<h2 className={css['title']}>
					{personal ? 'Твоя живая лента' : 'Живая лента'}
				</h2>
				<ProfileTable
					data={activities?.results}
					columns={tableHead}
					setOpen={setRemove}
					setRemoveId={setRemoveId}
					className={css['table']}
					remove={personal}
				/>
				{pageCount > 1 && (
					<Pagination
						pageCount={pageCount}
						onClick={(selected) => handlePageClick(selected)}
						currentPage={currentPage}
						className={css['pagination']}
					/>
				)}
			</div>
			<ParticipationModal
				isOpen={remove}
				setOpen={setRemove}
				acceptButton="Удалить"
				declineButton="Отменить"
				acceptHandler={onRemove}
				title="Вы уверены, что хотите удалить результат ?"
				subtitle="Ваши баллы будут пересчитаны в течение 
				5 минут после удаления тренировки"
				onSuccess="close"
				errorText="Попробуйте еще раз"
				serverError={error}
				onClose={onClose}
			/>
		</section>
	);
};

export default LiveTape;
