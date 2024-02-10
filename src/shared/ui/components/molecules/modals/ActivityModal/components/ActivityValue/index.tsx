import React, { ComponentProps } from 'react';
import { ActivityInfo } from '../../../../../../../lib/constants/activitites';
import NumberInput from '../../../../Inputs/NumberInput';
import css from './index.module.css';

export type ActivityValueData = {
	type: string;
	value: string;
	activityType: number;
	main?: boolean;
	required?: boolean;
	name?: string;
};

type Props = ComponentProps<'div'> & {
	currentType?: ActivityInfo;
	setValues: (state: ActivityValueData[]) => void;
	values: ActivityValueData[];
	error?: string;
};

const ActivityValue = ({
	currentType,
	setValues,
	values,
	error,
	className,
	...props
}: Props) => {
	const handleValue = async (data: ActivityValueData) => {
		if (
			data?.value &&
			values &&
			values?.length > 0 &&
			values?.find(
				(v) =>
					v?.type === data?.type &&
					v?.activityType === data?.activityType
			) !== undefined
		) {
			let newValues = values?.map((value) =>
				value?.type === data?.type &&
				value?.activityType === data?.activityType
					? data
					: value
			);
			setValues(newValues);
		} else if (
			data?.value &&
			values &&
			values?.length > 0 &&
			values?.find(
				(v) =>
					v?.type === data?.type &&
					v?.activityType === data?.activityType
			) === undefined
		) {
			setValues([...values, data]);
		} else if (data?.value) {
			setValues([data]);
		} else if (!data?.value && values && values?.length > 0) {
			let newValues = values?.filter(
				(v) =>
					v?.activityType === data?.activityType &&
					v?.type !== data?.type
			);
			setValues(newValues);
		} else {
			setValues(null);
		}
	};

	const handleCurrentValue = (field: string) => {
		let result = values?.find(
			(v) => v?.type === field && v?.activityType === currentType?.id
		)?.value;
		return result;
	};

	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<h3 className={css['title']}>
				3. Введите свои достижения за сегодня
			</h3>
			<div className={css['inputs']}>
				{currentType?.values?.map((field, idx) => (
					<NumberInput
						label={field?.title}
						unit={field?.unit}
						name={currentType?.name}
						type="number"
						containerClass={css['input-container']}
						className={css['input']}
						value={handleCurrentValue(field?.title) || ''}
						onChange={(e) =>
							handleValue({
								activityType: currentType?.id,
								value: e?.currentTarget?.value,
								type: field?.title,
								main: field?.mainValue,
								required: field?.required,
								name: field?.name,
							})
						}
						key={`${idx}${field?.title}`}
					/>
				))}
			</div>
			{error && <p className={css['error']}>{error}</p>}
		</div>
	);
};

export default ActivityValue;
