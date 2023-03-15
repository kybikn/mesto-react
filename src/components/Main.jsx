
import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, onDeletePopup, cards, onCardLike }) {

  const currentUser = useContext(CurrentUserContext);

  const galleryList = cards.map((card) =>
    <Card
      key={card._id}
      card={card}
      onCardClick={onCardClick}
      onDeletePopup={onDeletePopup}
      onCardLike={onCardLike}
    />
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
