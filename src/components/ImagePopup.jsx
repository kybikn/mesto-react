function ImagePopup() {
  return (
    <div className='popup popup_type_photo'>
      <figure className='popup__figure'>
        <img
          className='popup__img'
          src='#'
          alt='Карточка места'
        />
        <button
          className='popup__close'
          type='button'
        ></button>
        <figcaption className='popup__img-title'></figcaption>
      </figure>
    </div>
  );
}
export default ImagePopup;
