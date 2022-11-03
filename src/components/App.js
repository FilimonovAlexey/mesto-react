import { useState, useEffect } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteConfirmPopup from "./DeleteConfirmPopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isDeleteConfirmPopupOpen, setDeleteConfirmPopupOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [dataDeleteCard, setDataDeleteCard] = useState({});
  const [statusSubbmitButton, setSubbmitButton] = useState("Сохранить");
  const [statusDeleteButton, setStatusDeleteButton] = useState("Да");
  const [errorMessage, setErrorMessage] = useState({});
  const [buttonState, setButtonState] = useState(true);

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));

    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleBasketClick(card) {
    setDeleteConfirmPopupOpen(true);
    setDataDeleteCard(card);
  }

  function handleCardClick(evt) {
    setSelectedCard(evt.target);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setDeleteConfirmPopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    setSubbmitButton("Сохранение...");
    api
      .editProfile(data)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => setSubbmitButton("Сохранить"));
    closeAllPopups();
  }

  function handleUpdateAvatar(data) {
    setSubbmitButton("Сохранение...");
    api
      .changeAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => setSubbmitButton("Сохранить"));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCard : item))
          );
        })
        .catch((err) => console.log(`Ошибка.....: ${err}`));
    }
  }

  function handleDeleteCard() {
    setStatusDeleteButton("Удаление...");
    api
      .deleteCard(dataDeleteCard._id)
      .then(() => {
        setCards((state) =>
          state.filter((item) => item._id !== dataDeleteCard._id)
        );
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => setStatusDeleteButton("Да"));
  }

  function handleAddPlaceSubmit(data) {
    setSubbmitButton("Сохранение...");
    api
      .addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`))
      .finally(() => setSubbmitButton("Сохранить"));
  }

  function checkInputValidity(evt) {
    if (!evt.currentTarget.checkValidity()) {
      setErrorMessage({
        ...errorMessage,
        [evt.target.name]: evt.target.validationMessage,
      });
      setButtonState(true);
    } else {
      setErrorMessage({});
      setButtonState(false);
    }
  }

  useEffect(() => {
    setErrorMessage({});
    setButtonState(true);
  }, [isEditProfilePopupOpen, isAddPlacePopupOpen, isEditAvatarPopupOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="content">
          <Header />

          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleBasketClick}
          />

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            statusSubmitButton={statusSubbmitButton}
            onValidate={checkInputValidity}
            buttonState={buttonState}
            errorMessage={errorMessage}
          />
          <AddPlacePopup
            onAddPlace={handleAddPlaceSubmit}
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            statusSubmitButton={statusSubbmitButton}
            onValidate={checkInputValidity}
            buttonState={buttonState}
            errorMessage={errorMessage}
          />

          <DeleteConfirmPopup
            isOpen={isDeleteConfirmPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleDeleteCard}
            statusSubmitButton={statusDeleteButton}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            statusSubmitButton={statusSubbmitButton}
            onValidate={checkInputValidity}
            buttonState={buttonState}
            errorMessage={errorMessage}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
