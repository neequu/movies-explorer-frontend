import { useState } from 'react';
import { useLocation } from 'react-router-dom';

function MoviesCard({ img, name }) {
  const [saved, setSaved] = useState(false);
  const handleClick = () => {
    setSaved((p) => !p);
  };

  const { pathname } = useLocation();

  return (
    <div className='movies-card'>
      <div className='movies-card__top'>
        <p className='movies-card__title'>В погоне за Бенкси</p>
        <span className='movies-card__time'>0ч 42м</span>
      </div>
      <img loading='lazy' src={img} alt={name} className='movies-card__image' />
      {pathname === '/movies' && (
        <button
          onClick={handleClick}
          className={`movies-card__button ${
            saved ? 'movies-card__button_saved' : ''
          }`}>
          {!saved && <span>Сохранить</span>}
        </button>
      )}

      {pathname === '/saved-movies' && (
        <button
          onClick={handleClick}
          className='movies-card__button movies-card__button_remove'></button>
      )}
    </div>
  );
}

export default MoviesCard;
