// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import artists from '../database/artists.json' assert {type:'JSON'}
import gallery from '../database/gallery.json' assert{type:'JSON'}

window.addEventListener('DOMContentLoaded', initUI)

const scrollbtn = document.querySelector('.scroll-top')

scrollbtn.addEventListener('click', () => window.scrollTo({ top: 0 }))

window.addEventListener('scroll', scrollTop)

const galleryContainerEl = document.querySelector('[data-gallery]')
const galleryFormEl = document.querySelector('[data-gallery-form]')
const selectEl = document.querySelector('[data-select]')
galleryFormEl.addEventListener('submit', (e) => {
  e.preventDefault()
  const searchData = Object.fromEntries(new FormData(galleryFormEl))
  filterImages(searchData)
})

galleryContainerEl.addEventListener('click', (e) => {
  if (e.target.hasAttribute('src')) {
    const imgSource = e.target.src
    const imgAlt = e.target.alt
    document.body.classList.toggle('scroll-lock')
    showImageinModal(imgSource, imgAlt)
  }
  if (e.target.hasAttribute('data-reload-btn')) {
    refreshDocument()
  }
})

document
  .querySelector('[data-modal-close-btn]')
  .addEventListener('click', () => {
    document.body.classList.toggle('scroll-lock')
    document.querySelector('[data-gallery-modal]').close()
  })

// Scroll Up Button Appear

function scrollTop() {
  scrollbtn.classList.toggle('appear', scrollY > 800)
}

// Intialize UI

function initUI() {
  getAllImages()
  getArtists()
}

// Show Image in Modal

function showImageinModal(imageSource, imgAlt) {
  const modalImgEl = document.querySelector('[data-modal-img]')
  modalImgEl.src = imageSource
  modalImgEl.alt = imgAlt
  document.querySelector('[data-gallery-modal]').showModal()
}

// Get artists

function getArtists() {
  artists.forEach((artist) => addArtiststoSelection(artist))
}

// Create artist select input

function addArtiststoSelection(artist) {
  const optionEl = document.createElement('option')
  optionEl.textContent = artist.name
  optionEl.setAttribute('value', artist.id)

  selectEl.appendChild(optionEl)
}

// Get Images

function getAllImages() {
  gallery.forEach((image, index) => addImagetoUI(image, index))
}

// Add Images to UI

function addImagetoUI(image, index = 1) {
  const gallaryColEl = document.createElement('div')
  gallaryColEl.classList.add('col-lg-3','col-md-4','col-sm-6')
  gallaryColEl.setAttribute('data-aos', 'fade-up')
  gallaryColEl.setAttribute('data-aos-offset', `100`)

  gallaryColEl.innerHTML = ` 
              <figure>
                <div class="image-container">
                  <img src="${image.source}" alt="${image.name}" loading="lazy"/>
                  <div class="image-cover"><i class="fa-solid fa-eye"></i></div>
                </div>
                <figcaption>${image.name}</figcaption>
              </figure>
            
  `
  galleryContainerEl.appendChild(gallaryColEl)
}

// Filter Images

function filterImages(data) {
  const filteredImagesByArtist = filterImagesByArtist(data.artist)
  filterImagesWithKeyWords(data.search, filteredImagesByArtist)
}

// Filter Images By Artist

function filterImagesByArtist(artistId) {
  const selectValue = Number(artistId)

  if (selectValue === 0) {
    return gallery
  } else {
    let filteredImages = gallery.filter(
      (image) => image.artistId === selectValue,
    )
    return filteredImages
  }
}

// Filter Images By Search Input

function filterImagesWithKeyWords(searchKeyWords, filteredByArtistArr) {
  const inputValue = searchKeyWords.toLowerCase()
  let filteredImages = filteredByArtistArr.filter((img) => {
    const name = img.name.toLowerCase()
    return name.includes(inputValue)
  })
  galleryContainerEl.innerHTML = ''
  if (filteredImages.length === 0) {
    showNoResult()
  } else {
    filteredImages.forEach((image, index) => addImagetoUI(image, index))
  }
}

function showNoResult() {
  const divEl = document.createElement('div')
  divEl.classList.add('col')
  divEl.innerHTML = `<h2 class="text-light font-text text-center">
                 No Result Found ...
               </h2>
               <div class="refresh-btn text-center mt-5">
                 <button class="primary-btn py-2 px-3" data-reload-btn>
                   Refresh
                 </button>
               </div>`
  galleryContainerEl.appendChild(divEl)
}

// Reload Page

function refreshDocument() {
  return location.reload()
}
