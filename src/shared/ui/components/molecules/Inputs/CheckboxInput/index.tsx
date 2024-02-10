import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';
import FieldErrorMessage from '../../../atoms/FieldErrorMessage';
import CheckmarkIcon from '../../../atoms/Icons/CheckmarkIcon';
import css from './index.module.css';

type Props = React.ComponentProps<'input'> & {
	register: any;
	error: FieldError | undefined;
	label: string | JSX.Element;
	containerClass?: string;
};

const CheckboxInput: FC<Props> = ({
	register,
	error,
	label,
	containerClass,
	...props
}) => {
	return (
		<div
			className={`${css['input-container']} ${containerClass ? containerClass : ''
				}`}
		>
			<label htmlFor={props.name} className={css['checkbox']}>
				<input type="checkbox" {...props} {...register} />
				<span className={css['checkmark']}>
					<CheckmarkIcon />
				</span>
				{label}
			</label>
			{error ? (
				<FieldErrorMessage
					className={css['error-message']}
					msg={error.message}
				/>
			) : null}
		</div>
	);
};

export default CheckboxInput;
