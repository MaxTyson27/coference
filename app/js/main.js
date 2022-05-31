$(function () {
  $('.logo').on('click', (e) => {
    e.preventDefault()
  })

  $('.input-phone').inputmask({ "mask": "+7(999) 999-99-99" });
  // $('.content__button').on('click', (e) => {
  //   $('.modal').css('display', 'block')
  // })
  // $(".form").submit(function (event) {
  //   event.preventDefault();

  //   // Ссылка, которую получили на этапе публикации приложения
  //   let appLink = "https://script.google.com/macros/s/AKfycbwjkzD0qIYMH2ja5HuQmYHrxJLR1kasPaZRWC5f8L17IXdzFxZ0-FYk8PqE8GWW1AqgFw/exec";

  //   // Id текущей формы
  //   let form = $('#' + $(this).attr('id'))[0];

  //   // Кнопка отправки формы
  //   let submitButton = $(this).find('.form__btn');


  //   // FormData
  //   let fd = new FormData(form);


  //   $.ajax({

  //     url: appLink,
  //     type: "POST",
  //     data: fd,
  //     processData: false,
  //     contentType: false,
  //     beforeSend: function () {

  //       // Делаем неактивной кнопку отправки
  //       submitButton.prop('disabled', true);

  //       // валидация других полей.

  //     },

  //   }).done(function (res, textStatus, jqXHR) {

  //     if (jqXHR.readyState === 4 && jqXHR.status === 200) {

  //       console.log('success');

  //       // Возвращаем активность кнопке отправки
  //       submitButton.prop('disabled', false);

  //       // Очищаем поля формы
  //       form.reset();

  //     } else {
  //       setTimeout(() => {
  //         submitButton.prop('disabled', false);
  //       }, 5000);

  //       $('.modal').css('opacity', 0)
  //       $('.modal').css('transform', 'translateX(-250px) scale(.3)')
  //       $('.modal-close-bg').css('visibility', 'hidden')
  //       $('.modal-close-bg').css('opacity', 0)

  //       console.log('Гугл не ответил статусом 200');
  //     }
  //   })
  // });
});

'use strict';


const modalFunction = () => {
  const modal = document.querySelector('.modal')
  const form = modal.querySelector('.form')
  const button = document.querySelector('.content__button')
  const closeModalIcon = document.querySelector('.modal__close')
  const closeBg = document.querySelector('.modal-close-bg')
  const closeSuccessIcon = document.querySelector('.success__close')
  const successModal = document.querySelector('.success')
  const closeElems = [closeModalIcon, closeBg]

  const validateInputs = () => {
    form.addEventListener('input', (e) => {
      if (e.target.classList.contains('input-text')) {
        e.target.value = e.target.value.replace(/[^а-яё\ ]+/gi, '')
        if (e.target.value.length == 1) {
          e.target.value = e.target.value.toUpperCase()
        }
      }
    })
  }

  const removeCloseBgStyles = () => {
    closeBg.style.opacity = 0
    closeBg.style.visibility = 'hidden'
  }

  const removeModalStyles = () => {
    modal.style.transform = `translateX(-250%) scale(.3)`
    modal.style.opacity = 0
    removeCloseBgStyles()

  }

  const removeSuccessModalStyles = () => {
    successModal.style.transform = `translateX(-250%) scale(.3)`
    successModal.style.visibility = 'hidden'
    successModal.opacity = 0
    removeCloseBgStyles()
  }

  const closeSuccessModal = () => {
    closeElems.shift()
    closeElems.push(closeSuccessIcon)
    closeElems.forEach(elem => {
      elem.addEventListener('click', () => {
        removeSuccessModalStyles()
      })
    });
  }

  const closeModal = () => {
    closeElems.forEach(elem => {
      elem.addEventListener('click', () => {
        removeModalStyles()
      })
    });
  }

  const openModal = () => {
    button.addEventListener('click', () => {
      modal.style.transform = `translateX(-50%) scale(1)`
      modal.style.opacity = 1
      closeBg.style.opacity = 1
      closeBg.style.visibility = 'visible'
    })
  }

  $(".form").submit(function (event) {
    event.preventDefault();

    // Ссылка, которую получили на этапе публикации приложения
    let appLink = "https://script.google.com/macros/s/AKfycbwjkzD0qIYMH2ja5HuQmYHrxJLR1kasPaZRWC5f8L17IXdzFxZ0-FYk8PqE8GWW1AqgFw/exec";

    // Id текущей формы
    let form = $('#' + $(this).attr('id'))[0];

    // Кнопка отправки формы
    let submitButton = $(this).find('.form__btn');

    // FormData
    let fd = new FormData(form);

    $.ajax({

      url: appLink,
      type: "POST",
      data: fd,
      processData: false,
      contentType: false,
      beforeSend: function () {

        // Делаем неактивной кнопку отправки
        submitButton.prop('disabled', true);
        // валидация других полей.
      },

    }).done(function (res, textStatus, jqXHR) {

      if (jqXHR.readyState === 4 && jqXHR.status === 200) {

        console.log('success');

        // Возвращаем активность кнопке отправки
        submitButton.prop('disabled', false);
        removeModalStyles()
        $('.success').css('opacity', 1)
        $('.success').css('visibility', 'visible')
        $('.success').css('transform', 'translateX(-50%) scale(1)')
        $('.modal-close-bg').css('opacity', 1)
        $('.modal-close-bg').css('visibility', 'visible')

        // Очищаем поля формы
        form.reset();

      } else {
        setTimeout(() => {
          submitButton.prop('disabled', false);
        }, 5000);

        removeModalStyles()
        console.log('Гугл не ответил статусом 200');
      }
    })
  });

  validateInputs()
  openModal()
  closeModal()
  closeSuccessModal()

}


modalFunction()