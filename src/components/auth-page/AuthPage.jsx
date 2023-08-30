import logo from 'assets/logo.svg';
import AuthForm from 'components/auth-form/AuthForm';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function AuthPage({ children, heading }) {
  const { pathname } = useLocation();

  function getData() {
    if (pathname === '/sign-up') {
      const caption = 'Уже зарегистрированы?';
      const linkText = 'Войти';
      const linkPath = '/sign-in';
      const buttonText = 'Зарегистрироваться';
      return { caption, linkText, linkPath, buttonText };
    }
    const caption = 'Ещё не зарегистрированы?';
    const linkText = 'Регистрация';
    const linkPath = '/sign-up';
    const buttonText = 'Войти';
    return { caption, linkText, linkPath, buttonText };
  }

  const data = getData();

  const [dis, setDis] = useState(true);

  return (
    <div className='auth'>
      <div className='auth__container'>
        <div className='auth__main'>
          <img
            className='auth__logo'
            src={logo}
            loading='lazy'
            alt='moovees logo'
          />
          <h1 className='auth__heading'>{heading}</h1>
          {/* {children} */}
          <AuthForm setDis={setDis} />
        </div>
        <div className='auth__footer'>
          <button className='auth__button' disabled={dis}>
            {data.buttonText}
          </button>
          <span className='auth__caption'>
            {data.caption}
            <NavLink to={data.linkPath} className='auth__link'>
              {data.linkText}
            </NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
