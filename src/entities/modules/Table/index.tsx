import { UserConfig } from 'gridjs';
import { Grid, _ } from 'gridjs-react';
import 'gridjs/dist/theme/mermaid.css';
import { FC } from 'react';

import useMedia from '../../../shared/lib/hooks/useMedia';
import { Achievement } from '../../types';
import ProfileCell from './components/ProfileCell/index';

export enum Type {
	INDIVIDUAL,
	LIVE_TAPE_STATISTIC,
	LEADERS,
}

interface Config extends UserConfig {
	type: Type;
	remove?: boolean;
	setData?: (state: any) => void;
	handleLike?: (id: string, liked: boolean) => void;
}

export type DataItemActivites = {
	created_at: string;
	name: string;
	score: number;
	value: number;
};

export type DataItem = {
	index: number;
	full_name: string;
	id: string;
	avatar: string;
	city: string;
	team: string;
	total_score: string;
	discipline_score: {};
	achievements: Achievement[];
	likes: number;
	profile_id: string;
	is_liked: boolean;
};

const Table: FC<Config> = ({ type, remove, setData, handleLike, ...props }) => {
	const modile = useMedia('(max-width:414px)');

	const columns = {
		[Type.INDIVIDUAL]: [
			{
				name: '№',
				width: '42px',
				data: (row: DataItem) => row.index,
				sort: false,
			},
			{
				name: 'Участник',
				data: (row: DataItem) => row,
				sort: false,
				formatter: (cell: DataItem) => {
					return _(
						<ProfileCell profileLink data={cell} achievements />
					);
				},
				width: '237px',
			},
			{
				name: '_Имя',
				data: (row: DataItem) => row.full_name,
				sort: false,
				hidden: true,
			},
			{
				name: '_Город',
				data: (row: DataItem) => row.city,
				sort: false,
				hidden: true,
			},
			{
				name: '_команда',
				data: (row: DataItem) => row.team,
				sort: false,
				hidden: true,
			},
			{
				name: 'Баллов всего',
				data: (row: DataItem) => Number(row.total_score).toFixed(2),
				width: 'auto',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: `Бег`,
				data: (row: DataItem) =>
					row.discipline_score['1']
						? Number(row.discipline_score['1'])
						: 0,
				width: '60px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: 'Ходьба прогул.',
				data: (row: DataItem) =>
					row.discipline_score['2']
						? Number(row.discipline_score['2'])
						: 0,
				width: '76px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: `Ходьба спорт.`,
				data: (row: DataItem) =>
					row.discipline_score['3']
						? Number(row.discipline_score['3'])
						: 0,
				width: '73px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: `Вело`,
				data: (row: DataItem) =>
					row.discipline_score['4']
						? Number(row.discipline_score['4'])
						: 0,
				width: '56px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: `Плавание`,
				data: (row: DataItem) =>
					row.discipline_score['5']
						? Number(row.discipline_score['5'])
						: 0,
				width: '83px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: 'Трени-ка на воде',
				data: (row: DataItem) =>
					row.discipline_score['6']
						? Number(row.discipline_score['6'])
						: 0,
				width: '79px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: 'Трени-ка силовая',
				data: (row: DataItem) =>
					row.discipline_score['7']
						? Number(row.discipline_score['7'])
						: 0,
				width: '80px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: 'Трени-ка с выс. темпом',
				data: (row: DataItem) =>
					row.discipline_score['8']
						? Number(row.discipline_score['8'])
						: 0,
				width: '99px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: 'Гимнастика ОФП ',
				data: (row: DataItem) =>
					row.discipline_score['9']
						? Number(row.discipline_score['9'])
						: 0,
				width: '90px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
			{
				name: `Йога`,
				data: (row: DataItem) => {
					return row.discipline_score['10']
						? Number(row.discipline_score['10'])
						: 0;
				},
				width: '56px',
				sort: {
					compare: (a, b) => {
						if (a > b) {
							return 1;
						} else if (b > a) {
							return -1;
						} else {
							return 0;
						}
					},
				},
			},
			{
				name: 'Игровой вид спорта',
				data: (row: DataItem) =>
					row.discipline_score['11']
						? Number(row.discipline_score['11'])
						: 0,
				width: '105px',
				sort: {
					compare: (a, b) => {
						return a - b;
					},
				},
			},
		],
		[Type.LIVE_TAPE_STATISTIC]: [
			{
				name: '№',
				width: '55px',
				sort: false,
			},
			{
				name: 'Участник',
				width: '285px',
				sort: false,
				formatter: (cell: DataItem) => {
					return _(
						<ProfileCell
							handleLike={handleLike}
							data={cell}
							likes
						/>
					);
				},
			},
			{
				name: 'Вид активности',
				width: '240px',
				sort: false,
			},
			{
				name: 'Значение (км, мин.)',
				width: '180px',
				sort: false,
			},
			{
				name: 'Значение (баллы)',
				width: '150px',
				sort: false,
			},
			{
				name: 'Дата',
				width: 'auto',
				sort: false,
			},
			{
				name: 'Время',
				width: 'auto',
				sort: false,
			},
			{
				name: '_Имя',
				sort: false,
				hidden: true,
			},
			{
				name: '_Город',
				sort: false,
				hidden: true,
			},
			{
				name: '_команда',
				sort: false,
				hidden: true,
			},
		],
		[Type.LEADERS]: [
			{
				name: '№',
				width: '55px',
				sort: false,
			},
			{
				name: 'Участник',
				width: '285px',
				sort: false,
				formatter: (cell: DataItem) => {
					return _(<ProfileCell data={cell} />);
				},
			},
			{
				name: 'Вид активности',
				width: '345px',
				sort: false,
			},
			{
				name: 'Значение (км, мин.)',
				width: '256px',
				sort: false,
			},
			{
				name: 'Значение (баллы)',
				width: 'auto',
				sort: false,
			},
			{
				name: '_Имя',
				sort: false,
				hidden: true,
			},
			{
				name: '_Город',
				sort: false,
				hidden: true,
			},
			{
				name: '_команда',
				sort: false,
				hidden: true,
			},
		],
	};

	return (
		<Grid
			{...props}
			columns={columns[type]}
			autoWidth
			language={{
				pagination: {
					previous: '<',
					next: '>',
					navigate: (page, pages) => ` `,
					page: (page) => ` `,
					showing: ' ',
					of: ' ',
					to: ' ',
					results: ' ',
				},
				loading: 'Загрузка...',
				error: 'Ошибка загрузки данных',
				search: 'Поиск...',
				notFound: '',
			}}
		/>
	);
};

export default Table;
