import avatarImage from '../images/Kusto.jpg';
import { useState, useEffect } from 'react';
import api from '../utils/api.js';
import Card from './Card';
import enrichCardData from '../utils/utils.js'

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = useState(
    'Исследователь океана'
  );
  const [userAvatar, setUserAvatar] = useState(avatarImage);
  const [cards, setCards] = useState([]);

  useEffect(() => {

    Promise.all([api.getProfile(), api.getInitialCards()])
      // тут деструктурируем ответ от сервера (api.getProfile() => profile, api.getInitialCards() => initialCards)
      .then(([profile, initialCards]) => {
        // установка состояния профиля и перерисовка, соответственно
        setUserName(profile.name);
        setUserDescription(profile.about);
        setUserAvatar(profile.avatar);

        // обогащение данных карточек
        const enrichedInitialCards = initialCards.map((cardData) =>
          enrichCardData(cardData, profile._id)
        );
        // установка состояния карточек и перерисовка, соответственно
        setCards(enrichedInitialCards);

      })
      .catch((err) => {
        console.log(err);
      });

  }, []);

  const galleryList = cards.map((card) =>
    <Card key={card._id} card={card} onCardClick={onCardClick} />
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
              src={userAvatar}
              alt='Аватар'
            />
          </div>
          <div className='profile__text'>
            <div className='profile__name'>
              <h1 className='profile__title'>{userName}</h1>
              <button
                onClick={onEditProfile}
                className='button profile__button-edit'
                type='button'
              ></button>
            </div>
            <p className='profile__subtitle'>{userDescription}</p>
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
