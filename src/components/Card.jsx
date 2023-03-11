import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li>
            <figure className='card'>
                <img
                    className='card__img'
                    src={card.link}
                    alt={card.name}
                    onClick={handleClick}
                />
                {isOwn &&
                    <button
                        className='button card__button-remove'
                        onClick={handleDeleteClick}
                    >
                    </button>}
                <figcaption className='card__description'>
                    <h2 className='card__title'>{card.name}</h2>
                    <div>
                        <button
                            className={`button card__button-like ${isLiked && 'card__button-like_active'}`}
                            type='button'
                            onClick={handleLikeClick}
                        ></button>
                        <div className='card__num-likes'>{card.likes.length}</div>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

export default Card;