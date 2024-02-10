import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPasswordRequest } from '../../../entities/modules/auth/api';
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import ServerErrorMessage from '../../../shared/ui/components/atoms/ServerError';
import AuthLayout from '../../../shared/ui/components/layouts/AuthLayout';
import TextInput from '../../../shared/ui/components/molecules/Inputs/TextInput';
import css from './index.module.css';
import { ResetInputs, ResetValidationScheme } from './validation';

const ResetPage = () => {
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(ResetValidationScheme),
	});

	const onSubmit = async (data: ResetInputs) => {
		setServerError(null);
		try {
			setSubmitting(true);
			await resetPasswordRequest(data);
			setSuccess(true);
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setServerError(data[Object.keys(data)[0]]);
			}
		} finally {
			setSubmitting(false);
		}
	};
	return (
		<PublicTemplateGeneric title="Сброс пароля">
			<AuthLayout type="auth">
				{!success && (
					<form
						className={css['wrapper']}
						onSubmit={handleSubmit(onSubmit)}
					>
						<h1 className={css['title']}>Сброс пароля</h1>
						<TextInput
							register={register('email')}
							name="email"
							inputMode="email"
							type="email"
							autoComplete="email"
							error={errors['email']}
							label="Email *"
							placeholder="jane.doe@gmail.com"
						/>
						<button
							disabled={submitting}
							className={css['submit-button']}
						>
							{submitting ? 'Отправка...' : 'Отправить'}
						</button>
						{serverError && (
							<ServerErrorMessage
								className={css['error']}
								msg={serverError}
							/>
						)}
					</form>
				)}
				{success && (
					<div className={css['success-wrapper']}>
						<h1 className={css['success-title']}>
							Письмо отправлено!
						</h1>
						<p className={css['success-text']}>
							Письмо для сброса пароля отправлено на Ваш{' '}
							<span>e-mail</span>, если письма нет - проверьте
							папку “Спам”.
						</p>
					</div>
				)}
			</AuthLayout>
		</PublicTemplateGeneric>
	);
};

export default ResetPage;
