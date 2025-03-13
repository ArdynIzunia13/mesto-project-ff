import '../pages/index.css';
import { openPopup, closePopup, keyOverlayPop, popupKeyClose } from './modal.js';
import { createCard, deleteCard, likeEvent } from './card.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserInfo, getInitialCards, editProfile, addNewCard, deleteCardApi, likeCard, unlikeCard, updateAvatar } from './api.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const formProfile = document.querySelector('.popup__form');
const nameInput = formProfile.querySelector('.popup__input_type_name');
const jobInput = formProfile.querySelector('.popup__input_type_description');
const profileInput = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const cardName = document.querySelector('.popup__input_type_card-name');
const cardUrl = document.querySelector('.popup__input_type_url');
const formNewCard = popupNewCard.querySelector('.popup__form');
const popupImageContainer = document.querySelector('.popup_type_image');
const popupImage = popupImageContainer.querySelector('.popup__image');
const popupText = popupImageContainer.querySelector('.popup__caption');
const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const avatarEditButton = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const avatarUrlInput = formAvatar.querySelector('.popup__input_type_url');

popups.forEach(popup => {
  popup.classList.add('popup_is-animated');
});

// Редактирование профиля
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  const saveButton = formProfile.querySelector('.popup__button');
  const initialText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';

  const name = nameInput.value;
  const job = jobInput.value;

  editProfile(name, job)
    .then((userData) => {
      profileInput.textContent = userData.name;
      profileDesc.textContent = userData.about;
      closePopup(popupEdit);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = initialText;
    });
}

formProfile.addEventListener('submit', handleFormEditSubmit);

// Добавление новой карточки
function addCard(evt) {
  evt.preventDefault();
  const name = cardName.value;
  const link = cardUrl.value;
  const saveButton = formProfile.querySelector('.popup__button');
  const initialText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';

  addNewCard(name, link)
    .then((newCard) => {
      const card = createCard(newCard, deleteCard, likeCard, openImage, userId);
      placesList.prepend(card);
      closePopup(popupNewCard);
      formNewCard.reset();
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = initialText;
    });
}

formNewCard.addEventListener('submit', addCard);

// Открытие изображения
function openImage(imageSrc, imageName) {
  popupImage.src = imageSrc;
  popupImage.alt = imageName;
  popupText.textContent = imageName;
  openPopup(popupImageContainer);
}

// Обновление аватара
formAvatar.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const saveButton = formAvatar.querySelector('.popup__button');
  const initialText = saveButton.textContent;
  saveButton.textContent = 'Сохранение...';

  const avatarUrl = avatarUrlInput.value;

  updateAvatar(avatarUrl)
    .then((userData) => {
      avatarEditButton.style.backgroundImage = `url(${userData.avatar})`;
      closePopup(popupAvatar);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      saveButton.textContent = initialText;
    });
});

avatarEditButton.addEventListener('click', () => {
  openPopup(popupAvatar);
});

editButton.addEventListener('click', () => {
  nameInput.value = profileInput.textContent;
  jobInput.value = profileDesc.textContent;
  clearValidation(formProfile, validationConfig);
  openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
  clearValidation(formNewCard, validationConfig);
  openPopup(popupNewCard);
});

popupEdit.addEventListener('click', keyOverlayPop);
popupNewCard.addEventListener('click', keyOverlayPop);
popupImageContainer.addEventListener('click', keyOverlayPop);
popupAvatar.addEventListener('click', keyOverlayPop);

// Валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

let userId; // Идентификатор пользователя

// Загрузка данных пользователя и карточек
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id; // Сохраняем идентификатор пользователя
    profileInput.textContent = userData.name;
    profileDesc.textContent = userData.about;

    cards.forEach(cardData => {
      const card = createCard(cardData, deleteCard, likeCard, openImage, userId);
      placesList.append(card);
    });
  })
  .catch(err => {
    console.log(err);
  });