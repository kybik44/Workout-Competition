import * as yup from 'yup';
import { REQUIRED_FIELD_MESSAGE } from '../../../../../lib/constants/validation';

export type ChangeAvatarInputs = {
	avatar: File;
};

const image_formats = [
	'image/webp',
	'image/gif',
	'image/heif',
	'image/jpeg',
	'image/jpg',
	'image/bmp',
	'image/png',
];

export const ChangeAvatarValidationSchema = yup.object().shape({
	avatar: yup
		.mixed<File>()
		.nullable()
		.required(REQUIRED_FIELD_MESSAGE)
		.test(
			'fileSize',
			'Файл слишком большой, загрузите файл до 5МБ',
			(value) => value && value.size <= 5000000
		)
		.test(
			'fileFormat',
			'Неподдерживаемый формат изображения',
			(value) => value && image_formats.includes(value.type)
		),
});
