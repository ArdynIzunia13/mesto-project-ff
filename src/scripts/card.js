import { deleteCard as deleteCardApi, likeCard, unlikeCard } from './api.js';

function createCard(cardData, callbackDeleteCard, likeCard, openImage, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const image = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeCountElement = cardElement.querySelector('.card__like-count');

  image.addEventListener('click', () => {
    openImage(cardData.link, cardData.name);
  });

  image.src = cardData.link;
  image.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // Показываем кнопку удаления только для своих карточек
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  }

  deleteButton.addEventListener('click', () => {
    callbackDeleteCard(cardElement, cardData._id);
  });

  // Устанавливаем начальное количество лайков
  likeCountElement.textContent = cardData.likes.length;

  // Проверяем, лайкнул ли текущий пользователь карточку
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeButton.addEventListener('click', () => {
    likeEvent(likeButton, cardData._id, likeCard, likeCountElement);
  });

  return cardElement;
}

function deleteCard(cardElement, cardId) {
  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch(err => {
      console.log(err);
    });
}

function likeEvent(likeButton, cardId, likeCard, likeCountElement) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    unlikeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length; // Обновляем количество лайков
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        likeButton.classList.add('card__like-button_is-active');
        likeCountElement.textContent = updatedCard.likes.length; // Обновляем количество лайков
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export { createCard, deleteCard, likeEvent };