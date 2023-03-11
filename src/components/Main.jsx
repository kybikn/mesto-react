
import { useState, useEffect, useContext } from 'react';
import api from '../utils/api.js';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [cards, setCards] = useState([]);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
        // установка состояния карточек и перерисовка, соответственно
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

  const galleryList = cards.map((card) =>
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onCardLike={handleCardLike}
      onCardDelete={handleCardDelete} />
  );

  return (
    <main>
      <section className='profile'>
        <div className='profile__content'>
          <div
            onClick={onEditAvatar}
            className='profile__avatar-box'
          >
            <button
              className='profile__button-avatar'
              type='button'
            ></button>
            <img
              className='profile__img profile__avatar-img'
              src={currentUser.avatar}
              alt='Аватар'
            />
          </div>
          <div className='profile__text'>
            <div className='profile__name'>
              <h1 className='profile__title'>{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className='button profile__button-edit'
                type='button'
              ></button>
            </div>
            <p className='profile__subtitle'>{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            className='button profile__button-add'
            type='button'
          ></button>
        </div>
      </section>
      <section
        className='gallery'
        aria-label='Галерея карточек'
      >
        <ul className='gallery__list'>
          {galleryList}
        </ul>
      </section>
    </main>
  );
}

export default Main;
