import popupIcon from "../images/Close_Icon.svg";

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__${props.name}-form`}
          name={`popup__${props.name}-form`}
          noValidate
        >
          {props.children}
          <button type="submit" className="popup__button-save">
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
