import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className='not-found'>
      <div className='not-found__info'>
        <p className='not-found__paragraph'>404</p>
        <h1 className='not-found__heading'>Страница не найдена</h1>
      </div>
      <Link to='/movies' className='not-found__link'>
        Назад
      </Link>
    </div>
  );
}

export default NotFound;
