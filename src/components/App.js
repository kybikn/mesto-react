import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);

  function handleEditAvatarClick() {
    // console.log('Аватар кликнут');
    // const popupPlace = document.querySelector('.popup_type_avatar');
    // popupPlace.classList.add('popup_active');
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    // const popupPlace = document.querySelector('.popup_type_profile');
    // popupPlace.classList.add('popup_active');
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    // const popupPlace = document.querySelector('.popup_type_place');
    // popupPlace.classList.add('popup_active');
    setAddPlacePopupOpen(true);
  }
  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
  }
  return (
    <div className='page'>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onClose={closeAllPopups}
      />
      <Footer />
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
      >
        <fieldset className='popup__box'>
          <label className='popup__label'>
            <span className='popup__input-close popup__input-name-close'>
              &times;
            </span>
            <input
              className='popup__input popup__input_type_name'
              id='popup__input-name'
              type='text'
              name='name'
              placeholder='Ваше имя'
              minLength='2'
              maxLength='40'
              required
            />
            <span className='popup__input-error popup__input-name-error'></span>
          </label>
          <label className='popup__label'>
            <span className='popup__input-close popup__input-job-close'>
              &times;
            </span>
            <input
              className='popup__input popup__input_type_job'
              id='popup__input-job'
              type='text'
              name='job'
              placeholder='Ваша профессия'
              minLength='2'
              maxLength='200'
              required
            />
            <span className='popup__input-error popup__input-job-error'></span>
          </label>
          <button
            className='popup__button'
            id='popup__button-profile'
            type='submit'
          >
            Сохранить
          </button>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name='place'
        title='Новое место'
        isOpen={isAddPlacePopupOpen}
      >
        <fieldset className='popup__box'>
          <label className='popup__label'>
            <span className='popup__input-close popup__input-place-close'>
              &times;
            </span>
            <input
              className='popup__input popup__input_type_place'
              id='popup__input-place'
              type='text'
              name='place'
              placeholder='Название'
              minLength='2'
              maxLength='30'
              required
            />
            <span className='popup__input-error popup__input-place-error'></span>
          </label>
          <label className='popup__label'>
            <span className='popup__input-close popup__input-url-close'>
              &times;
            </span>
            <input
              className='popup__input popup__input_type_link'
              id='popup__input-url'
              type='url'
              name='url'
              placeholder='Ссылка на картинку'
              required
            />
            <span className='popup__input-error popup__input-url-error'></span>
          </label>
          <button
            className='popup__button'
            id='popup__button-place'
            type='submit'
          >
            Создать
          </button>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
      >
        <fieldset className='popup__box'>
          <label className='popup__label'>
            <span className='popup__input-close popup__input-avatar-close'>
              &times;
            </span>
            <input
              className='popup__input popup__input_type_avatar'
              id='popup__input-avatar'
              type='url'
              name='link'
              placeholder='Ссылка на аватар'
              required
            />
            <span className='popup__input-error popup__input-avatar-error'></span>
          </label>
          <button
            className='popup__button'
            id='popup__button-avatar'
            type='submit'
          >
            Сохранить
          </button>
        </fieldset>
      </PopupWithForm>

      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        isOpen={isDeletePopupOpen}
      >
        <button
          className='popup__button'
          id='popup__button-delete'
          type='submit'
        >
          Да
        </button>
      </PopupWithForm>

      <ImagePopup />

      <template id='card'>
        <li>
          <figure className='card'>
            <img className='card__img' />
            <button className='button card__button-remove'></button>
            <figcaption className='card__description'>
              <h2 className='card__title'></h2>
              <div>
                <button
                  className='button card__button-like'
                  type='button'
                ></button>
                <div className='card__num-likes'>0</div>
              </div>
            </figcaption>
          </figure>
        </li>
      </template>
    </div>
  );
}

export default App;
