import { ComponentProps, useEffect, useState } from 'react';
import { ActivityData } from '../../../../../entities/types';
import dateLiveTape from '../../../../lib/utils/dateLiveTape';
import timeDisplayHelper from '../../../../lib/utils/timeDisplayHelper';
import BasketIcon from '../../atoms/Icons/BasketIcon';
import css from './index.module.css';

export type TableColumn = {
	name: string;
	centerText?: boolean;
};

type Props = ComponentProps<'div'> & {
	columns: TableColumn[];
	data: ActivityData[];
	setOpen: (state: boolean) => void;
	setRemoveId: (state: number | null) => void;
	remove?: boolean;
};

const ProfileTable = ({
	columns,
	data,
	setOpen,
	setRemoveId,
	remove,
	className,
	...props
}: Props) => {
	const [rows, setRows] = useState<{ id: number; values: any[] }[]>(null);

	useEffect(() => {
		data &&
			setRows(
				data?.map((d, idx) => {
					return {
						id: d?.id,
						values: [
							idx + 1,
							d?.name,
							d?.value,
							d?.score,
							dateLiveTape(d?.created_at),
							timeDisplayHelper(d?.created_at),
						],
					};
				})
			);
	}, [data]);
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<table className={css['table']}>
				<tbody>
					<tr
						className={`${css['row']} ${remove ? css['deletable-row'] : ''
							}`}
					>
						{columns?.map((r, idx) => (
							<th
								key={`${r}${idx}`}
								style={{
									textAlign: r?.centerText
										? 'center'
										: 'start',
								}}
								className={css['head']}
							>
								{r?.name}
							</th>
						))}
					</tr>
					{rows?.map((r, idx) => (
						<tr
							key={`${r[0]}${idx}`}
							className={`${css['row']} ${remove ? css['deletable-row'] : ''
								}`}
						>
							{r?.values?.map((v, idx) => (
								<td
									key={`${v}${idx}`}
									style={{
										textAlign:
											columns?.findIndex(
												(el) => el?.centerText
											) !== undefined &&
												idx ===
												columns?.findIndex(
													(el) => el?.centerText
												)
												? 'center'
												: 'start',
									}}
									className={css['column']}
								>
									{v}
								</td>
							))}
							{remove && (
								<td className={css['remove-wrapper']}>
									<button
										onClick={() => {
											setOpen(true);
											setRemoveId(r?.id);
										}}
										type="button"
										className={css['remove']}
									>
										<BasketIcon />
									</button>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ProfileTable;
