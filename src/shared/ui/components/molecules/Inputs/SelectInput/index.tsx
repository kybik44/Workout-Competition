import { useSelect } from 'downshift';
import { ComponentProps } from 'react';
import { FieldError } from 'react-hook-form';
import FieldErrorMessage from '../../../atoms/FieldErrorMessage';
import SelectArrowIcon from '../../../atoms/Icons/SelectArrowIcon';
import css from './index.module.css';

type Props = ComponentProps<'div'> & {
	title: string;
	items: {
		name: string;
		value: string | number;
	}[];
	onItemChange: (item) => void;
	error: FieldError | undefined;
	disabledButton?: boolean;
	label?: string;
};

const SelectInput = ({
	title,
	items,
	onItemChange,
	className,
	error,
	disabledButton,
	label,
	...props
}: Props) => {
	const {
		getItemProps,
		getMenuProps,
		getToggleButtonProps,
		isOpen,
		highlightedIndex,
		selectedItem,
	} = useSelect({
		id: props?.id,
		items,
		onSelectedItemChange: ({ selectedItem }) =>
			onItemChange ? onItemChange(selectedItem.value) : null,
	});
	return (
		<div className={`${css['wrapper']}  ${className ? className : ''}`}>
			{label && <p className={css['label']}>{label}</p>}
			<button
				className={`${css['select']} ${isOpen ? css['open'] : ''} ${selectedItem ? css['selected'] : ''
					} ${error ? css['error'] : ''}`}
				type="button"
				{...getToggleButtonProps({
					disabled: disabledButton,
					id: props?.id,
				})}
			>
				<span
					className={`${css['select-item']} ${selectedItem ? css['selected-item'] : ''
						}`}
				>
					{selectedItem ? selectedItem.name : title}
				</span>
				<SelectArrowIcon
					style={{
						transform: `rotate(${isOpen ? 180 : 0}deg)`,
					}}
					className={css['arrow-icon']}
				/>
			</button>
			{isOpen && (
				<ul
					className={`${css['list']} ${isOpen ? css['list-open'] : ''
						}`}
					{...getMenuProps()}
				>
					{items.map((item, index) => (
						<li
							className={`${css['item']} ${selectedItem === item ? css['item-active'] : ''
								}`}
							{...getItemProps({
								key: `${item.name}${index}`,
								index,
								item,
								style: {
									backgroundColor:
										highlightedIndex === index
											? '#ed36c4'
											: 'white',
								},
							})}
						>
							{item.name}
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

export default SelectInput;
