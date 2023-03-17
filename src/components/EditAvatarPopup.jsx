import PopupWithForm from './PopupWithForm';
import { useRef, useEffect } from 'react';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputAvatarRef = useRef();

    useEffect(() => {
        inputAvatarRef.current.value = "";
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(inputAvatarRef.current.value);
        e.target.reset();
    }

    return (
        <PopupWithForm
            name='avatar'
            title='Обновить аватар'
            btnText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className='popup__label'>
                <span className='popup__input-close popup__input-avatar-close'>
                    &times;
                </span>
                <input
                    ref={inputAvatarRef}
                    className='popup__input popup__input_type_avatar'
                    id='popup__input-avatar'
                    type='url'
                    name='link'
                    placeholder='Ссылка на аватар'
                    required
                />
                <span className='popup__input-error popup__input-avatar-error'></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup