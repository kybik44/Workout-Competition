import { useState } from 'react';
import css from './index.module.css';

import { Team } from '../../../entities/types';
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import AuthLayout from '../../../shared/ui/components/layouts/AuthLayout';
import RegisterForm from './components/RegisterForm';

type Props = {
	teams: Team[];
};

const RegisterPage = ({ teams }: Props) => {
	const [success, setSuccess] = useState<boolean>(false);
	return (
		<PublicTemplateGeneric title="Регистрация">
			<AuthLayout type="register">
				{!success && (
					<RegisterForm setSuccess={setSuccess} teams={teams} />
				)}
				{success && (
					<div className={css['success-wrapper']}>
						<h1 className={css['title']}>Поздравляем!</h1>
						<p className={css['text']}>
							Теперь вы участник марафона!
						</p>
						<p className={css['text']}>
							Пройдите по ссылке, отправленной на Ваш{' '}
							<span>e-mail</span>, чтобы завершить регистрацию и
							войти в систему.
						</p>
					</div>
				)}
			</AuthLayout>
		</PublicTemplateGeneric>
	);
};

export default RegisterPage;
