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
  // const [isDeletePopupOpen, setDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups(event) {
    if (
      event.target.classList.contains('popup_active') ||
      event.target.classList.contains('popup__close')
    ) {
      setAddPlacePopupOpen(false);
      setEditProfilePopupOpen(false);
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setSelectedCard(null);
    }
  }
  return (
    <div className='page'>
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name='profile'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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
        onClose={closeAllPopups}
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
        // isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
      >
        <button
          className='popup__button'
          id='popup__button-delete'
          type='submit'
        >
          Да
        </button>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />


    </div>
  );
}

export default App;
