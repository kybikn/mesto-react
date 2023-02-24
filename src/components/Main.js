import avatarImage from '../images/Kusto.jpg';
function Main({ onEditAvatar, onEditProfile, onAddPlace }) {
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
              src={avatarImage}
              alt='Аватар'
            />
          </div>
          <div className='profile__text'>
            <div className='profile__name'>
              <h1 className='profile__title'>Жак-Ив Кусто</h1>
              <button
                onClick={onEditProfile}
                className='button profile__button-edit'
                type='button'
              ></button>
            </div>
            <p className='profile__subtitle'>Исследователь океана</p>
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
