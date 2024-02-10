
import PublicTemplateGeneric from '../../../shared/templates/PublicTemplateGeneric';
import AuthLayout from '../../../shared/ui/components/layouts/AuthLayout';
import LoginForm from './components/LoginForm';

const LoginPage = () => {
	return (
		<PublicTemplateGeneric title="Вход">
			<AuthLayout type="auth">
				<LoginForm />
			</AuthLayout>
		</PublicTemplateGeneric>
	);
};

export default LoginPage;
