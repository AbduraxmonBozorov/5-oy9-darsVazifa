const loader = document.querySelector(".loader");
const cardsRow = document.querySelector(".cards .row");
const paginationList = document.querySelector(".pagination");
const cards = document.querySelectorAll('.card');
let modalCloseBtn = document.querySelector(".modal1-close");
let modal = document.querySelector(".modal1");
let modal1Content = document.querySelector('.modal1-content');
let modal12 = document.querySelector(".modal1-1");


function createModal(img, title, id) {
    return `
         <div class="modal1">
        <div class="modal1-content">
            <button class="modal1-close">X</button>
            <img src="${img}" alt="${id}">
            <h2>${title}</h2>
            <p>${id}</p>
        </div>
    </div>

    `
}

function createCards(data) {
    return `
         <div class="col-12 col-sm-6 col-md-4">
            <div class="card">
                <img src="${data.flag}" alt="${data.code}" class="card-img-top p-0 m-0">
                <div class="card-body">
                    <h2 class="card-title text-nowrap text-truncate">${data.country}</h2>
                    <p class="card-text">${data.id}</p>
                        
                </div>
            </div>
        </div>
    `;
}

function createCardSort(a, b, data) {
    for (let i = a; i < b; i++) {
        let card = createCards(data[i]);
        // cardsRow.innerHTML="";
        cardsRow.innerHTML += card;
    }
    return;
}

function pageBtnCreate(num) {
    return `
         <li class="page-item"><a class="page-link" href="#">${num}</a></li>
    `
}

function showModal(cards) {
    cards.length > 0 && cards.forEach(card => {
        card.addEventListener('click', (event) => {
            modal12.style.display="block";
            let cardImgSrc = card.children[0].getAttribute("src");
            let cardTitle = card.children[1].children[0].innerHTML;
            let cardText = card.children[1].children[1].innerHTML
            let modal = createModal(cardImgSrc, cardTitle, cardText);
            modal12.innerHTML = modal
        })
    })
    return;
}
  
document.addEventListener("DOMContentLoaded", () => {
    fetch("https://cars-pagination.onrender.com/all-countries")
        .then((response) => {
            if (response.status == 200) {
                return response.json();
            }
        })
        .then(data => {
            let count = data.length;
            if (count > 0) {
                loader.classList.add("hide")
            }
            let pageBtns = Math.ceil(count / 9);
            for (let i = 1; i <= pageBtns; i++) {
                let btn = pageBtnCreate(i); paginationList.innerHTML += btn;
            }

            let startId = 0; let endId = 9;

            let pageBtn = document.querySelectorAll(".page-item")
            pageBtn.forEach(pageBtn => {
                let pageNum = pageBtn.childNodes[0].innerHTML;
                pageBtn.addEventListener('click', (a) => {
                    let txt = a.target.innerHTML
                    txt *= 1;
                    console.log(a.target.innerHTML);
                    startId = (txt - 1) * 9
                    endId = startId + 9
                    cardsRow.innerHTML = ""
                    createCardSort(startId, endId, data);
                })
            })

            createCardSort(startId, endId, data)

            const cards = document.querySelectorAll('.card');

            showModal(cards);
        })
        .catch(error => console.log(error))
})

document.addEventListener("keydown", (event)=>{
    if(event.key=='Escape'){
        modal12.style.display="none"
    }
})



