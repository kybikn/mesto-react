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
import AddPlacePopup from './AddPlacePopup';

function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    useState(false);
  // const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ avatar: avatarImage, name: 'Жак-Ив Кусто', about: 'Исследователь океана' });
  const [cards, setCards] = useState([]);

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


  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        hardCloseAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([profile, initialCards]) => {
        // установка состояния профиля
        setCurrentUser(profile);
        // установка состояния карточек 
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    // api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
    //   setCards((state) => state.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
    // });
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      // setCards((cardsState) => cardsState.map((stateCard) => stateCard._id === card._id ? newCard : stateCard));
      const newCards = cards.map(stateCard => stateCard._id === card._id ? newCard : stateCard)
      setCards(newCards)
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      // setCards((cardsState) => cardsState.filter((stateCard) => stateCard._id !== card._id));
      const newCards = cards.filter((stateCard) => stateCard._id !== card._id);
      setCards(newCards)
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
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
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
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit} />
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
