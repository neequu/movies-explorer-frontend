import { useEffect, useRef, useState } from 'react';
import { useValidate, useDisable } from 'utils/useValidate';

function Profile({ unathorize }) {
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setEditing(false);
  }

  function editing() {
    setEditing(true);
  }

  const { values, error, handleChange } = useValidate();
  const { disabled, validateInputs } = useDisable();

  const fields = useRef(null);
  useEffect(() => {
    validateInputs(error, fields.current.elements);
  }, [error]);

  return (
    <section className='profile'>
      <form className='profile__container' onSubmit={handleSubmit}>
        <div>
          <h1 className='profile__heading'>Привет, Виталий!</h1>
          <fieldset className='profile__content' ref={fields}>
            <div className='profile__item'>
              <label className='profile__label'>Имя</label>
              <input
                onChange={handleChange}
                value={values.name ?? 'Виталий'}
                type='text'
                className='profile__input'
                disabled={!isEditing}
                placeholder='Имя'
                minLength={2}
                name='name'
                required
              />
            </div>
            <div className='profile__item'>
              <label className='profile__label'>E-mail</label>
              <input
                onChange={handleChange}
                value={values.email ?? 'pochta@yandex.ru'}
                type='email'
                className='profile__input'
                disabled={!isEditing}
                placeholder='E-mail'
                name='email'
                required
              />
            </div>
          </fieldset>
        </div>
        <div className='profile__footer'>
          {isEditing ? (
            <>
              <button
                type='submit'
                className={`${
                  disabled ? 'profile__button_disabled' : 'profile__button_save'
                }`}
                disabled={disabled}>
                Сохранить
              </button>
            </>
          ) : (
            <>
              <button
                type='button'
                className='profile__button profile__button_red'
                onClick={unathorize}>
                Выйти из аккаунта
              </button>
              <button
                type='button'
                className='profile__button'
                onClick={editing}>
                Редактировать
              </button>
            </>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;
