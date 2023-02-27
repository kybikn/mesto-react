function Card({ card, onCardClick }) {

    function handleClick(event) {
        onCardClick(card);
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
                {card.isOwner && <button className='button card__button-remove'></button>}
                <figcaption className='card__description'>
                    <h2 className='card__title'>{card.name}</h2>
                    <div>
                        <button
                            className={`button card__button-like ${card.like && 'card__button-like_active'}`}
                            type='button'
                        ></button>
                        <div className='card__num-likes'>{card.likes.length}</div>
                    </div>
                </figcaption>
            </figure>
        </li>
    )
}

export default Card;