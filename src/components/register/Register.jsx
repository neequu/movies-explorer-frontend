import AuthForm from 'components/auth-form/AuthForm';
import AuthPage from 'components/auth-page/AuthPage';

function Register({ authorize }) {
  return (
    <>
      <AuthPage heading='Добро пожаловать!'>
        <AuthForm authorize={authorize} />
      </AuthPage>
    </>
  );
}

export default Register;
