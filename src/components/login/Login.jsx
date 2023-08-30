import AuthForm from '../auth-form/AuthForm';
import AuthPage from '../auth-page/AuthPage';

function Login() {
  return (
    <AuthPage heading='Рады видеть!'>
      <AuthForm />
    </AuthPage>
  );
}

export default Login;
