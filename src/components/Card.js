import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((item) => item._id === currentUser._id);

  function handleCardLike() {
    onCardLike(card);
  }

  function handleDeleteCard() {
    onCardDelete(card);
  }

  return (
    <div className="cards__item ">
      <img
        className="cards__image"
        src={card.link}
        alt={card.name}
        onClick={onCardClick}
      />
      <div
        className={`cards__basket ${isOwn && "cards__basket_visible"}`}
        onClick={handleDeleteCard}
      ></div>
      <div className="cards__caption">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__likes-info">
          <button
            className={`cards__like ${isLiked && "cards__like_active"}`}
            type="button"
            onClick={handleCardLike}
          ></button>
          <span className="cards__counter-likes">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
