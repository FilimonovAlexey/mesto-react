function Card({ card, onCardClick }) {
  return (
    <div className="cards__item ">
      <img
        className="cards__image"
        src={card.link}
        alt={card.name}
        onClick={onCardClick}
      />
      <div className="cards__basket"></div>
      <div className="cards__caption">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__likes-info">
          <button className="cards__like" type="button"></button>
          <span className="cards__counter-likes">{card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
