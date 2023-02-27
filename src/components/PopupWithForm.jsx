function PopupWithForm({ title, name, btnText, children, isOpen, onClose }) {
  return (
    <div
      onClick={onClose}
      className={`popup popup_type_${name} ${isOpen && 'popup_active'}`}
    >
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
          <fieldset className='popup__box'>
            {children}
            <button
              className='popup__button'
              id={`popup__button-${name}`}
              type='submit'
            >
              {btnText}
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
