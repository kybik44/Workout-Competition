import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import css from './index.module.css';

import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';
import { Controller, useForm } from 'react-hook-form';
import { signUp } from '../../../../../entities/modules/auth/api';
import { Team } from '../../../../../entities/types';
import FieldErrorMessage from '../../../../../shared/ui/components/atoms/FieldErrorMessage';
import ServerErrorMessage from '../../../../../shared/ui/components/atoms/ServerError';
import BirthdayInput from '../../../../../shared/ui/components/molecules/Inputs/BirthdayInput';
import CheckboxInput from '../../../../../shared/ui/components/molecules/Inputs/CheckboxInput';
import CityInput from '../../../../../shared/ui/components/molecules/Inputs/CityInput';
import PhotoInput from '../../../../../shared/ui/components/molecules/Inputs/PhotoInput';
import RadioInput from '../../../../../shared/ui/components/molecules/Inputs/RadioInput';
import SelectInput from '../../../../../shared/ui/components/molecules/Inputs/SelectInput';
import TextInput from '../../../../../shared/ui/components/molecules/Inputs/TextInput';
import { RegisterInputs, RegisterValidationSchema } from './validation';

const inputs = [
	'first_name',
	'last_name',
	'third_name',
	'email',
	'password',
	'team_id',
	'phone_number',
	'city',
	'policy',
	'avatar',
	'birthday_day',
	'birthday_month',
	'birthday_year',
	'member_of_previous_event',
	'date_of_birth',
	'gender',
];

type Props = {
	teams: Team[];
	setSuccess: (state: boolean) => void;
};

const RegisterForm = ({ teams, setSuccess }: Props) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setError,
	} = useForm({
		resolver: yupResolver(RegisterValidationSchema),
	});

	const [serverError, setServerError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState<boolean>(false);

	const onSubmit = (data: RegisterInputs) => {
		data.date_of_birth = `${data.birthday_year}-${data.birthday_month}-${data.birthday_day}`;
		data.member_of_previous_event === 'yes'
			? (data.member_of_previous_event = true)
			: (data.member_of_previous_event = false);
		const formData = new FormData();

		for (let key in data) {
			formData.append(`${key}`, data[key]);
		}

		const sendData = async (data) => {
			setServerError(null);
			try {
				setSubmitting(true);
				await signUp(data);
				setSuccess(true);
			} catch (error) {
				if (error && error.response) {
					const axiosError = error as AxiosError<any>;
					const data = axiosError.response.data;
					Object.keys(data)?.map((k) => {
						if (inputs?.includes(k?.toString())) {
							setError(k.toString(), {
								message: data[k],
								type: 'value',
							});
						} else {
							setServerError(data[k]);
						}
					});
				}
			} finally {
				setSubmitting(false);
			}
		};
		sendData(formData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={css['wrapper']}>
			<div className={css['routes']}>
				<Link href="/register">
					<a className={css['route-link']}>Регистрация</a>
				</Link>
				<Link href="/login">
					<a className={css['route-link']}>Вход</a>
				</Link>
			</div>
			<div className={css['fields']}>
				<TextInput
					register={register('first_name')}
					name="first_name"
					autoComplete="given-name"
					error={errors.first_name}
					type="text"
					label="Имя *"
					placeholder="Имя"
					containerClass={css['first-name']}
				/>
				<TextInput
					register={register('last_name')}
					name="last_name"
					error={errors.last_name}
					autoComplete="family-name"
					type="text"
					label="Фамилия *"
					placeholder="Фамилия"
					containerClass={css['last-name']}
				/>
				<TextInput
					register={register('third_name')}
					name="third_name"
					error={errors.last_name}
					autoComplete="additional-name"
					type="text"
					label="Отчество *"
					placeholder="Отчество"
					containerClass={css['middle-name']}
				/>
				<div className={css['birthday']}>
					<p className={css['field-label']}>Дата рождения *</p>
					<div className={css['birthday-fields']}>
						<BirthdayInput
							register={register('birthday_day')}
							error={errors['birthday_day']}
							name="birthday_day"
							type="text"
							maxLength={2}
							placeholder="ДД"
						/>
						<BirthdayInput
							register={register('birthday_month')}
							error={errors['birthday_month']}
							name="birthday_month"
							type="text"
							maxLength={2}
							placeholder="ММ"
						/>
						<BirthdayInput
							register={register('birthday_year')}
							error={errors['birthday_year']}
							name="birthday_year"
							type="text"
							maxLength={4}
							placeholder="ГГГГ"
						/>
					</div>
					{(errors['birthday_day'] ||
						errors['birthday_month'] ||
						errors['birthday_year'] ||
						errors['date_of_birth']) && (
						<FieldErrorMessage
							className={css['error-message']}
							msg={
								errors['birthday_day']
									? errors['birthday_day']?.message
									: errors['birthday_month']
									? errors['birthday_month']?.message
									: errors['date_of_birth']
									? errors['date_of_birth']?.message
									: errors['birthday_year']?.message
							}
						/>
					)}
				</div>
				{teams && (
					<Controller
						control={control}
						name="team_id"
						render={({
							field: { onChange },
							fieldState: { error },
						}) => (
							<SelectInput
								title="Выберите подразделение"
								items={teams
									?.sort((a, b) => b?.id - a?.id)
									?.map((t) => {
										return { value: t?.id, name: t?.name };
									})}
								onItemChange={onChange}
								error={error}
								id="team"
								label="Подразделение *"
								className={css['team']}
							/>
						)}
					/>
				)}
				<Controller
					control={control}
					name="city"
					defaultValue=""
					render={({ field: { onChange, onBlur } }) => (
						<CityInput
							type="text"
							autoComplete="off"
							placeholder="Москва"
							onBlur={onBlur}
							error={errors.city}
							onChange={(v) => onChange(v)}
							containerClass={css['city']}
						/>
					)}
				/>
				<div className={css['gender']}>
					<p className={css['field-label']}>Ваш пол *</p>
					<div className={css['gender-fields']}>
						<RadioInput
							register={register('gender')}
							label="мужской"
							value={'male'}
						/>
						<RadioInput
							register={register('gender')}
							label="женский"
							value={'female'}
						/>
					</div>
					{errors['gender'] && (
						<FieldErrorMessage
							className={css['error-message']}
							msg={errors['gender']?.message}
						/>
					)}
				</div>
				<div className={css['participation']}>
					<p className={css['field-label']}>
						Вы были участником “Марафон ЧемпиON 2021”? *
					</p>
					<div className={css['participation-fields']}>
						<RadioInput
							register={register('member_of_previous_event')}
							label="да"
							value={'yes'}
						/>
						<RadioInput
							register={register('member_of_previous_event')}
							label="нет"
							value={'no'}
						/>
					</div>
					{errors['member_of_previous_event'] && (
						<FieldErrorMessage
							className={css['error-message']}
							msg={errors['member_of_previous_event']?.message}
						/>
					)}
				</div>
				<TextInput
					register={register('phone_number')}
					type="tel"
					name="phone_number"
					label="Телефон *"
					error={errors.phone_number}
					autoComplete="tel"
					placeholder="+ 7 911 123-45-67"
					containerClass={css['phone']}
				/>
				<TextInput
					register={register('email')}
					type="email"
					name="email"
					autoComplete="email"
					error={errors['email']}
					label="Email *"
					placeholder="jane.doe@gmail.com"
					containerClass={css['email']}
				/>
				<TextInput
					register={register('password')}
					type="password"
					name="password"
					error={errors.password}
					label="Пароль"
					placeholder="........"
					containerClass={css['password']}
					autoComplete="new-password"
				/>
				<Controller
					control={control}
					name="avatar"
					defaultValue={null}
					render={({
						field: { onBlur, onChange },
						fieldState: { error },
					}) => (
						<PhotoInput
							accept="image/*"
							onBlur={onBlur}
							type="file"
							handleChange={(v) => onChange(v)}
							error={error}
							containerClass={css['avatar']}
							label="Загрузите Ваше фото*"
						/>
					)}
				/>
			</div>
			<CheckboxInput
				register={register('policy')}
				name="policy"
				error={errors.policy}
				containerClass={css['policy']}
				label={
					<p className={css['policy-text']}>
						Я принимаю условия{' '}
						<a
							href="https://docs.google.com/document/d/11w9vA9e7frR5VT91l0dbniLGCuA6V0NL/edit?usp=sharing&ouid=110332792085176317184&rtpof=true&sd=true"
							target="_blank"
						>
							соглашения об обработке персональных данных *
						</a>
					</p>
				}
			/>
			{serverError ? <ServerErrorMessage msg={serverError} /> : null}
			<button
				disabled={submitting}
				type="submit"
				className={css['submit-button']}
			>
				{submitting ? 'Регистрация...' : 'Зарегистрироваться'}
			</button>
		</form>
	);
};

export default RegisterForm;
