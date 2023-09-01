import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ img, name }) {
  const [saved, setSaved] = useState(false);
  const handleClick = () => {
    setSaved((p) => !p);
  };

  const { pathname } = useLocation();

  return (
    <li className='movies-card'>
      <div className='movies-card__top'>
        <h2 className='movies-card__title'>В погоне за Бенкси</h2>
        <span className='movies-card__time'>0ч 42м</span>
      </div>
      <img loading='lazy' src={img} alt={name} className='movies-card__image' />
      {pathname === '/movies' && (
        <button
          type='button'
          onClick={handleClick}
          className={`movies-card__button ${
            saved ? 'movies-card__button_saved' : ''
          }`}>
          {!saved && <span>Сохранить</span>}
        </button>
      )}

      {pathname === '/saved-movies' && (
        <button
          type='button'
          onClick={handleClick}
          className='movies-card__button movies-card__button_remove'></button>
      )}
    </li>
  );
}

export default MoviesCard;
