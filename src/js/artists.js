// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

  // import Swiper bundle with all modules installed
import Swiper from 'swiper/bundle';

  // import styles bundle
import 'swiper/css/bundle';

  // init Swiper:
  const swiper = new Swiper(".mySwiper",{
        spaceBetween: 25,
        loop: true,
        centerSlide:true,
        fade:"true",
        grabCursor:true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets:true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        
        breakpoints:{

          0:{

            slidesPerView:1,

          },
          768:{

            slidesPerView:3,

          },
          992:{

            slidesPerView:4,

          }

        }
      }
        
      );

import artists from '../database/artists.json' assert {type:'JSON'}

import gallery from '../database/gallery.json' assert {type:"JSON"}

// --- scroll-top

const scrollbtn = document.querySelector('.scroll-top')
scrollbtn.addEventListener('click', () => window.scrollTo({ top: 0 }))

window.addEventListener('scroll', scrollTop)

function scrollTop() {
  scrollbtn.classList.toggle('appear', scrollY > 800)
}
const pagesContainerEl = document.querySelector('[data-page-container]')
const artistListEl = document.querySelector('[data-artist-lists]')
const swiperContainerEl = document.querySelector("[data-swiper-container]")

let eachArtistImgs = [];

window.addEventListener('DOMContentLoaded', getArtistIdFromLocalStorage)

artistListEl.addEventListener('click', (e) => {
  if (e.target.classList.contains('list-group-item')) {
    const tabId = e.target.getAttribute('data-tabId')
    localStorage.setItem('artist.id', tabId)
    e.currentTarget
      .querySelector('.list-group-item.active')
      .classList.remove('active')
    e.target.classList.add('active')
    pageSwitcher(tabId)
  }
})

swiperContainerEl.addEventListener('click', (e) => {
  if (e.target.hasAttribute('src')) {
    const imgSource = e.target.src
    const imgAlt = e.target.alt
    document.body.classList.toggle('scroll-lock')
    showImageinModal(imgSource, imgAlt)
     
  }
})

document
  .querySelector('[data-modal-close-btn]')
  .addEventListener('click', () => {
    document.body.classList.toggle('scroll-lock')
    document.querySelector('[data-artist-modal]').close()
  })


// Show Image in Modal

function showImageinModal(imageSource, imgAlt) {
  const modalImgEl = document.querySelector('[data-modal-img]')
  modalImgEl.src = imageSource
  modalImgEl.alt = imgAlt
 document.querySelector('[data-artist-modal]').showModal()
}

function getArtistIdFromLocalStorage() {
  if (localStorage.getItem('artist.id') !== null) {
    const currentArtistId = localStorage.getItem('artist.id')
    initUI(currentArtistId)
  } else {
    initUI()
  }
}

function initUI(currentArtistId = 1) {
  artists.shift()
  artists.forEach((artist) => {
    addArtistToAside(artist, currentArtistId)
    addArtistPage(artist, currentArtistId)
  })
  filterImagesByArtist(currentArtistId)
}

function filterImagesByArtist(currentArtistId){
  swiperContainerEl.innerHTML='';
  eachArtistImgs = gallery.filter(img=>img.artistId == currentArtistId)
  eachArtistImgs.forEach(image=>addImageToArtist(image))
}

function addArtistToAside(artist, currentArtistId) {
  const listEl = document.createElement('li')
  if (artist.id == currentArtistId) {
    listEl.classList.add('list-group-item', 'active')
  } else {
    listEl.classList.add('list-group-item')
  }
  listEl.setAttribute('data-tabId', `${artist.id}`)
  listEl.textContent = `${artist.name}`
  artistListEl.appendChild(listEl)
}

function addArtistPage(artist, currentArtistId) {
  const articleEl = document.createElement('article')
  if (artist.id == currentArtistId) {
    articleEl.classList.add('artist-page', 'active-page', 'px-lg-5')
  } else {
    articleEl.classList.add('artist-page', 'px-lg-5')
  }
  articleEl.setAttribute('data-pageId', `${artist.id}`)
  articleEl.setAttribute('data-aos', 'fade-up')
  articleEl.setAttribute('data-aos-offset', '50')
  articleEl.innerHTML = `<div class="row">
                  <div class="col-12 d-flex justify-content-center">
                    <div class="artist-image-container">
                      <img
                        src="${artist.image}"
                        alt="${artist.name}"
                        class="img-fluid"
                      />
                    </div>
                  </div>
                  <div class="col-12 font-heading text-center mt-3">
                    <h2 class="h2 text-primary text-uppercase">${artist.name}</h2>
                    <h5 class="h5 text-light">${artist.rank}</h5>
                  </div>
                  <div class="col-12 p-3">
                    <p class="text-light font-text">
                      ${artist.about}
                    </p>
                  </div>
                </div>`
  pagesContainerEl.appendChild(articleEl)
   
}

function addImageToArtist(image){

  const divEl = document.createElement("div")
  divEl.classList.add("swiper-slide")
  divEl.innerHTML = `<figure>
                      <div class="image-container">
                        <img
                          src="${image.source}"
                          alt="${image.name}"
                          loading="lazy"
                        />
                        <div class="image-cover">
                          <i class="fa-solid fa-eye"></i>
                        </div>
                      </div>
                    </figure>`

                    
  swiperContainerEl.appendChild(divEl)

}

function pageSwitcher(tabId) {
  const allPagesEls = document.querySelectorAll('.artist-page')

  document
    .querySelector('.artist-page.active-page')
    .classList.remove('active-page')

  allPagesEls.forEach((pageEl) => {
    const pageId = pageEl.getAttribute('data-pageId')

    if (pageId === tabId) {
      pageEl.classList.add('active-page')
    }
  })

   filterImagesByArtist(tabId)

}
