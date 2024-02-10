import React, { ComponentProps } from 'react';
import {
	ACTIVITIES,
	ActivityInfo,
} from '../../../../../../../lib/constants/activitites';
import RadioInput from '../../../../Inputs/RadioInput';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	setType: (state: ActivityInfo | null) => void;
	currentType?: ActivityInfo;
};

const SelectingActivity = ({
	setType,
	currentType,
	className,
	...props
}: Props) => {
	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<h3 className={css['title']}>1. Выберете тип активности</h3>
			<div className={css['activities']}>
				{ACTIVITIES?.map((a, idx) => (
					<RadioInput
						name="activity"
						value={a.name}
						label={a?.name}
						onChange={() => setType(a)}
						key={a?.name}
						checked={currentType?.name === a?.name}
					/>
				))}
			</div>
		</div>
	);
};

export default SelectingActivity;
