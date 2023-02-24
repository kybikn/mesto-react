import avatarImage from '../images/Kusto.jpg';
import React from 'react';
import api from '../utils/api.js';

function Main({ onEditAvatar, onEditProfile, onAddPlace }) {
  const [userName, setUserName] = React.useState('Жак-Ив Кусто');
  const [userDescription, setUserDescription] = React.useState(
    'Исследователь океана'
  );
  const [userAvatar, setUserAvatar] = React.useState(avatarImage);

  React.useEffect(() => {
    api.getProfile().then((profile) => {
      setUserName(profile.name);
      setUserDescription(profile.about);
      setUserAvatar(profile.avatar);
    });
  }, []);

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
        <ul className='gallery__list'></ul>
      </section>
    </main>
  );
}

export default Main;
