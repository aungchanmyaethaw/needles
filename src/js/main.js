// Import our custom CSS
import '../scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import artists from '../database/artists.json' assert {type:'JSON'}

// --- scroll-top

const scrollbtn = document.querySelector('.scroll-top')

scrollbtn.addEventListener('click', () => window.scrollTo({ top: 0 }))

window.addEventListener('scroll', scrollTop)

function scrollTop() {
  scrollbtn.classList.toggle('appear', scrollY > 800)
}

const artistsContainerEl = document.querySelector('[data-artists]')

artistsContainerEl.addEventListener('click', (e) => {
  if (e.target.hasAttribute('data-set-artist-id')) {
    const artistId = e.target.getAttribute('data-set-artist-id')
    setArtistIdtoLocalStorage(artistId)
  }
})

window.addEventListener('DOMContentLoaded', getArtists)

function getArtists() {
  artists.shift()
  artists.forEach((artist, index) => setArtiststoUI(artist, index))
}

function setArtiststoUI(artist, index = 1) {
  const artistColEl = document.createElement('div')
  artistColEl.classList.add('col-lg-3', 'col-md-6')

  artistColEl.setAttribute('data-aos', 'fade-up')
  artistColEl.setAttribute('data-aos-duration', '1500')
  artistColEl.setAttribute('data-aos-delay', `${index * 200}`)
  artistColEl.setAttribute('data-aos-offset', '100')
  artistColEl.innerHTML = `<div class="card p-2 border-2 bg-white">
                  <img
                    src="${artist.image}"
                    class="card-img-top"
                    alt="${artist.name}"
                  />
                  <div class="card-body">
                    <h4
                      class="font-heading card-title text-primary text-uppercase"
                    >
                      ${artist.name}
                    </h4>
                    <h6 class="font-heading text-dark text-uppercase">
                     ${artist.rank}
                    </h6>
                    <p class="font-text card-text">
                    ${getIntroString(artist.about)}
                    </p>
                      <button class="primary-btn py-2 px-3 fs-5" data-set-artist-id="${
                        artist.id
                      }">
                        Meet ${getFirstName(artist.name)}
                      </button>
                  </div>
                </div>`
  artistsContainerEl.appendChild(artistColEl)
}

function getFirstName(name) {
  return name.split(' ')[0]
}

function getIntroString(str) {
  const splitArr = str.split('.')
  let resultStr = ''
  for (let i = 0; i < 2; i++) {
    resultStr += `${splitArr[i]}.`
  }

  return resultStr
}

function setArtistIdtoLocalStorage(artistId) {
  localStorage.setItem('artist.id', artistId)

  goToartistPage()
}

function goToartistPage() {
  window.location.href = 'artists.html'
}
