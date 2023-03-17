import PopupWithForm from './PopupWithForm';
import { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState(currentUser.name);
    const [description, setDescription] = useState(currentUser.about);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [isOpen, currentUser]);

    function handleNameChange(e) {
        setName(e.target.value);
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name='profile'
            title='Редактировать профиль'
            btnText='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className='popup__label'>
                <span className='popup__input-close popup__input-name-close'>
                    &times;
                </span>
                <input
                    value={name}
                    onChange={handleNameChange}
                    className='popup__input popup__input_type_name'
                    id='popup__input-name'
                    type='text'
                    name='name'
                    placeholder='Ваше имя'
                    minLength='2'
                    maxLength='40'
                    required
                />
                <span className='popup__input-error popup__input-name-error'></span>
            </label>
            <label className='popup__label'>
                <span className='popup__input-close popup__input-job-close'>
                    &times;
                </span>
                <input
                    value={description}
                    onChange={handleDescriptionChange}
                    className='popup__input popup__input_type_job'
                    id='popup__input-job'
                    type='text'
                    name='job'
                    placeholder='Ваша профессия'
                    minLength='2'
                    maxLength='200'
                    required
                />
                <span className='popup__input-error popup__input-job-error'></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup