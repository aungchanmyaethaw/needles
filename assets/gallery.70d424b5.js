import"./bootstrap.esm.e967317a.js";import{a as u}from"./artists.2cf4f461.js";import{g as r}from"./gallery.614e683b.js";window.addEventListener("DOMContentLoaded",g);const i=document.querySelector(".scroll-top");i.addEventListener("click",()=>window.scrollTo({top:0}));window.addEventListener("scroll",f);const l=document.querySelector("[data-gallery]"),c=document.querySelector("[data-gallery-form]"),m=document.querySelector("[data-select]");c.addEventListener("submit",t=>{t.preventDefault();const e=Object.fromEntries(new FormData(c));b(e)});l.addEventListener("click",t=>{if(t.target.hasAttribute("src")){const e=t.target.src,o=t.target.alt;document.body.classList.toggle("scroll-lock"),y(e,o)}t.target.hasAttribute("data-reload-btn")&&w()});document.querySelector("[data-modal-close-btn]").addEventListener("click",()=>{document.body.classList.toggle("scroll-lock"),document.querySelector("[data-gallery-modal]").close()});function f(){i.classList.toggle("appear",scrollY>800)}function g(){E(),p()}function y(t,e){const o=document.querySelector("[data-modal-img]");o.src=t,o.alt=e,document.querySelector("[data-gallery-modal]").showModal()}function p(){u.forEach(t=>h(t))}function h(t){const e=document.createElement("option");e.textContent=t.name,e.setAttribute("value",t.id),m.appendChild(e)}function E(){r.forEach((t,e)=>d(t,e))}function d(t,e=1){const o=document.createElement("div");o.classList.add("col-lg-3","col-md-4","col-sm-6"),o.setAttribute("data-aos","fade-up"),o.setAttribute("data-aos-offset","100"),o.innerHTML=` 
              <figure>
                <div class="image-container">
                  <img src="${t.source}" alt="${t.name}" loading="lazy"/>
                  <div class="image-cover"><i class="fa-solid fa-eye"></i></div>
                </div>
                <figcaption>${t.name}</figcaption>
              </figure>
            
  `,l.appendChild(o)}function b(t){const e=v(t.artist);L(t.search,e)}function v(t){const e=Number(t);return e===0?r:r.filter(a=>a.artistId===e)}function L(t,e){const o=t.toLowerCase();let a=e.filter(n=>n.name.toLowerCase().includes(o));l.innerHTML="",a.length===0?I():a.forEach((n,s)=>d(n,s))}function I(){const t=document.createElement("div");t.classList.add("col"),t.innerHTML=`<h2 class="text-light font-text text-center">
                 No Result Found ...
               </h2>
               <div class="refresh-btn text-center mt-5">
                 <button class="primary-btn py-2 px-3" data-reload-btn>
                   Refresh
                 </button>
               </div>`,l.appendChild(t)}function w(){return location.reload()}
