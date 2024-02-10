import React, { ComponentProps } from 'react';
import { ActivityInfo } from '../../../../../../../lib/constants/activitites';
import WarningIcon from '../../../../../atoms/Icons/WarningIcon';
import PhotoInput from '../../../../Inputs/PhotoInput';
import VideoInput from '../../../../Inputs/VideoInput';
import css from './index.module.css';

export type ActivityPhoto = {
	name: string;
	photo: File;
};

type Props = ComponentProps<'div'> & {
	setVideo: (state: string) => void;
	video: string;
	setPhotos: (state: ActivityPhoto[]) => void;
	photos: ActivityPhoto[];
	info: ActivityInfo;
};

const MediaUpload = ({
	setVideo,
	setPhotos,
	video,
	photos,
	className,
	info,
	...props
}: Props) => {
	const onPhotoChange = (data: ActivityPhoto) => {
		if (data && data.photo && !photos) {
			setPhotos([data]);
		} else if (
			data &&
			data?.photo &&
			photos &&
			photos?.length > 0 &&
			photos?.length <= 3
		) {
			setPhotos([...photos, data]);
		} else if (photos && !data?.photo && photos?.length > 1) {
			setPhotos(photos?.filter((el) => el?.name !== data?.name));
		} else if (photos && !data?.photo && photos?.length <= 1) {
			setPhotos(null);
		} else {
			setPhotos(null);
		}
	};

	return (
		<div
			className={`${css['wrapper']} ${className ? className : ''}`}
			{...props}
		>
			<h3 className={css['title']}>
				4. Подтвердите свои достижения, загрузив фото/скрин/видео
				тренировки
			</h3>
			<p className={css['requirements']}>
				Размер фото не более 3 Мбайт, размер видео не более 20 Мбайт
			</p>
			{info?.about && (
				<div className={css['info-wrapper']}>
					<WarningIcon />
					<div className={css['info-items']}>
						{info?.about?.map((el, idx) => (
							<article
								className={css['info']}
								key={`${el?.title}${idx}`}
							>
								<h4 className={css['info-title']}>
									{el?.title}
								</h4>
								<p className={css['info-description']}>
									{el?.description}
								</p>
							</article>
						))}
					</div>
				</div>
			)}
			<div className={css['media']}>
				<div className={css['photos']}>
					<PhotoInput
						name="first_photo"
						type="file"
						accept="image/*"
						hideLabelOnPreview
						handleChange={(f) =>
							onPhotoChange({ name: 'first_photo', photo: f })
						}
						label="Загрузите скрин/фото"
						containerClass={css['photo']}
						previewSize={{
							width: 185,
							height: 132,
						}}
					/>
					{((photos && photos?.length >= 1) ||
						photos?.find((el) => el?.name === 'second_photo')) && (
						<PhotoInput
							name="second_photo"
							type="file"
							accept="image/*"
							hideLabelOnPreview
							handleChange={(f) =>
								onPhotoChange({
									name: 'second_photo',
									photo: f,
								})
							}
							label="Загрузите скрин/фото"
							containerClass={css['photo']}
							previewSize={{
								width: 185,
								height: 132,
							}}
						/>
					)}
					{((photos && photos?.length >= 2) ||
						photos?.find((el) => el?.name === 'third_photo')) && (
						<PhotoInput
							name="third_photo"
							type="file"
							accept="image/*"
							hideLabelOnPreview
							handleChange={(f) =>
								onPhotoChange({ name: 'third_photo', photo: f })
							}
							label="Загрузите скрин/фото"
							containerClass={css['photo']}
							previewSize={{
								width: 185,
								height: 132,
							}}
						/>
					)}
				</div>

				<VideoInput
					setValue={setVideo}
					video={video}
					label="Загрузите видео"
					accept="video/*"
					containerClass={css['video']}
				/>
			</div>
		</div>
	);
};

export default MediaUpload;
