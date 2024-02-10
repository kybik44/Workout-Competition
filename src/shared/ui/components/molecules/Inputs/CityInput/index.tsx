import { useCombobox } from 'downshift';
import React, { FC, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import { CITIES } from '../../../../../lib/constants/cities';
import FieldErrorMessage from '../../../atoms/FieldErrorMessage';
import css from './index.module.css';

type Props = React.ComponentProps<'input'> & {
	error: FieldError | undefined;
	onChange: (v: string) => void;
	containerClass?: string;
};

const CityInput: FC<Props> = ({
	onChange,
	error,
	containerClass,
	...props
}) => {
	const [inputItems, setInputItems] = useState(CITIES);
	const {
		isOpen,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		getComboboxProps,
		highlightedIndex,
		getItemProps,
	} = useCombobox({
		items: inputItems,
		onSelectedItemChange: ({ inputValue }) => onChange(inputValue),
		onInputValueChange: ({ inputValue }) => {
			setInputItems(
				CITIES.filter((item) =>
					item.toLowerCase().startsWith(inputValue.toLowerCase())
				)
			);
		},
		id: 'select-city',
	});

	const button = useRef(null);
	return (
		<div
			className={`${css['wrapper']} ${containerClass ? containerClass : ''
				}`}
		>
			<label
				{...getLabelProps()}
				className={`${css['label']} ${error && css['label-disabled']}`}
			>
				Город проживания *
			</label>
			<div
				{...getComboboxProps()}
				className={`${css['input-wrapper']} ${error && css['input-wrapper-error']
					}`}
			>
				<input
					{...getInputProps({
						placeholder: props?.placeholder,
						name: props?.name,
						autoComplete: props?.autoComplete,
					})}
					onClick={() => button.current.click()}
				/>
				<button
					type="button"
					{...getToggleButtonProps({
						ref: button,
					})}
					aria-label="toggle menu"
					style={{ display: 'none' }}
				>
					Open
				</button>
			</div>
			{isOpen && (
				<ul {...getMenuProps()} className={`${css['list']}`}>
					{inputItems
						.sort((a, b) => {
							if (a.toLocaleLowerCase() > b.toLocaleLowerCase())
								return 1;
							if (a.toLocaleLowerCase() < b.toLocaleLowerCase())
								return -1;
							return 0;
						})
						.map((item, index) => (
							<li
								className="regular-text"
								style={{
									backgroundColor:
										highlightedIndex === index
											? '#ed36c4'
											: 'white',
								}}
								key={`${item}${index}`}
								{...getItemProps({
									item,
									index,
								})}
							>
								{item}
							</li>
						))}
				</ul>
			)}
			{error && (
				<FieldErrorMessage
					className={css['error-message']}
					msg={error.message}
				/>
			)}
		</div>
	);
};

export default CityInput;
