import { ComponentProps, useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import Table, { Type } from '../../../../../entities/modules/Table';
import { LeadersPeriod } from '../../../../../entities/types';
import { API_URL, TOKEN_KEY } from '../../../../lib/constants/global';
import storage from '../../../../lib/utils/storage';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	periods: LeadersPeriod[];
};

const Leaders = ({ periods, className, ...props }: Props) => {
	const [period, setPeriod] = useState<number | null>(null);
	const [options, setOptions] = useState<
		{ name: string; value: number }[] | null
	>(null);

	const handleChangePeriod = (value: number) => {
		value && setPeriod(value);
	};

	const getOptions = () => {
		let res = periods
			?.sort((a, b) => +new Date(b?.start_at) - +new Date(a?.start_at))
			?.map((p) => {
				return {
					name: p?.title,
					value: p?.id,
				};
			});

		return res;
	};

	useEffect(() => {
		setOptions(getOptions());
	}, [periods]);

	useEffect(() => {
		options &&
			options?.length > 0 &&
			!period &&
			setPeriod(options[0].value);
	}, [options]);

	return (
		<div className={`${css['wrapper']} ${className ? className : ''}`}>
			{options && (
				<div className={css['period-wrapper']}>
					<span className={css['period-title']}>Статистика за</span>
					<Select
						options={options}
						values={options}
						valueField={'value'}
						labelField={'name'}
						onChange={(v) => handleChangePeriod(v[0].value)}
						className={css['select']}
						searchable={false}
					/>
				</div>
			)}
			{period && (
				<Table
					type={Type.LEADERS}
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
					server={{
						url: `${API_URL}/score/week-leaders/list/?period_id=${period}`,
						then: (data) =>
							data.map((row, idx) => {
								return [
									idx + 1,
									{
										full_name: `${row?.first_name} ${row?.last_name}`,
										avatar: row.avatar,
										city: row.city,
										team: row.team,
									},
									`${row?.discipline__name}`,
									`${+row.total_value?.toFixed(2)}`,
									`${row.total_score?.toFixed(2)}`,
									`${row?.first_name} ${row?.last_name}`,
									`${row.city}`,
									`${row.team}`,
								];
							}),
						headers: {
							Authorization: `Token ${storage.get(TOKEN_KEY)}`,
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
		</div>
	);
};

export default Leaders;
