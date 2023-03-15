import PopupWithForm from './PopupWithForm';

function EditDeletePopup({ isOpen, onClose, onDeletePopup, cardToDelete }) {
    function handleSubmit(e) {
        e.preventDefault();
        onDeletePopup(cardToDelete);
    }
    return (
        <PopupWithForm
            name='delete'
            title='Вы уверены?'
            btnText='Да'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
        </PopupWithForm>
    )
}

export default EditDeletePopup
