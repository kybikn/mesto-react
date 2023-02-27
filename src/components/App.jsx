import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  // const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);


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
        btnText='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
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
      </PopupWithForm>

      <PopupWithForm
        name='place'
        title='Новое место'
        btnText='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
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
      </PopupWithForm>

      <PopupWithForm
        name='avatar'
        title='Обновить аватар'
        btnText='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
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
      </PopupWithForm>

      <PopupWithForm
        name='delete'
        title='Вы уверены?'
        btnText='Да'
        // isOpen={isDeletePopupOpen}
        onClose={closeAllPopups}
      >
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
