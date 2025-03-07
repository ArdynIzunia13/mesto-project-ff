// @todo: Темплейт карточки

import '../pages/index.css';
import { initialCards } from './cards.js'; 
import { openPopup, closePopup, keyOverlayPop, popupKeyClose } from './modal.js';
import { createCard, deleteCard, likeEvent} from './card.js'
import { enableValidation, clearValidation } from './validation.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formProfile = document.querySelector('.popup__form')
const nameInput = formProfile.querySelector('.popup__input_type_name')
const jobInput = formProfile.querySelector('.popup__input_type_description')
const profileInput = document.querySelector('.profile__title')
const profileDesc = document.querySelector('.profile__description')
const cardName = document.querySelector('.popup__input_type_card-name')
const cardUrl = document.querySelector('.popup__input_type_url')
const formNewCard = popupNewCard.querySelector('.popup__form')
const popupImageContainer = document.querySelector('.popup_type_image'); 
const popupImage = popupImageContainer.querySelector('.popup__image'); 
const popupText = popupImageContainer.querySelector('.popup__caption'); 
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

   // @todo: Функция создания карточки
   // @todo: Вывести карточки на страницу
    initialCards.forEach(cardData => {
        const card = createCard(cardData, deleteCard, likeEvent, openImage);
        placesList.append(card);
      });


editButton.addEventListener('click',()=>{
  nameInput.value = profileInput.textContent
  jobInput.value = profileDesc.textContent
  clearValidation(formNewCard,validationConfig)
  openPopup(popupEdit)})

addButton.addEventListener('click',()=>{
  clearValidation(formNewCard,validationConfig)
  openPopup(popupNewCard)})
popupEdit.addEventListener('click',keyOverlayPop)
popupNewCard.addEventListener('click',keyOverlayPop)
popupImageContainer.addEventListener('click',keyOverlayPop) 



function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value
  const job = jobInput.value
  profileInput.textContent = name
  profileDesc.textContent = job
  closePopup(popupEdit)
}
formProfile.addEventListener('submit', handleFormEditSubmit); 


function addCard(evt) {
  evt.preventDefault()
  const addNewCard = createCard({
    name: cardName.value,
    link: cardUrl.value
  },deleteCard,likeEvent,openImage)
  placesList.prepend(addNewCard)
  closePopup(popupNewCard)
  formNewCard.reset()
}
formNewCard.addEventListener('submit', addCard)


function openImage(imageSrc, imageName) {
    popupImage.src = imageSrc; 
    popupImage.alt = imageName; 
    popupText.textContent = imageName; 
    openPopup(popupImageContainer); 
}

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(validationConfig)

Promise.all

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31/cards',
  headers: {
    authorization: '12f46a8e-652d-4cc1-8628-1879e9f64fa6',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json(); // Если ответ успешный, возвращаем данные в формате JSON
  }
  return Promise.reject(`Ошибка: ${res.status}`); // Если ответ неуспешный, возвращаем ошибку
}