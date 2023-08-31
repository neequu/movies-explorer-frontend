import AuthFormItem from './item/AuthFormItem';
import useValidate from 'utils/useValidate.js';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

function AuthForm({ authorize }) {
  const { values, error, handleChange } = useValidate();

  const handleSubmit = (e) => {
    e.preventDefault();
    authorize();
  };

  // button
  const { pathname } = useLocation();

  function getAuthTextContent() {
    const info = { caption: '', linkText: '', linkPath: '', buttonText: '' };
    if (pathname === '/signup') {
      info.caption = 'Уже зарегистрированы?';
      info.linkText = 'Войти';
      info.linkPath = '/signin';
      info.buttonText = 'Зарегистрироваться';
      return info;
    }
    info.caption = 'Ещё не зарегистрированы?';
    info.linkText = 'Регистрация';
    info.linkPath = '/signup';
    info.buttonText = 'Войти';
    return info;
  }

  const { caption, linkText, linkPath, buttonText } = getAuthTextContent();

  const [dis, setDis] = useState(true);

  const formInputs = useRef(null);
  useEffect(() => {
    if (!Object.entries(error).length) return;
    const allValid = [...formInputs.current.elements].every(
      (input) => input.validity.valid
    );
    setDis(!allValid);
  }, [error]);

  return (
    <form id='auth-form' className='auth-form' onSubmit={handleSubmit}>
      <fieldset ref={formInputs} className='auth-form__container'>
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
        {pathname === '/signup' && (
          <AuthFormItem
            onChange={handleChange}
            errorMsg={error.password}
            value={values.password || ''}
            label='Пароль'
            type='password'
            name='password'
            required
            minLength={5}
            autoComplete='current-password'
            placeholder='Пароль'
          />
        )}
      </fieldset>
      <div className='auth-form__footer'>
        <button
          type='submit'
          className={`auth-form__button ${
            dis ? 'auth-form__button_disabled' : ''
          }`}
          disabled={dis}>
          {buttonText}
        </button>
        <span className='auth-form__caption'>
          {caption}
          <NavLink to={linkPath} className='auth-form__link'>
            {linkText}
          </NavLink>
        </span>
      </div>
    </form>
  );
}

export default AuthForm;
