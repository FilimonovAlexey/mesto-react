import { useEffect, useState } from "react";
import Card from "./Card";
import api from "../utils/Api";
import AvatarIcon from "../images/avatar_edit.png";

function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getProfile()
      .then((res) => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));

    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => console.log(`Ошибка.....: ${err}`));
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__avatar">
          <img
            className="profile__avatar-photo"
            src={userAvatar}
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
          <h1 className="profile__name">{userName}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <div className="cards">
        {cards.map((card) => (
          <Card card={card} key={card._id} onCardClick={props.onCardClick} />
        ))}
      </div>
    </main>
  );
}

export default Main;
