import AuthFormItem from './item/AuthFormItem';
import useValidate from 'utils/useValidate.js';

function AuthForm({ children, setDis }) {
  const { values, error, handleChange } = useValidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // onSubmit(values);
  };

  if (Object.values(error).some((x) => !!x)) {
    setDis(true);
  } else {
    setDis(false);
  }

  return (
    <form className='auth-form' onSubmit={handleSubmit}>
      <AuthFormItem
        onChange={handleChange}
        errorMsg={error.name}
        value={values.name || ''}
        label='Имя'
        name='name'
        type='text'
        required
        minLength={2}
        autoComplete='username'
        placeholder='Имя'
      />
      <AuthFormItem
        onChange={handleChange}
        errorMsg={error.email}
        value={values.email || ''}
        label='E-mail'
        type='email'
        name='email'
        required
        autoComplete='email'
        placeholder='E-mail'
      />
      {children}
    </form>
  );
}

export default AuthForm;
