// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// --- scroll-top

const scrollbtn = document.querySelector('.scroll-top')

scrollbtn.addEventListener('click', () => window.scrollTo({ top: 0 }))

window.addEventListener('scroll', scrollTop)

const contactFormContainerEl = document.querySelector(
  '[data-contact-form-container]',
)
const contactFormEl = document.querySelector('[data-contact-form]')
const submitBtnEl = contactFormContainerEl.querySelector('button')
contactFormContainerEl.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-reset-form-btn')) {
    showForm()
  }
})

contactFormEl.addEventListener('submit', formSubmit)

document.querySelector('[data-size]').addEventListener('change', inputReset)

function scrollTop() {
  scrollbtn.classList.toggle('appear', scrollY > 800)
}

function formSubmit(event) {
  event.preventDefault()
  const formData = Object.fromEntries(new FormData(event.currentTarget))
  localStorage.setItem('client.details', JSON.stringify(formData))
  const clientName = JSON.parse(localStorage.getItem('client.details'))
    .clientName

  submitBtnEl.textContent = 'Sending...'
  setTimeout(() => {
    showSuccessMessage(clientName)
  }, 2000)
}

function showSuccessMessage(clientName) {
  const clientNameEl = document.querySelector('.thank-you-text')
  clientNameEl.textContent += ` ${getfirstName(clientName)}`
  const myModal = new bootstrap.Modal('#contactSuccessModal')
  myModal.show()
  submitBtnEl.textContent = 'Submit'
  contactFormEl.reset()
}

function inputReset(event) {
  if (event.target.value < 0) {
    event.target.value = 1
  }
}

function getfirstName(clientName) {
  const firstName = clientName.split(' ')[0]
  return firstName
}
