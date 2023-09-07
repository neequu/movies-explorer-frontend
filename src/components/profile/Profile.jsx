import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { getToken } from 'utils/utils.js';
import { editCurrentUserInfo } from 'utils/mainApi.js';
import { useValidate, useDisable } from 'utils/validate.js';

function Profile({ signOut }) {
  const [isEditing, setEditing] = useState(false);
  const [updateError, setUpdateError] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const { name: defaultName, email: defaultEmail } =
    useContext(CurrentUserContext);

  async function handleUpdateUserInfo() {
    const jwt = getToken();
    setUpdateError(false);
    try {
      const { name = defaultName, email = defaultEmail } = values;
      await editCurrentUserInfo(jwt, { name, email });
      setEditing(false);
      setUpdateSuccess(true);
    } catch (e) {
      console.log(e);
      setUpdateError(true);
      setUpdateSuccess(false);
      setDisabled(true);
    } finally {
      setDisabled(true);
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 2000);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUserInfo();
  }

  const { values, error, handleChange } = useValidate();
  const { disabled, validateInputs, setDisabled } = useDisable();

  const fields = useRef(null);
  useEffect(() => {
    validateInputs(error, fields.current.elements);
  }, [error]);

  return (
    <section className='profile'>
      <form className='profile__container' onSubmit={handleSubmit}>
        <div>
          <h1 className='profile__heading'>Привет, {defaultName}!</h1>
          <fieldset className='profile__content' ref={fields}>
            <div className='profile__item'>
              <label className='profile__label'>Имя</label>
              <input
                onChange={handleChange}
                value={values.name ?? defaultName ?? ''}
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
                value={values.email ?? defaultEmail ?? ''}
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
          {updateSuccess && (
            <span className='profile__message'>Данные успешно обновлены.</span>
          )}
          {updateError && (
            <span className='profile__message_error'>
              При попытке авторизации произошла ошибка.
            </span>
          )}
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
                onClick={signOut}>
                Выйти из аккаунта
              </button>
              <button
                type='button'
                className='profile__button'
                onClick={() => setEditing(true)}>
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
