function openPopup(modal){
  modal.classList.add('popup_is-opened')
  modal.classList.add('popup_is-animated')
  document.addEventListener('keydown',popupKeyClose)
  }
  function closePopup(modal){
  modal.classList.remove('popup_is-opened')
  document.removeEventListener('keydown',popupKeyClose)
  // const form = modal.querySelector('.popup__form'); 
  // if (form) {
  //   form.reset(); 
  // }
  }


function keyOverlayPop(evt){
  if (evt.target.classList.contains('popup__close')) {
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
  export { openPopup, closePopup, keyOverlayPop, popupKeyClose }