import PopupWithForm from "./PopupWithForm";

function DeleteConfirmPopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onDeleteCard();
  }

  return (
    <PopupWithForm
      name="delete-confirm"
      title="Вы уверены?"
      onClose={props.onClose}
      isOpen={props.isOpen}
      buttonText={props.statusSubmitButton}
      onSubmit={handleSubmit}
    />
  );
}

export default DeleteConfirmPopup;
