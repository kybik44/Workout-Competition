import React, { FC, useEffect, useRef, useState } from 'react';
import { FieldError } from 'react-hook-form';
import FieldErrorMessage from '../../../atoms/FieldErrorMessage';
import BasketIcon from '../../../atoms/Icons/BasketIcon';
import PlusIcon from '../../../atoms/Icons/PlusIcon';
import css from './index.module.css';

type Props = React.ComponentProps<'input'> & {
	error?: FieldError | any;
	handleChange: (v: File | null) => void;
	containerClass?: string;
	label?: string | JSX.Element;
	file?: File | null;
	previewSize?: {
		width: number;
		height: number;
	};
	hideLabelOnPreview?: boolean;
};

const PhotoInput: FC<Props> = ({
	error,
	onChange,
	handleChange,
	containerClass,
	label,
	file,
	previewSize,
	hideLabelOnPreview,
	...props
}) => {
	const hiddenFileInput = useRef(null);
	const [preview, setPreview] = useState<string>(null);

	useEffect(() => {
		file && setPreview(URL.createObjectURL(file));
	}, [file]);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		hiddenFileInput.current.childNodes[1].click();
	};

	const onChangeAsFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		let reader = new FileReader();
		const file = e.target.files[0];
		const preview = URL.createObjectURL(file);
		preview && setPreview(preview);
		reader.readAsDataURL(file);
		handleChange(file);
	};

	const removePhoto = () => {
		hiddenFileInput.current.childNodes[1].value = '';
		handleChange(null);
		setPreview(null);
	};

	return (
		<div
			ref={hiddenFileInput}
			className={`${css['wrapper']} ${containerClass ? containerClass : ''
				}`}
		>
			<div className={css['head']}>
				{label && (
					<span
						className={`${css['title']} ${preview && hideLabelOnPreview
							? css['hide']
							: preview
								? css['title-disabled']
								: ''
							}`}
					>
						{label}
					</span>
				)}
				{preview && (
					<button
						className={`${css['remove-img']}`}
						onClick={removePhoto}
					>
						<BasketIcon />
					</button>
				)}
			</div>
			<input
				style={{ display: 'none' }}
				onChange={(e) => onChangeAsFile(e)}
				{...props}
			/>
			<div className={css['inner']}>
				{!preview && (
					<button
						type="button"
						onClick={handleClick}
						className={css['upload-btn']}
					>
						<div className={css['plus']}>
							<PlusIcon />
						</div>
					</button>
				)}
				{preview && (
					<img
						src={preview}
						alt="Preview"
						width={previewSize?.width ? previewSize?.width : 314}
						height={previewSize?.height ? previewSize?.height : 224}
						loading="lazy"
						className={css['preview']}
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

export default PhotoInput;
