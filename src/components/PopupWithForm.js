import popupIcon from "../images/Close_Icon.svg";
import { useEffect } from "react";

function PopupWithForm(props) {
  useEffect(() => {
    if (!props.isOpen) {
      return;
    }

    function hundleEsc(evt) {
      if (evt.key === "Escape") {
        props.onClose();
      }
    }

    function hundleClick(evt) {
      if (evt.target.classList.contains("popup_opened")) {
        props.onClose();
      }
    }

    document.addEventListener("keydown", hundleEsc);
    document.addEventListener("click", hundleClick);

    return () => {
      document.removeEventListener("keydown", hundleEsc);
      document.removeEventListener("click", hundleClick);
    };
  }, [props.isOpen]);

  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__${props.name}-form`}
          name={`popup__${props.name}-form`}
          noValidate
          onSubmit={props.onSubmit}
          onChange={props.onValidate}
        >
          {props.children}
          <button type="submit" className={`popup__button-save ${props.buttonState && 'popup__button-save_disabled'}  `}>
            {props.buttonText}
          </button>
        </form>
        <button className="popup__button-close" type="button">
          <img
            className="popup__icon"
            src={popupIcon}
            alt="кнопка закрыть"
            onClick={props.onClose}
          />
        </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
