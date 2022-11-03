import { useContext } from "react";
import Card from "./Card";
import AvatarIcon from "../images/avatar_edit.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-photo"
            src={currentUser.avatar}
            alt="аватар"
          />
          <div className="profile__overlay" onClick={props.onEditAvatar}>
            <img
              className="profile__avatar-icon"
              src={AvatarIcon}
              alt="иконка"
            />
          </div>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <div className="cards">
        {props.cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}    
          />
        ))}
      </div>
    </main>
  );
}

export default Main;
