import popupIcon from "../images/Close_Icon.svg";
import { useEffect } from "react";

function ImagePopup({ card, onClose }) {
  useEffect(() => {
    if (!card.src) {
      return;
    }

    function hundleEsc(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }

    function hundleClick(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        onClose();
      }
    }

    document.addEventListener("keydown", hundleEsc);
    document.addEventListener("click", hundleClick);

    return () => {
      document.removeEventListener("keydown", hundleEsc);
      document.removeEventListener("click", hundleClick);
    };
  }, [card.src]);

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
