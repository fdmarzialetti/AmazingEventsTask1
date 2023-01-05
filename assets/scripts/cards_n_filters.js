//---------------CARDS FUNCTIONS--------------

function addCardTemplate(card){
    return `<div class="col col-md-6 col-lg-3">
                <div class="card">
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
    let currentDate = data['currentDate'];
    let pageName=document.getElementsByTagName('h1')[0].innerHTML;
    let template="";
    switch(pageName){
        case "Home":{
            for(let e of events){
                template+=addCardTemplate(e);
            }
            return template;
        }
        case "Past Events":{
            for(let e of events){
                if(e.date < currentDate){
                    template+=addCardTemplate(e);
                }
            }
            return template;
        }
        case "Upcomming Events":{
            for(let e of events){
                if(e.date >= currentDate){
                    template+=addCardTemplate(e);
                }
            }
            return template;
        }
    }
}

function showCards(events){
    let cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML=createTemplateCards(events);
}

//-----------CHECKBOX/SEARCH FUNCTIONS---------

function filterByCheckbox(){
    let arrCategories = document.querySelectorAll("input[type=checkbox]:checked")
    arrCategories = Array.from(arrCategories).map(chkCategory=>chkCategory.name)
    if(arrCategories.length === 0){
        //Si no hay ningun checkbox checked retorna todos los eventos.
        return data['events'];
    }  else{
        //Sino..
        //Filtra las cartas que compartan categoria con el arreglo de categorias.
        let filteredEvents=[]
        filteredEvents = data["events"].filter(event=>arrCategories.includes(event["category"]))
        return filteredEvents; 
    }
}

function filterBySearch(events){
    //Toma el value del input search.
    let searchValue = document.getElementById("searchBar").value;
    //Si el value no es vacio.
    if(searchValue!==""){
        //Filtra los eventos que compartan nombre con el value.
        events=events.filter(e=>e.name.toLowerCase().includes(searchValue.toLowerCase()))
    }
    return events
}

function applyFilter(){
    //Aplica el filtro de checkbox y al resultado, el filtro search.
    //y Muestra las cartas filtradas.
    showCards(filterBySearch(filterByCheckbox()));
}

function addCheckboxTemplate(chk){
    return `<input type="checkbox" class="btn-check" id="${chk}" name="${chk}">
    <label class="btn btn-outline-danger checkboxProp rounded-2" for="${chk}">${chk}</label>`
}

function createTemplateCheckbox(categories){
    let template=""
    for(let c of categories){
        template+=addCheckboxTemplate(c);
    }
    return template;
}

function showCheckbox(){
    //Crea un arreglo de categorias unicas mediante el objeto Set.
    let arrCategories=new Set(data["events"].map(e=>e.category))
    let checkboxsContainer=document.getElementsByClassName("btn-group")[0];
    //Inserto los checkboxs en el contenedor correspondiente. 
    checkboxsContainer.innerHTML=createTemplateCheckbox(arrCategories)
}


//-----------RENDER AND LISTENERS----------------
showCards(data["events"])
showCheckbox()
document.getElementById("searchBar").addEventListener("input", applyFilter);
document.getElementById("checkboxGroup").addEventListener("change",applyFilter);










