import AuthForm from 'components/auth-form/AuthForm';
import AuthPage from 'components/auth-page/AuthPage';

function Login({ authorize }) {
  return (
    <AuthPage heading='Рады видеть!'>
      <AuthForm authorize={authorize} />
    </AuthPage>
  );
}

export default Login;
