import React, { Dispatch, FC, SetStateAction, useRef } from 'react';
import css from './index.module.css';

type Props = {
	loading: boolean;
	handleFile: (file: File, preview: string) => void;
	fileMaxSize?: number;
	setUploadError: Dispatch<SetStateAction<string>>;
};

const UploadButton: FC<Props> = ({
	loading,
	handleFile,
	fileMaxSize = 5000000, //5MB as a default value
	setUploadError,
}) => {
	const hiddenFileInput = useRef<HTMLInputElement>(null);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		hiddenFileInput.current.click();
	};

	const onChangeAsFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files[0];
		if (file.size > fileMaxSize) {
			setUploadError("It's too big");
			hiddenFileInput.current.value = '';
		} else {
			const preview = URL.createObjectURL(file);
			handleFile(file, preview);
		}
	};

	return (
		<>
			<button
				type="button"
				className={css['upload']}
				onClick={handleClick}
			>
				{!loading ? 'Загрузить фото' : 'Загрузка...'}
			</button>
			<input
				type="file"
				ref={hiddenFileInput}
				onChange={(e) => onChangeAsFile(e)}
				style={{ display: 'none' }}
				name={'image_upload'}
			/>
		</>
	);
};

export default UploadButton;
