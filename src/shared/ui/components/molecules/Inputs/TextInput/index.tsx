import React, { FC, useState } from 'react';
import { FieldError } from 'react-hook-form';
import FieldErrorMessage from '../../../atoms/FieldErrorMessage';
import ShowPasswordIcon from '../../../atoms/Icons/ShowPasswordIcon';
import css from './index.module.css';

type Props = React.ComponentProps<'input'> & {
	register: any;
	error: FieldError | undefined;
	label?: string;
	containerClass?: string;
};

// !!! ⚠️ Do not forget the name, autocomplete, type and inputmode attributes
const TextInput: FC<Props> = ({
	error,
	label,
	containerClass,
	register,
	type,
	...props
}) => {
	const [typeForPassword, setTypeForPassword] = useState<'text' | 'password'>(
		'password'
	);

	return (
		<div
			className={`${css['input-container']} ${containerClass ? containerClass : ''
				}`}
		>
			{label ? (
				<label htmlFor={props.name} className={css.label}>
					{label}
				</label>
			) : null}
			<div
				className={`${css['input-field-wrap']} ${error && css['input-field-wrap--error']
					}`}
			>
				<input
					{...register}
					{...props}
					type={type === 'password' ? typeForPassword : type}
				/>
				{type === 'password' && (
					<ShowPasswordIcon
						setTypeForPassword={setTypeForPassword}
						typeForPassword={typeForPassword}
					/>
				)}
			</div>
			{error && (
				<FieldErrorMessage
					className={css['error-message']}
					msg={error.message}
				/>
			)}
		</div>
	);
};

export default TextInput;
