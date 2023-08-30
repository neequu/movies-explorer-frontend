import AuthForm from '../auth-form/AuthForm';
import AuthFormItem from '../auth-form/item/AuthFormItem';
import AuthPage from '../auth-page/AuthPage';
import validate from '../../utils/useValidate.js';

function Register() {
  const { values, error, handleChange } = validate();

  return (
    <>
      <AuthPage heading='Добро пожаловать!'>
        <AuthForm>
          <AuthFormItem
            onChange={handleChange}
            errorMsg={error.password}
            value={values.email || ''}
            label='Пароль'
            type='password'
            name='password'
            required
            minLength={5}
            autoComplete='current-password'
            placeholder='Пароль'
          />
        </AuthForm>
      </AuthPage>
    </>
  );
}

export default Register;
