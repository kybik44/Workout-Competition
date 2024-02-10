import { REQUIRED_FIELD_MESSAGE } from './../../../shared/lib/constants/validation';
import * as yup from 'yup';

export type NewPasswordInputs = {
	password: string;
	password_repeat: string;
};

export const NewPasswordValidationScheme = yup.object().shape({
	password: yup.string().required(REQUIRED_FIELD_MESSAGE),
	password_repeat: yup
		.string()
		.required(REQUIRED_FIELD_MESSAGE)
		.oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
});
