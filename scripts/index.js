// @todo: Темплейт карточки
function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
// @todo: DOM узлы
    cardElement.querySelector('.card__image').src = cardData.link
    cardElement.querySelector('.card__image').alt = cardData.name
    cardElement.querySelector('.card__title').textContent = cardData.name
    
    const deleteButton = cardElement.querySelector('.card__delete-button');

    deleteButton.addEventListener('click', () => {
      deleteCard(cardElement);
    });
  
    return cardElement;
  }

  const placesList = document.querySelector('.places__list');
   // @todo: Функция создания карточки
   // @todo: Вывести карточки на страницу
    initialCards.forEach(cardData => {
        const card = createCard(cardData);
        placesList.append(card);
      });
  
  // @todo: Функция удаления карточки
  function deleteCard(cardElement) {
    cardElement.remove();
  }
  