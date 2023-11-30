// const countPaySum = () => {
//   const selectInput = document.querySelector("#tickets-amount")
//   const promocodInput = document.querySelector("#promocod")

//   const isSale = () => promocodInput.value.toLowerCase() === "borodina"

//   const ticketPrice = 3800
//   const sale = 0.9

const sumElement = document.querySelector(".sum-calculator__value")
const changeSum = (sum) => (sumElement.textContent = sum)

//   promocodInput.addEventListener("input", () => {
//     if (isSale()) changeSum(`${selectInput.value * ticketPrice * sale} р.`)
//     else changeSum(`${selectInput.value * ticketPrice} р.`)
//   })

//   selectInput.addEventListener("change", (event) => {
//     const ticketsAmount = Number(event.target.value)
//     if (isSale()) changeSum(`${ticketsAmount * ticketPrice * sale} р.`)
//     else changeSum(`${selectInput.value * ticketPrice} р.`)
//   })
// }

// countPaySum()

const dialog = document.querySelector(".dialog-confirm")
const closeModalButton = document.querySelector("#close-modal")

const modalTicketValue = document.querySelector(".modal-ticket-value")
const modalParkValue = document.querySelector(".modal-park-value")
const modalRateValue = document.querySelector(".modal-rate-value")
const modalTelValue = document.querySelector(".modal-tel-value")

const setModalConfirmValues = () => {
  const formParkValue = document.querySelector('input[name="park"]').value
  const ticketsAmountValue = document.querySelector('input[name="count"]').value
  const phoneValue = document.querySelector('input[name="phone"]').value
  const rateValue = document.querySelector(".current-rate-value").textContent

  modalTicketValue.textContent = ticketsAmountValue
  modalParkValue.textContent = formParkValue
  modalRateValue.textContent = rateValue
  modalTelValue.textContent = phoneValue
}
// const openModalButton = document.querySelector("#open-modal")

closeModalButton.addEventListener("click", () => dialog.close())
// openModalButton.addEventListener("click", () => dialog.showModal())

// dropdowns

const dropdownsArr = ["park", "count"]
dropdownsArr.forEach((el) => {
  document.querySelector(`#${el}`).addEventListener("click", () => {
    document.querySelectorAll(`.open:not(#${el})`).forEach((el) => {
      el.classList.remove("open")
    })
    document.querySelector(`#${el}`).classList.toggle("open")
  })

  document.querySelectorAll(`#${el} .dropdown__item`).forEach((item) => {
    item.addEventListener("click", () => {
      if (el === "park") {
        // document.querySelector(`#tariff-wrapper`).classList.remove("d-none")
        // document.querySelector(`#tariff-value`).innerHTML = ""
        // document.querySelector(`#tariff-value`).classList.remove("filled")
        // document.querySelector(`#tariff-measure`).classList.remove("d-none")
        // document.querySelector(`#tariff-value-check`).innerHTML = ""
        // refreshTicketsCount(30)
        // document.querySelector("#park-name").innerHTML = "Парк:"
        // document.querySelector("#park-name-check").innerHTML = "Парк:"
      }

      document
        .querySelector(`#${el} .dropdown__value`)
        .setAttribute("value", item.innerText.trim())
      // document.querySelector(`#${el}-value`).innerHTML = item.innerHTML
      // document.querySelector(`#${el}-value`).classList.add("filled")
      // document.querySelector(`#${el}-measure`).classList.add("d-none")
      // document.querySelector(`#${el}-value-check`).innerHTML = item.innerHTML
      // calculateSumm()

      //if elka selected
      // if (el === "park" && isElkaSelected()) {
      //   // document.querySelector(`#tariff-wrapper`).classList.add("d-none")

      //   // document.querySelector(`#tariff-value`).innerHTML =
      //   ;("<span>3800 ₽</span>")
      //   // document.querySelector(`#tariff-value`).classList.add("filled")
      //   // document.querySelector(`#tariff-measure`).classList.add("d-none")
      //   // document.querySelector(`#tariff-value-check`).innerHTML = "3800 ₽"

      //   document.querySelector(`#${el}-value`).innerHTML = String(
      //     item.innerHTML
      //   ).substring(11)
      //   // document.querySelector("#park-name").innerHTML = "Ёлка:"
      //   // document.querySelector("#park-name-check").innerHTML = "Ёлка:"

      //   // refreshTicketsCount(5)
      //   calculateSumm()
      // }
    })
  })
})

document.querySelector("#buy-ticket-btn").addEventListener("click", () => {
  const fioWrapper = document.querySelector("#fio")
  const fioValue = fioWrapper.querySelector("input").value

  const emailWrapper = document.querySelector("#email")
  const emailValue = emailWrapper.querySelector("input").value

  const phoneWrapper = document.querySelector("#phone")
  const phoneValue = phoneWrapper.querySelector("input").value

  const parkWrapper = document.querySelector("#park")
  const parkValue = document.querySelector("input[name='park'").value

  const countWrapper = document.querySelector("#count")
  const countValue = document.querySelector("input[name='count'").value

  console.log(parkWrapper.previousElementSibling)
  parkWrapper.previousElementSibling.classList.remove("invalid")
  countWrapper.previousElementSibling.classList.remove("invalid")
  fioWrapper.querySelector(".input-wrapper__label").classList.remove("invalid")
  emailWrapper
    .querySelector(".input-wrapper__label")
    .classList.remove("invalid")
  phoneWrapper
    .querySelector(".input-wrapper__label")
    .classList.remove("invalid")

  let isAllFields = true

  if (fioValue.length < 10) {
    fioWrapper.querySelector(".input-wrapper__label").classList.add("invalid")
    isAllFields = false
  }
  if (!validateEmail(emailValue)) {
    emailWrapper.querySelector(".input-wrapper__label").classList.add("invalid")
    isAllFields = false
  }
  if (phoneValue.length !== 16) {
    phoneWrapper.querySelector(".input-wrapper__label").classList.add("invalid")
    isAllFields = false
  }
  if (!parkValue) {
    parkWrapper.previousElementSibling.classList.add("invalid")
    isAllFields = false
  }
  if (!countValue) {
    countWrapper.previousElementSibling.classList.add("invalid")
    isAllFields = false
  }

  if (isAllFields) {
    document.querySelector(".dialog-confirm").showModal()
    setModalConfirmValues()
  }
})

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

function phoneMask(phone) {
  return (
    "+7" +
    phone
      .replace("+7", "")
      .replace(/\D/g, "")
      .replace(/^(\d)/, "($1")
      .replace(/^(\(\d{3})(\d)/, "$1) $2")
      .replace(/(\d{3})(\d{1,5})/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  )
}

const phoneInput = document.querySelector("#phone input")
phoneInput.addEventListener("input", () => {
  phoneInput.value = phoneMask(phoneInput.value)
  document.querySelector("#phone-value-check").innerHTML = phoneInput.value
})

const promocode = document.querySelector('input[name="promocode"]')
const baseTicketPrice = 3800

const currentRateEl = document.querySelector(".current-rate-value")

const sale = 0.9
const isSale = () => promocode.value.toLowerCase() === "borodina"

const ticketsAmountInput = document.querySelector('input[name="count"]')

promocode.addEventListener("input", () => {
  let currentTicketsAmount = parseInt(ticketsAmountInput.value)
  if (!currentTicketsAmount) currentTicketsAmount = 0
  if (isSale()) {
    currentRateEl.textContent = `${baseTicketPrice * sale} ₽`
    changeSum(`${baseTicketPrice * sale * currentTicketsAmount} ₽`)
  } else {
    currentRateEl.textContent = `${baseTicketPrice} ₽`
    changeSum(`${baseTicketPrice * currentTicketsAmount} ₽`)
  }
  checkPromocode()
})

const ticketsInputWrapper = document.querySelectorAll(".dropdown__hero")[1]
const parksInputWrapper = document.querySelectorAll(".dropdown__hero")[0]
const currentOrderTicketsAmountEl = document.querySelector(
  ".current-tickets-amount"
)

parksInputWrapper.childNodes.forEach((el) => {
  el.addEventListener("click", (event) => {
    document.querySelector('input[name="park"]').value = event.target.innerText
    console.log("input change park")
  })
})

ticketsInputWrapper.childNodes.forEach((el) => {
  el.addEventListener("click", (event) => {
    const ticketsAmount = parseInt(event.target.textContent)
    document.querySelector('input[name="count"]').value = event.target.innerText
    console.log("input change")
    const currentRate = parseInt(currentRateEl.textContent)
    currentOrderTicketsAmountEl.textContent = `${ticketsAmount} шт.`

    // console.table({ ticketsAmount, currentRate })
    if (isSale()) changeSum(`${baseTicketPrice * ticketsAmount * sale} ₽`)
    else changeSum(`${baseTicketPrice * ticketsAmount} ₽`)
  })
})

function checkPromocode() {
  document.querySelector("#promocode-category-invalid").classList.add("d-none")
  document.querySelector("#promocode-invalid").classList.add("d-none")

  if (!isSale()) {
    document.querySelector("#promocode-invalid").classList.remove("d-none")
  }
}

const finalPayButton = document.querySelector("#pay-tickets-button")

const sendFormData = () => {
  const xhr = new XMLHttpRequest()
  const form = document.querySelector("#form-data")
  xhr.open("POST", "https://dev.teikaboom.ru/payment/tinkoff.php")
  const fd = new FormData(form)
  xhr.send(fd)
  xhr.onload = () => {
    location.href = xhr.response
  }
  xhr.onerror = () => {
    alert("error")
    console.log(xhr.status + xhr.response)
  }
}
finalPayButton.addEventListener("click", sendFormData)
