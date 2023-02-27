function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_type_photo ${card && 'popup_active'}`}
      onClick={onClose}>
      <figure className='popup__figure'>
        <img className='popup__img' src={card?.link} alt={card?.name} />
        <button
          className='popup__close'
          type='button'
        ></button>
        <figcaption className='popup__img-title'>{card?.name}</figcaption>
      </figure>
    </div>
  );
}
export default ImagePopup;
