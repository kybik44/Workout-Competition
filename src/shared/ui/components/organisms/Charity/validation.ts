import { REQUIRED_FIELD_MESSAGE } from './../../../../lib/constants/validation';
import * as yup from 'yup';

export type CharityInputs = {
	points_number: number;
};

export const CharityValidationSchema = yup.object().shape({
	points_number: yup
		.number()
		.typeError('Введите значение')
		.positive('Введите положительное значение')
		.required(REQUIRED_FIELD_MESSAGE),
});
