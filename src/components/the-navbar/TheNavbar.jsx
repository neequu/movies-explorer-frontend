import { NavLink } from 'react-router-dom';

function TheNavbar() {
  const auth = true;
  // const auth = false;

  const activeClass = ({ isActive }) =>
    `nav__link ${isActive ? 'nav__link_active' : ''}`;

  return (
    <nav className='nav'>
      <NavLink className={activeClass} to='/movies'>
        Фильмы
      </NavLink>

      <NavLink className={activeClass} to='/saved-movies'>
        Сохранённые фильмы
      </NavLink>
      <NavLink className={activeClass} to='/profile'>
        <span className='nav__link_account'>
          Аккаунт
          <button className='nav__icon'></button>
        </span>
      </NavLink>
    </nav>
  );
}

export default TheNavbar;
