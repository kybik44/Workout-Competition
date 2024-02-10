import React, { useEffect, useRef, useState } from 'react';
import { getVideoUrls, sendParts } from '../../../../../api/profile';
import { TOKEN_KEY } from '../../../../../lib/constants/global';
import { getVideoParts } from '../../../../../lib/utils/getVideoParts';
import storage from '../../../../../lib/utils/storage';
import BasketIcon from '../../../atoms/Icons/BasketIcon';
import PlusIcon from '../../../atoms/Icons/PlusIcon';
import css from './index.module.css';

type Props = React.ComponentProps<'input'> & {
	setValue: (state: string) => void;
	video: string;
	label?: string;
	containerClass?: string;
};

const VideoInput = ({
	setValue,
	video,
	label,
	containerClass,
	...props
}: Props) => {
	const hiddenFileInput = useRef(null);
	const [upload, setUpload] = useState<boolean>(false);
	const [uploadError, setUploadError] = useState<string>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [file, setFile] = useState<File | null>(null);

	const uploadParts = async (
		file: File,
		urls: Record<number, string>,
		size: number,
		key: string,
		upload_id: string,
		inputRef: React.MutableRefObject<any>
	) => {
		const reader = new FileReader();
		reader.onload = async () => {
			try {
				const parts = await getVideoParts(reader.result, size, urls);
				const { data } = await sendParts(
					key,
					upload_id,
					parts,
					storage.get(TOKEN_KEY)
				);
				setUpload(true);
				setValue(data.url);
				setFile(file);
				setLoading(false);
			} catch (error) {
				inputRef.current.value = '';
				setLoading(false);
				setUploadError('Не удалось загрузить файл, попробуйте позже');
			}
		};
		reader.readAsArrayBuffer(file);
	};

	useEffect(() => {
		video && setUpload(true);
	}, []);

	const handleClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();
		hiddenFileInput.current.click();
	};

	const onChangeAsFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
		setUploadError(null);
		const regex = /.*\.(mp4|3gp|mkv|avi|mov|hevc)$/gim;
		const file = e.target.files[0];
		const parts_num = Math.ceil(file.size / (10 * 1048576));
		const extension = /[.]/.exec(file.name)
			? /[^.]+$/.exec(file.name)[0]
			: undefined;
		if (
			file.size < 150 * 1048576 &&
			regex.test(file.name.toLocaleLowerCase())
		) {
			try {
				setLoading(true);
				const { data } = await getVideoUrls(
					parts_num,
					extension,
					storage.get(TOKEN_KEY)
				);
				await uploadParts(
					file,
					data.urls,
					10 * 1048576,
					data.key,
					data.upload_id,
					hiddenFileInput
				);
			} catch (error) {
				setLoading(false);
				hiddenFileInput.current.value = '';

				setUploadError('Не удалось загрузить файл, попробуйте позже');
			}
		} else {
			if (file.size > 150 * 1048576) {
				setUploadError(
					'Видео слишком большое, максимальный размер видео 200мб'
				);
				hiddenFileInput.current.value = '';
			} else if (!regex.test(file.name.toLocaleLowerCase())) {
				setUploadError('Неподдерживаемый формат видео');
				hiddenFileInput.current.value = '';
			}
		}
	};

	const removeFile = () => {
		hiddenFileInput.current.value = '';
		setUpload(false);
		setValue(null);
		setFile(null);
	};

	return (
		<div
			className={`${css['wrapper']} ${containerClass ? containerClass : ''
				}`}
		>
			{!upload && !loading && label && (
				<p className={css['label']}>{label}</p>
			)}
			{!upload && !loading && (
				<button
					className={`${css['upload-btn']}`}
					onClick={handleClick}
				>
					<div className={css['plus']}>
						<PlusIcon />
					</div>
				</button>
			)}
			{upload && !loading && (
				<div className={css['upload-info']}>
					<p className={css['title']}>{file?.name}</p>
					<button className={css['remove']} onClick={removeFile}>
						<BasketIcon />
					</button>
				</div>
			)}
			<input
				type="file"
				ref={hiddenFileInput}
				style={{ display: 'none' }}
				onChange={(e) => onChangeAsFile(e)}
				{...props}
			/>
			{loading && !uploadError && (
				<p className="regular-text">Загрузка...</p>
			)}
			{uploadError && (
				<p className={`regular-text ${css['error']}`}>{uploadError}</p>
			)}
		</div>
	);
};

export default VideoInput;
