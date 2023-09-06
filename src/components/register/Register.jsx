import AuthForm from 'components/auth-form/AuthForm';
import AuthPage from 'components/auth-page/AuthPage';

function Register({ handleRegister, error }) {
  return (
    <>
      <AuthPage heading='Добро пожаловать!'>
        <AuthForm handleSubmit={handleRegister} responseError={error} />
      </AuthPage>
    </>
  );
}

export default Register;
