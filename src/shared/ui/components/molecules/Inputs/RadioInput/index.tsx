import { ComponentProps } from 'react';
import css from './index.module.css';

type Props = ComponentProps<'input'> & {
	label?: string;
	register?: any;
};

const RadioInput = ({
	className,
	label,
	value,
	name,
	checked,
	register,
	...props
}: Props) => {
	return (
		<div className={`${className ? className : ''} ${css['wrapper']}`}>
			<label
				className={`${css['container']} ${checked ? css['checked'] : ''
					}`}
			>
				<input
					type="radio"
					name={name}
					value={value}
					checked={checked}
					{...props}
					{...register}
				/>
				<span className={css['checkmark']}></span>
				<span className={css['label']}>{label}</span>
			</label>
		</div>
	);
};

export default RadioInput;
