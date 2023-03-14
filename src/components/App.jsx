import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatarImage from '../images/Kusto.jpg';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    useState(false);
  // const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ avatar: avatarImage, name: 'Жак-Ив Кусто', about: 'Исследователь океана' });


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

  function handleUpdateUser({ name, about }) {
    api.editProfile({ name, about })
      .then((profile) => {
        // установка состояния профиля
        setCurrentUser(profile);
        hardCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    api.getProfile()
      .then((profile) => {
        // установка состояния профиля
        setCurrentUser(profile)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then((profile) => {
        // установка состояния профиля
        setCurrentUser(profile);
        hardCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function hardCloseAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  function closeAllPopups(event) {
    if (
      event.target.classList.contains('popup_active') ||
      event.target.classList.contains('popup__close')
    ) {
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setSelectedCard(null);
    }
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
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
          name='delete'
          title='Вы уверены?'
          btnText='Да'
          // isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
        >
        </PopupWithForm>
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
