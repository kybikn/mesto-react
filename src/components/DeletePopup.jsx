import PopupWithForm from './PopupWithForm';

function DeletePopup({ isOpen, onClose, onDeletePopup, cardToDelete }) {
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

export default DeletePopup
