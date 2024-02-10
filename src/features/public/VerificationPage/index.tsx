import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { sendEmailToken } from '../../../entities/modules/auth/api';
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import AuthLayout from '../../../shared/ui/components/layouts/AuthLayout';
import css from './index.module.css';

type Props = {
	token: string;
};

const VerificationPage = ({ token }: Props) => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const [serverError, setServerError] = useState<string>(undefined);

	useEffect(() => {
		const verifyUserByEmail = async (token: string) => {
			try {
				setLoading(true);
				await sendEmailToken(token);
				await router.push('/login');
			} catch (error) {
				router.replace(`/register`);
			} finally {
				setLoading(false);
			}
		};

		verifyUserByEmail(token);
	}, [router]);

	return (
		<PublicTemplateGeneric title="Подтверждение">
			<AuthLayout type="auth">
				<div className={css['wrapper']}>
					<span>Подтверждение...</span>
				</div>
			</AuthLayout>
		</PublicTemplateGeneric>
	);
};

export default VerificationPage;
