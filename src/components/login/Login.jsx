import AuthForm from 'components/auth-form/AuthForm';
import AuthPage from 'components/auth-page/AuthPage';

function Login({ handleLogin, error }) {
  return (
    <AuthPage heading='Рады видеть!'>
      <AuthForm handleSubmit={handleLogin} responseError={error} />
    </AuthPage>
  );
}

export default Login;
