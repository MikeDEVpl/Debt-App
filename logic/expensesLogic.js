// 1. Stworzenie listy zdarzen (docelowo za pomocą getAllEvents)
// 2. Dla wybranego zdarzenia zwrocenie wydatkow w postaci listy (docelowo za pom getExpensesForEvent)

let events = [
    {
        name: 'Wyjazd',
        date: '2020-10-11',
        participants: [ 
            {
                name: 'Michał',
                surname: 'Kichał'
            },
            {
                name: 'Jurek',
                surname: 'Spurek'
            }
        ],
        ended: true
    },
    {
        name: 'Koncert',
        date: '2020-08-22',
        participants: [ 
            {
                name: 'Marcin',
                surname: 'Arcin'
            },
            {
                name: 'Kot',
                surname: 'Mruczek'
            }
        ],
        ended: false
    }    
];

let expenses = [
    {
        name: 'Piwo',
        cost: 200.00,
        sponsoredBy:'Jerzy'
    },  {
        name: 'Grill',
        cost: 75.00,
        sponsoredBy:'Maciek'
    }];
    
let selectEvent = document.getElementById("selectEvent");

events.forEach(element => {
    let newOption=document.createElement('option');
    newOption.appendChild(document.createTextNode(element.name));
    newOption.value=element.name;
    selectEvent.appendChild(newOption);
});


//Tworzenie kart dla expense
let cardContainer=document.getElementById("cardContainer");

expenses.forEach(element => {
    // div card
    let newCard = document.createElement('div');
    newCard.classList.add("card");
    newCard.style='width: 8rem; margin: 20px';

    //card body
    let newCardBody=document.createElement('div');
    newCardBody.classList.add('card-body');
    
    //card title
    let newCardTitle = document.createElement('h5');
    newCardTitle.appendChild(document.createTextNode(element.name));
    newCardTitle.classList.add('card-title');

    //card-text
    let newCardText = document.createElement('p');
    newCardText.appendChild(document.createTextNode(element.sponsoredBy));
    newCardText.classList.add('card-text');

    //card button
    let newCardButton = document.createElement('a');
    newCardButton.classList.add('btn');
    newCardButton.classList.add('btn-primary');
    newCardButton.appendChild(document.createTextNode(element.cost));


    newCardBody.appendChild(newCardTitle);
    newCardBody.appendChild(newCardText);
    newCardBody.appendChild(newCardButton);

    newCard.appendChild(newCardBody);
    cardContainer.appendChild(newCard);
});


