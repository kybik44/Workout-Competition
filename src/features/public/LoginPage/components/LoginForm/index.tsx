import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import css from './index.module.css';

import Link from 'next/link';
import {
	AuthContext,
	getMe,
	signIn,
} from '../../../../../entities/modules/auth';
import { SignInData } from '../../../../../entities/modules/auth/types';
import { TOKEN_KEY } from '../../../../../shared/lib/constants/global';
import storage from '../../../../../shared/lib/utils/storage';
import ServerErrorMessage from '../../../../../shared/ui/components/atoms/ServerError';
import TextInput from '../../../../../shared/ui/components/molecules/Inputs/TextInput';
import { LoginInputs, LoginValidationSchema } from './validation';

const LoginForm = () => {
	const router = useRouter();
	const { setAuth } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<LoginInputs>({
		resolver: yupResolver(LoginValidationSchema),
	});
	const [serverError, setServerError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const onSubmit = (data: LoginInputs) => {
		const sendData = async (data: SignInData) => {
			setServerError(null);
			try {
				setSubmitting(true);
				const { data: user } = await signIn(data);
				const { data: me } = await getMe(user.token);
				await storage.set(TOKEN_KEY, user.token);
				await setAuth(me);
				await router.replace('/home');
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

		sendData({ username: data.email, password: data.password });
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={css['wrapper']}>
			<div className={css['routes']}>
				<Link href="/login">
					<a className={css['route-link']}>Вход</a>
				</Link>
				<Link href="/register">
					<a className={css['route-link']}>Регистрация</a>
				</Link>
			</div>
			<div className={css['fields']}>
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
				<TextInput
					register={register('password')}
					name="password"
					type="password"
					autoComplete="current-password"
					error={errors['password']}
					label="Пароль *"
					placeholder="........"
				/>
			</div>

			<button
				disabled={submitting}
				type="submit"
				className={css['submit-button']}
			>
				{submitting ? 'Авторизация...' : 'Войти'}
			</button>
			<Link href="/reset">
				<a className={css['reset-link']}>Не помню пароль</a>
			</Link>
			{serverError ? (
				<ServerErrorMessage
					className={css['error']}
					msg={serverError}
				/>
			) : null}
		</form>
	);
};

export default LoginForm;
