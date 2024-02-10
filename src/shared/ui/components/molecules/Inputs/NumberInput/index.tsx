import React from 'react';
import FieldErrorMessage from '../../../atoms/FieldErrorMessage';
import css from './index.module.css';

type Props = React.ComponentProps<'input'> & {
	error?: string;
	label?: string;
	containerClass?: string;
	unit?: string;
};

// !!! ⚠️ Do not forget the name, autocomplete, type and inputmode attributes
const NumberInput = ({
	error,
	label,
	containerClass,
	unit,
	className,
	...props
}: Props) => {
	return (
		<div
			className={`${css['wrapper']} ${containerClass ? containerClass : ''
				}`}
		>
			<div
				className={`${css['input-wrapper']} ${error && css['input-wrapper--error']
					}`}
			>
				{label && (
					<label htmlFor={props.name} className={css['label']}>
						{label}
					</label>
				)}
				<input
					className={`${css['input']} ${className && className}`}
					{...props}
				/>
				{unit && <span className={css['unit']}>{unit}</span>}
			</div>
			{error && (
				<FieldErrorMessage
					className={css['error-message']}
					msg={error}
				/>
			)}
		</div>
	);
};

export default NumberInput;
