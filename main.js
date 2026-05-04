let navbar= document.querySelector("#navbar");
let links= document.querySelectorAll(".nav-link");
let logoNavbar=document.querySelector("#logoNavbar");
let saber=document.querySelector("#saber");
let collapse=document.querySelector("#collapse");
let firstNumber=document.querySelector("#firstNumber");
let secondNumber=document.querySelector("#secondNumber");
let thirdNumber=document.querySelector("#thirdNumber");
let swiperWrapper=document.querySelector(".swiper-wrapper");
let confirm=true;
let check=false;



window.addEventListener("scroll",()=>{
    let scrolled= window.scrollY
    if(scrolled>0){
        navbar.classList.remove("bg-black");
        navbar.classList.add("bg-yellow");
        collapse.classList.remove("bg-black");
        collapse.classList.add("bg-yellow");
        navbar.style.height= "70px";
        links.forEach((link)=>{
            link.style.color="var(--bl)"
        })
        logoNavbar.src= "http://127.0.0.1:5500/media/logoblack.png"
        saber.src= "http://127.0.0.1:5500/media/saberblack.png"
    }else{
        navbar.classList.add("bg-black");
        navbar.classList.add("bg-yellow");
        collapse.classList.add("bg-black");
        collapse.classList.add("bg-yellow");
        navbar.style.height="140px";
        links.forEach((link)=>{
            link.style.color="var(--yel)"
        })
        logoNavbar.src="http://127.0.0.1:5500/media/logoyellow.png"
        saber.src= "http://127.0.0.1:5500/media/saberyellow.png"
    }
});


saber.addEventListener("click",()=>{
    if (check==false) {
        saber.style.transform= "rotate(-35deg)"

        check=true
    }else{
        saber.style.transform= "rotate(42deg)"

        check=false
    }
})


// Chiamata asincrona

// setInterval(): crea un loop infinito in cui possiamo gestire la durata delle singole iterazioni
// Il setInterval()vuole due parametri, il primo è la callback, il secondo è l'intervallo di tempo tra un'iterazione e l'altra.
// clearInterval(): pulisce /interrompe un intervallo
// setTimeout:fa partire un blocco di istruzioni dopo tot ms



function createInterval(number,el,time){
    let counter=0;
    
    let interval= setInterval(()=>{
        if (counter<number) {
            counter++
            el.innerHTML=counter
            
        }else{
            
            clearInterval(interval);
            
        }
        
    }, time);
    setTimeout(()=>{
        confirm=true
    },8000)

}



// IntersectionObserver: è una Classe del browser che si occupa di far scattare una funzione nel momento in cui sul browser sono visibili gli elementi html che noi gli indichiamo.
// new :keyword che mi permette di creare un oggetto da una classe


let observer=  new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting && confirm) {
            createInterval(100,firstNumber,100);
            createInterval(200,secondNumber,50);
            createInterval(300,thirdNumber,20);
            confirm=false;
            
        }
    })
});

// TESTARE A CAMVIARE FIRST NUMBER
observer.observe(firstNumber);

let reviews=[
    {user:"Matteo",description:`Il più bel sito di annunci del mondo`,rank:5},
    {user:"Alin",description:`Veramente non mi da di niente`,rank:1},
    {user:"Michael",description:`Mi piace apparte il tema`,rank:3},
    {user:"Arina",description:`Star Trek è meglio`,rank:2},
    {user:"Alessandra",description:`Amore ti amo`,rank:4},
    
    
]

reviews.forEach((review)=>{
    let div= document.createElement("div");
    div.classList.add("swiper-slide");
    div.innerHTML=  `<div class="swiper-slide ">
                            <div class="card-review">
                                <p class="lead text-center">${review.description}</p>
                                <p class="h4 text-center">${review.user}</p>
                                <div class="d-flex justify-content-center star">
                                    
                                </div>

                            </div>

                        </div>`;
    swiperWrapper.appendChild(div)
})

let stars=document.querySelectorAll(".star");
stars.forEach((star,index)=>{
    for (let i = 1; i <= reviews[index].rank; i++) {
       
        let icon=document.createElement("i");
        icon.classList.add("fa-solid","fa-star");
        star.appendChild(icon)       
    }
    let difference= 5-reviews[index].rank
    for (let i = 1; i <= difference; i++) {
        
        let icon=document.createElement("i");
        icon.classList.add("fa-regular","fa-star");
        star.appendChild(icon)       
    }
});
console.log(stars);

// inizio
//  var swiper = new Swiper(".mySwiper", {
      
     
//       pagination: {
//         el: ".swiper-pagination",
//       },
//     });
// // fine



// SWIPER
const swiper = new Swiper('.swiper', {
  // Optional parameters
//   direction: 'vertical',
  loop: true,
  effect: "coverflow",
    grabCursor: true,
     centeredSlides: true,
      slidesPerView: "auto",
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },



  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  autoplay: {
    delay:2000,
  },

  
});