class Api {
  constructor(options) {
    this._options = options;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json(); 
    }
      return Promise.reject(res.status);
  }

  getProfile() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  getCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._options.baseUrl}/cards `, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  addLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: "PUT",
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._options.baseUrl}/cards/${cardId}/likes `, {
      method: "DELETE",
      headers: this._options.headers,
    }).then(this._checkResponse);
  }

  changeAvatar(avatarLink) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._options.headers,
      body: JSON.stringify({
        avatar: avatarLink,
      }),
    }).then(this._checkResponse);
  }
}

const api = new Api({
  baseUrl: "https://nomoreparties.co/v1/cohort-51",
  headers: {
    authorization: "228cae98-cff9-4022-bb25-2678b613ba24",
    "Content-Type": "application/json",
  },
});

export default api;
