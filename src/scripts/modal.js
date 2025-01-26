const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card')

function openPopup(modal){
  modal.classList.add('popup_is-opened')
  modal.classList.add('popup_is-animated')
  }
  function closePopup(modal){
  modal.classList.remove('popup_is-opened')
  }


function keyOverlayPop(evt){
  if (evt.target.classList.contains('popup__close')) {
        document.querySelector('.popup__form').reset()
        const modal = evt.target.closest('.popup'); 
        if (modal) {
          closePopup(modal);
        }
      }
      if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
      }
    };
  

  function popupKeyClose(evt) {
    if(evt.key === "Escape"){
      const modal = document.querySelector('.popup_is-opened')
     if(modal){
      closePopup(modal)
    }
   }
  }
  export { editButton, addButton, popupEdit, popupNewCard, openPopup, closePopup, keyOverlayPop, popupKeyClose }