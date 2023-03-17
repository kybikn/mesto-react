import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import api from '../utils/api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import avatarImage from '../images/Kusto.jpg';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';


function App() {
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({ avatar: avatarImage, name: 'Жак-Ив Кусто', about: 'Исследователь океана' });
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleDeletePopupClick(card) {
    setCardToDelete(card)
    setDeletePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then((profile) => {
        // установка состояния профиля
        setCurrentUser(profile);
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      }).finally(() => {
        closeAllPopups();
      });
  }

  function handleUpdateUser({ name, about }) {
    api.editProfile({ name, about })
      .then((profile) => {
        // установка состояния профиля
        setCurrentUser(profile);
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      }).finally(() => {
        closeAllPopups();
      });
  }


  function handleAddPlaceSubmit({ name, link }) {
    api.addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      }).finally(() => {
        closeAllPopups();
      });
  }

  function handleDeletePopupSubmit(card) {
    api.deleteCard(card._id).then(() => {
      const newCards = cards.filter((stateCard) => stateCard._id !== card._id);
      setCards(newCards);
    }).catch((err) => {
      console.log(err);
      alert(`Ошибка: ${err}`);
    }).finally(() => {
      closeAllPopups();
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
        alert(`Ошибка: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map(stateCard => stateCard._id === card._id ? newCard : stateCard)
        setCards(newCards)
      })
      .catch((err) => {
        console.log(err);
        alert(`Ошибка: ${err}`);
      });
  }

  function closeAllPopups(event) {
    if (
      !event ||
      event.target.classList.contains('popup_active') ||
      event.target.classList.contains('popup__close')
    ) {
      setEditAvatarPopupOpen(false);
      setEditProfilePopupOpen(false);
      setAddPlacePopupOpen(false);
      setDeletePopupOpen(false);
      setSelectedCard(null);
    }
  }

  const isOpen =
    isAddPlacePopupOpen ||
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isDeletePopupOpen ||
    selectedCard;

  useEffect(() => {
    //  для меня этот функционал идеологически относится к приложению. Я готова закрывать по esc все окна! :)
    function handleEscClose(event) {
      if (event.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
      return () => {
        document.removeEventListener('keydown', handleEscClose);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onDeletePopup={handleDeletePopupClick}
          cards={cards}
          onCardLike={handleCardLike}
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
          onAddPlace={handleAddPlaceSubmit}
        />
        <DeletePopup
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onDeletePopup={handleDeletePopupSubmit}
          cardToDelete={cardToDelete}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
