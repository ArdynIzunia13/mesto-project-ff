function createCard(cardData, callbackDeleteCard, likeCard, openCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const image = cardElement.querySelector('.card__image')

    image.addEventListener('click', () => {
      openCard(image, cardData.name); 
  });
// @todo: DOM узлы
    cardElement.querySelector('.card__image').setAttribute('aria-label', 'hidden')
    cardElement.querySelector('.card__image').src = cardData.link
    cardElement.querySelector('.card__image').alt = cardData.name
    cardElement.querySelector('.card__title').textContent = cardData.name
    
    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => {
      callbackDeleteCard(cardElement);
    });
    likeButton.addEventListener('click',()=>{
      likeCard(likeButton)
    })
    return cardElement;
  }
// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
}
// функция лайка
function likeEvent(likeButton){
  likeButton.classList.toggle('card__like-button_is-active')
}

export { createCard, deleteCard, likeEvent}