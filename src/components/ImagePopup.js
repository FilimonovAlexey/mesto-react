import popupIcon from "../images/Close_Icon.svg";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup  ${card.src && "popup_opened"}`}>
      <div className="popup__container-image">
        <img className="popup__card-image" src={card.src} alt={card.alt} />
        <p className="popup__caption">{card.alt}</p>
        <button className="popup__button-close" type="button">
          <img
            className="popup__icon"
            src={popupIcon}
            alt="кнопка закрыть"
            onClick={onClose}
          />
        </button>
      </div>
    </div>
  );
}

export default ImagePopup;
