import { useState } from 'react';
import { Link } from 'react-router-dom';

function Profile() {
  const [isEditing, setEditing] = useState(false);

  return (
    <div className='profile'>
      <div className='profile__container'>
        <div>
          <h1 className='profile__heading'>Привет, Виталий!</h1>
          <div className='profile__content'>
            <div className='profile__item'>
              <p className='profile__paragraph'>Имя</p>
              <p className='profile__paragraph'>Виталий</p>
            </div>
            <div className='profile__item'>
              <p className='profile__paragraph'>E-mail</p>
              <p className='profile__paragraph'>pochta@yandex.ru</p>
            </div>
          </div>
        </div>
        <div className='profile__footer'>
          {isEditing ? (
            <>
              <button
                className='profile__button_save'
                onClick={() => setEditing(false)}>
                Сохранить
              </button>
            </>
          ) : (
            <>
              <Link
                className='profile__button profile__button_red'
                to='/sign-in'>
                Выйти из аккаунта
              </Link>
              <button
                className='profile__button'
                onClick={() => setEditing(true)}>
                Редактировать
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
