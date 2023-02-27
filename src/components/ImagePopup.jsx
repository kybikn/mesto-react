function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_photo ${card && 'popup_active'}`}>
      <figure className='popup__figure'>
        <img
          className='popup__img'
          src={card && card.link}
          alt={card && card.name}
        />
        <button
          className='popup__close'
          type='button'
          onClick={onClose}
        ></button>
        <figcaption className='popup__img-title'>{card && card.name}</figcaption>
      </figure>
    </div>
  );
}
export default ImagePopup;
