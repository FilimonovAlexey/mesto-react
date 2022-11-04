import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [cardName, setCardName] = useState("");
  const [cardLink, setCardLink] = useState("");

  function hundleChangeCardName(evt) {
    setCardName(evt.target.value);
  }

  function hundleChangeCardLink(evt) {
    setCardLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({ cardName, cardLink });
  }

  useEffect(() => {
    setCardName("");
    setCardLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.statusSubmitButton}
      onSubmit={handleSubmit}
      buttonState={props.buttonState}
      onValidate={props.onValidate}
    >
      <input
        type="text"
        className="popup__input popup__card-name"
        name="name"
        placeholder="Название"
        required
        minLength="2"
        maxLength="30"
        id="popup__card-name"
        onChange={hundleChangeCardName}
        value={cardName}
      />
      <span className="popup__input-error popup__card-name-error ">
      {props.errorMessage.name && props.errorMessage.name}
      </span>
      <input
        type="url"
        className="popup__input popup__card-link"
        name="link"
        placeholder="Ссылка на картинку"
        required
        id="popup__card-link"
        onChange={hundleChangeCardLink}
        value={cardLink}
      />
      <span className="popup__input-error popup__card-link-error">
      {props.errorMessage.link && props.errorMessage.link}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
