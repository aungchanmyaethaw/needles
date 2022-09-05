import"./bootstrap.esm.e967317a.js";import{a as i}from"./artists.c0a3e217.js";const r=document.querySelector(".scroll-top");r.addEventListener("click",()=>window.scrollTo({top:0}));window.addEventListener("scroll",n);function n(){r.classList.toggle("appear",scrollY>800)}const o=document.querySelector("[data-artists]");o.addEventListener("click",t=>{if(t.target.hasAttribute("data-set-artist-id")){const a=t.target.getAttribute("data-set-artist-id");p(a)}});window.addEventListener("DOMContentLoaded",d);function d(){i.shift(),i.forEach((t,a)=>c(t,a))}function c(t,a=1){const e=document.createElement("div");e.classList.add("col-lg-3","col-md-6"),e.setAttribute("data-aos","fade-up"),e.setAttribute("data-aos-duration","1500"),e.setAttribute("data-aos-delay",`${a*200}`),e.setAttribute("data-aos-offset","100"),e.innerHTML=`<div class="card p-2 border-2 bg-white">
                  <img
                    src="${t.image}"
                    class="card-img-top"
                    alt="${t.name}"
                  />
                  <div class="card-body">
                  <div>
                  <h4
                      class="font-heading card-title text-primary text-uppercase"
                    >
                      ${t.name}
                    </h4>
                    <h6 class="font-heading text-dark text-uppercase">
                     ${t.rank}
                    </h6>
                  </div>
                    
                    <p class="font-text card-text ">
                    ${u(t.about)}
                    </p>
                    <div>
                    <button class="primary-btn py-2 px-3 fs-5" data-set-artist-id="${t.id}">
                        Meet ${l(t.name)}
                      </button>
                    </div>
                      
                  </div>
                </div>`,o.appendChild(e)}function l(t){return t.split(" ")[0]}function u(t){const a=t.split(".");let e="";for(let s=0;s<2;s++)e+=`${a[s]}.`;return e}function p(t){localStorage.setItem("artist.id",t),f()}function f(){window.location.href="artists.html"}
