import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { resetPassword } from '../../../entities/modules/auth/api';
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import ServerErrorMessage from '../../../shared/ui/components/atoms/ServerError';
import AuthLayout from '../../../shared/ui/components/layouts/AuthLayout';
import TextInput from '../../../shared/ui/components/molecules/Inputs/TextInput';
import css from './index.module.css';
import { NewPasswordInputs, NewPasswordValidationScheme } from './validation';

type Props = {
	token: string;
};

const NewPasswordPage = ({ token }: Props) => {
	const [success, setSuccess] = useState<boolean>(false);
	const [submitting, setSubmitting] = useState<boolean>(false);
	const [serverError, setServerError] = useState<string | null>(null);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(NewPasswordValidationScheme),
	});

	const onSubmit = async (data: NewPasswordInputs) => {
		setServerError(null);
		try {
			setSubmitting(true);
			await resetPassword({ token: token, password: data.password });
			setSuccess(true);
		} catch (error) {
			if (error && error.response) {
				const axiosError = error as AxiosError<any>;
				const data = axiosError.response.data;
				setServerError(data[Object.keys(data)[0]]);
			}
		} finally {
			setSubmitting(true);
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
						<h1 className={css['title']}>Ввод нового пароля</h1>
						<TextInput
							register={register('password')}
							name="password"
							type="password"
							autoComplete="current-password"
							error={errors['password']}
							label="Новый пароль *"
							placeholder="........"
							containerClass={css['password']}
						/>
						<TextInput
							register={register('password_repeat')}
							name="password_repeat"
							type="password"
							error={errors['password_repeat']}
							label="Повторите пароль *"
							placeholder="........"
						/>
						<button
							disabled={submitting}
							type="submit"
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
							Пароль успешно изменен!
						</h1>
						<button
							type="button"
							onClick={() => router.push('/login')}
							className={css['submit-button']}
						>
							Продолжить
						</button>
					</div>
				)}
			</AuthLayout>
		</PublicTemplateGeneric>
	);
};

export default NewPasswordPage;
