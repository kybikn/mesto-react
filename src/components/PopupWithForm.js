function PopupWithForm({ title, name, children, isOpen, onClose }) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_active'}`}>
      <div className='popup__content'>
        <button
          className='popup__close'
          type='button'
        ></button>
        <h2 className='popup__title'>{title}</h2>
        <form
          className={`popup__form popup__form-${name}`}
          name={`popup__form-${name}`}
          noValidate
        >
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
