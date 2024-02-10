import * as yup from 'yup';
import { EMAIL_IS_NOT_VALID_MESSAGE } from '../../../shared/lib/constants/validation';
import { REQUIRED_FIELD_MESSAGE } from './../../../shared/lib/constants/validation';

export type ResetInputs = {
	email: string;
};

export const ResetValidationScheme = yup.object().shape({
	email: yup
		.string()
		.email(EMAIL_IS_NOT_VALID_MESSAGE)
		.required(REQUIRED_FIELD_MESSAGE),
});
