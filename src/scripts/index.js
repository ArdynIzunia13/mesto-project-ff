// @todo: Темплейт карточки

import '../pages/index.css';
import { initialCards } from './cards.js'; 
import { editButton, addButton, popupEdit, popupNewCard, openPopup, closePopup, keyOverlayPop, popupKeyClose } from './modal.js';
import { createCard, deleteCard, likeEvent} from './card.js'

  const placesList = document.querySelector('.places__list');
   // @todo: Функция создания карточки
   // @todo: Вывести карточки на страницу
    initialCards.forEach(cardData => {
        const card = createCard(cardData, deleteCard, likeEvent, openImage);
        placesList.append(card);
      });

editButton.addEventListener('click',()=>{openPopup(popupEdit)})
addButton.addEventListener('click',()=>{openPopup(popupNewCard)})
document.addEventListener('click',keyOverlayPop)
document.addEventListener('keydown',popupKeyClose)

const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_description')
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

function addCard(evt) {
  evt.preventDefault()
  const addNewCard = createCard({
    name: cardName.value,
    link: cardUrl.value
  },deleteCard,likeEvent)
  placesList.prepend(addNewCard)
  closePopup(popupNewCard)
}
popupNewCard.addEventListener('submit', addCard)


const popupImageContainer = document.querySelector('.popup_type_image'); 
const popupImage = popupImageContainer.querySelector('.popup__image'); 
const popupText = popupImageContainer.querySelector('.popup__caption'); 

function openImage(image, text) {
    popupImage.src = image.src; 
    popupImage.alt = image.alt; 
    popupText.textContent = text; 
    openPopup(popupImageContainer); 
}