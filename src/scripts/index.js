// @todo: Темплейт карточки

import '../pages/index.css';
import { initialCards } from './cards.js'; 
import { openPopup, closePopup, keyOverlayPop, popupKeyClose } from './modal.js';
import { createCard, deleteCard, likeEvent} from './card.js'

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

   // @todo: Функция создания карточки
   // @todo: Вывести карточки на страницу
    initialCards.forEach(cardData => {
        const card = createCard(cardData, deleteCard, likeEvent, openImage);
        placesList.append(card);
      });


editButton.addEventListener('click',()=>{openPopup(popupEdit)})

addButton.addEventListener('click',()=>{openPopup(popupNewCard)})
popupEdit.addEventListener('click',keyOverlayPop)
popupNewCard.addEventListener('click',keyOverlayPop)
document.querySelector('.popup__content_content_image').addEventListener('click',keyOverlayPop) 



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