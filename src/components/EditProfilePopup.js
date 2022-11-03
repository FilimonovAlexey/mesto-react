import { useState, useContext, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function hundleChangeName(evt) {
    setName(evt.target.value);
  }

  function hundleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({ name, description });
  }
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText={props.statusSubmitButton}
      buttonState={props.buttonState}
      onSubmit={handleSubmit}
      onValidate={props.onValidate}
    >
      <input
        type="text"
        className="popup__input popup__profile-name"
        name="profileName"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        id="popup__profile-name"
        onChange={hundleChangeName}
        value={name ?? ""}
      />
      <span className="popup__input-error popup__profile-name-error">
        {props.errorMessage.profileName && props.errorMessage.profileName}
      </span>
      <input
        type="text"
        className="popup__input popup__profile-job"
        name="profileJob"
        placeholder="Профессиональная деятельность"
        required
        minLength="2"
        maxLength="200"
        id="popup__profile-job"
        onChange={hundleChangeDescription}
        value={description ?? ""}
      />
      <span className="popup__input-error popup__profile-job-error">
        {props.errorMessage.profileJob && props.errorMessage.profileJob}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
