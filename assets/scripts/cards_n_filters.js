//---------------CARDS FUNCTIONS--------------

function addCardTemplate(card){
    return `<div class="col col-md-6 col-lg-3">
                <div class="card mt-0">
                    <img src="${card.image}" alt="${card.name} image">
                    <div class="card-body d-flex flex-column align-items-center justify-content-between">
                        <h5 class="card-title w-100 text-center">${card.name}</h5>
                        <p class="card-text h-100">${card.description}</p>
                        <div class=" card-bottom d-flex justify-content-between align-items-center w-100">
                            <p class="m-0 fw-bold text-align-center">Price $${card.price}</p>
                            <a href="./details.html?id=${card._id}" class="btn btn-danger">View more</a>
                        </div>
                    </div>
                </div>
            </div>`
}

function createTemplateCards(events){
    if(events.length===0){
        return `<div class="notFoundMsg mt-3 text-center"><h3>No matches found</h3></div>`;
    }
    let currentDate = data['currentDate'];
    let pageUrl=location.pathname;
    let template="";
    switch(pageUrl){
        case "/index.html":{
            for(let e of events){
                template+=addCardTemplate(e);
            }
            return template;
        }
        case "/past.html":{
            for(let e of events){
                if(e.date < currentDate){
                    template+=addCardTemplate(e);
                }
            }
            return template;
        }
        case "/upcomming.html":{
            for(let e of events){
                if(e.date >= currentDate){
                    template+=addCardTemplate(e);
                }
            }
            return template;
        }
    }
}

function renderCards(events){
    let cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML=createTemplateCards(events);
}

//-----------CHECKBOX/SEARCH FUNCTIONS---------

function filterByCheckbox(){
    let arrCategories = document.querySelectorAll("input[type=checkbox]:checked")
    arrCategories = Array.from(arrCategories).map(chkCategory=>chkCategory.value)
    if(arrCategories.length === 0){
        return data['events'];
    }  
    let filteredEvents = data["events"].filter(event=>arrCategories.includes(event["category"]))
    return filteredEvents; 
    
}

function filterBySearch(events){
    let searchValue = document.getElementById("searchBar").value;
    if(searchValue!==""){
        events=events.filter(e=>e.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return events
}

function applyFilter(){
    renderCards(filterBySearch(filterByCheckbox()));
}

function addCheckboxTemplate(chk){
    return `<input type="checkbox" class="btn-check" id="${chk}" value="${chk}">
    <label class="checkboxProp btn btn-outline-danger rounded-2" for="${chk}">${chk}</label>`
}

function createTemplateCheckbox(categories){
    let template=""
    for(let c of categories){
        template+=addCheckboxTemplate(c);
    }
    return template;
}

function renderCheckbox(){
    let arrCategories=new Set(data["events"].map(e=>e.category))
    let checkboxsContainer=document.getElementsByClassName("btn-group")[0];
    checkboxsContainer.innerHTML=createTemplateCheckbox(arrCategories)
}

//-----------RENDER AND LISTENERS----------------
renderCards(data["events"])
renderCheckbox()
document.getElementById("searchBar").addEventListener("input", applyFilter);
document.getElementById("checkboxGroup").addEventListener("change",applyFilter);











