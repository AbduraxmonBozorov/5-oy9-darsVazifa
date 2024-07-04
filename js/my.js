const loader=document.querySelector(".loader");
const cardsRow=document.querySelector(".cards .row");
const paginationList=document.querySelector(".pagination");
const cards=document.querySelectorAll('.card');
const modal=document.querySelector(".modal");

function createCards(data){
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

function pageBtnCreate(num){
    return `
         <li class="page-item"><a class="page-link" href="#">${num}</a></li>
    `
}



document.addEventListener("DOMContentLoaded", ()=>{
    fetch("https://cars-pagination.onrender.com/all-countries")
    .then((response)=>{
        if(response.status==200){
            return response.json();
        }
    })
    .then(data=>{
        let count=data.length;
        if(count>0){
           loader.classList.add("hide")
        }
        let pageBtns=Math.ceil(count/9);
        console.log(pageBtns);
        for(let i=1; i<=pageBtns; i++){
            let btn=pageBtnCreate(i);            paginationList.innerHTML+=btn;
             
        }
        

    
        let startId=0;let endId=8;
        for(let i=startId; i<=endId; i++){
            let card=createCards(data[i]);
            cardsRow.innerHTML+=card;
        }

    const cards=document.querySelectorAll('.card');
    cards.length > 0 && cards.forEach(card=>{
        card.addEventListener('click', (event)=>{
            console.log(event);
        
        })
    })


    })
    .catch(error=>console.log(error))
})
