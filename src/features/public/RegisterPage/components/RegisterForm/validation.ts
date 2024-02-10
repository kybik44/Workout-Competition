import * as yup from 'yup';
import {
	DOB_IS_NOT_VALID,
	EMAIL_IS_NOT_VALID_MESSAGE,
	PHONE_IS_NOT_VALID,
	REQUIRED_FIELD_MESSAGE,
} from '../../../../../shared/lib/constants/validation';

export type RegisterInputs = {
	first_name: string;
	last_name: string;
	third_name: string;
	email: string;
	password: string;
	team_id: string;
	phone_number: string;
	city: string;
	policy: boolean;
	avatar: File;
	birthday_day: string;
	birthday_month: string;
	birthday_year: string;
	member_of_previous_event: string | boolean;
	date_of_birth: string;
	gender: string;
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

export const RegisterValidationSchema = yup.object().shape({
	first_name: yup.string().required(REQUIRED_FIELD_MESSAGE),
	last_name: yup.string().required(REQUIRED_FIELD_MESSAGE),
	third_name: yup.string().required(REQUIRED_FIELD_MESSAGE),
	phone_number: yup
		.string()
		.trim()
		.required(REQUIRED_FIELD_MESSAGE)
		.matches(
			/^(\+7|)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm,
			{ message: PHONE_IS_NOT_VALID }
		),
	email: yup
		.string()
		.email(EMAIL_IS_NOT_VALID_MESSAGE)
		.required(REQUIRED_FIELD_MESSAGE),
	password: yup.string().required(REQUIRED_FIELD_MESSAGE),
	city: yup.string().required(REQUIRED_FIELD_MESSAGE),
	team_id: yup.string().required(REQUIRED_FIELD_MESSAGE),
	policy: yup.boolean().oneOf([true], REQUIRED_FIELD_MESSAGE),
	birthday_day: yup
		.string()
		.trim()
		.required(REQUIRED_FIELD_MESSAGE)
		.matches(/^(0[1-9]|[1-2][0-9]|(3)[0-1])$/gm, {
			message: DOB_IS_NOT_VALID,
		})
		.test('value', DOB_IS_NOT_VALID, function (value) {
			if (
				(value &&
					this.parent.birthday_month == '02' &&
					(value == '30' || value == '31')) ||
				((this.parent.birthday_month == '04' ||
					this.parent.birthday_month == '06' ||
					this.parent.birthday_month == '09' ||
					this.parent.birthday_month == '11') &&
					value == '31')
			) {
				return false;
			}
			return true;
		}),
	birthday_month: yup
		.string()
		.required(REQUIRED_FIELD_MESSAGE)
		.matches(/^(0[1-9]|1[012])$/gm, { message: DOB_IS_NOT_VALID }),
	birthday_year: yup
		.string()
		.required(REQUIRED_FIELD_MESSAGE)
		.matches(/^(19|20)\d{2}$/gm, { message: DOB_IS_NOT_VALID }),
	member_of_previous_event: yup
		.string()
		.nullable()
		.required(REQUIRED_FIELD_MESSAGE),
	gender: yup.string().nullable().required(REQUIRED_FIELD_MESSAGE),
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
