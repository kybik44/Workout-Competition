import React, { FC } from 'react';
import { FieldError } from 'react-hook-form';
import css from './index.module.css';

type Props = React.ComponentProps<'input'> & {
	register: any;
	error: FieldError | undefined;
};

const BirthdayInput: FC<Props> = ({ register, error, ...props }) => {
	return (
		<input
			{...register}
			{...props}
			className={`${css['input']} ${error ? css['error'] : ''}`}
		/>
	);
};

export default BirthdayInput;
