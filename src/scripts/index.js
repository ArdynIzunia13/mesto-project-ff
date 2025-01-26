// @todo: Темплейт карточки

import '../pages/index.css';
import { initialCards } from './cards.js'; 
import { editButton, addButton, popupEdit, popupNewCard, openPopup, closePopup, keyOverlayPop, popupKeyClose } from './modal.js';

function createCard(cardData, callbackDeleteCard, likeCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
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

  const placesList = document.querySelector('.places__list');
   // @todo: Функция создания карточки
   // @todo: Вывести карточки на страницу
    initialCards.forEach(cardData => {
        const card = createCard(cardData, deleteCard, likeEvent);
        placesList.append(card);
      });

editButton.addEventListener('click',()=>{openPopup(popupEdit)})
addButton.addEventListener('click',()=>{openPopup(popupNewCard)})
document.addEventListener('click',keyOverlayPop)
document.addEventListener('keydown',popupKeyClose)

const formElement = document.querySelector('.popup__form')
const nameInput = document.querySelector('.popup__input_type_name')
const jobInput = document.querySelector('.popup__input_type_description')
const titleInput = document.querySelector('.profile__title')
const popupDesc = document.querySelector('.profile__description')


function handleFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value
  const job = jobInput.value
  titleInput.textContent = name
  popupDesc.textContent = job
  closePopup(popupEdit)
}
formElement.addEventListener('submit', handleFormSubmit); 

const cardName = document.querySelector('.popup__input_type_card-name')
const cardUrl = document.querySelector('.popup__input_type_url')
const cardTitle = document.querySelector('.card__title')

function addCard(evt) {
  evt.preventDefault()
  const name = cardName.value
  cardTitle.textContent = name
  
}