import logo from 'assets/logo.svg';
import { Link, useLocation } from 'react-router-dom/dist';
import TheNavbar from 'components/the-navbar/TheNavbar';

function TheHeader({ changeActive, auth }) {
  const { pathname } = useLocation();
  return (
    <header className='header'>
      <div
        className={`header__container ${
          pathname === '/' ? 'header__container_accent' : ''
        }`}>
        <Link className='header__link header__link_bright' to='/'>
          <img
            className='header__logo'
            src={logo}
            loading='lazy'
            alt='moovees logo'
          />
        </Link>

        {auth ? (
          <>
            <button
              onClick={changeActive}
              className='header__mobile-nav-toggle'
              aria-controls='primary-navigation'>
              <span className='sr-only' aria-expanded='false'>
                Menu
              </span>
            </button>
            <TheNavbar />
          </>
        ) : (
          <>
            <div className='header__link-container'>
              <Link className='header__link' to='/signup'>
                Регистрация
              </Link>
              <Link className='header__link header__link_green' to='/signin'>
                Войти
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default TheHeader;