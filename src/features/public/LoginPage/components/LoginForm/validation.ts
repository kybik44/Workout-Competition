import * as yup from 'yup';
import { EMAIL_IS_NOT_VALID_MESSAGE } from '../../../../../shared/lib/constants/validation';
import { REQUIRED_FIELD_MESSAGE } from './../../../../../shared/lib/constants/validation';

export type LoginInputs = {
	email: string;
	password: string;
};

export const LoginValidationSchema = yup.object().shape({
	email: yup
		.string()
		.required(REQUIRED_FIELD_MESSAGE)
		.email(EMAIL_IS_NOT_VALID_MESSAGE),
	password: yup.string().required(REQUIRED_FIELD_MESSAGE),
});
