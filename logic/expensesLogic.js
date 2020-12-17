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

//let expenses = repo.getAllDataForEvent('Wyjazd');

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
    
// let selectEvent = document.getElementById("selectEvent");

// events.forEach(element => {
//     let newOption=document.createElement('option');
//     newOption.appendChild(document.createTextNode(element.name));
//     newOption.value=element.name;
//     selectEvent.appendChild(newOption);
// });

//Main div
let timelineMainDiv= document.getElementById('timelineMainDiv');


//Display logic
var count = 0;
expenses.forEach(element => {
    let newLi = document.createElement('li');

    newLi.classList.add(count %2 ? 'timeline' : 'timeline-inverted');
    count +=1;

    let newDivLogo = document.createElement("div");
    newDivLogo.classList.add('timeline-image');
    let newImg = document.createElement('img');
    newImg.src = "/images/expenses/1.jpg";
    newImg.alt ="";
    newImg.classList.add('rounded-circle', 'img-fluid');

    let newDivPanel= document.createElement('div');
    newDivPanel.classList.add('timeline-panel');

    let newDivHeading = document.createElement('div');
    newDivHeading.classList.add('timeline-heading');
    
    let newH4_1 = document.createElement('h4');
    newH4_1.innerHTML=element.cost;
    
    let newH4_2 = document.createElement('h4');
    newH4_2.classList.add('subheading');
    newH4_2.innerHTML = element.name;

    let newDivBody = document.createElement('div');
    newDivBody.classList.add('timeline-body');

    let newP = document.createElement('p');
    newP.classList.add('text-muted');
    newP.innerHTML = 'Sponsored by: ' + element.sponsoredBy;

    newDivLogo.appendChild(newImg);
    newDivHeading.appendChild(newH4_1);
    newDivHeading.appendChild(newH4_2);
    newDivPanel.appendChild(newDivHeading);
    newDivPanel.appendChild(newDivBody);
    newDivBody.appendChild(newP);
    

    newLi.appendChild(newDivLogo);
    newLi.appendChild(newDivPanel);

    timelineMainDiv.appendChild(newLi);
});


//new expense circle
let newLiFooter = document.createElement('li');
newLiFooter.classList.add('timeline-inverted');

let newDivFooter = document.createElement("div");
newDivFooter.classList.add('timeline-image');
let newH4 = document.createElement('h4');
newH4.innerHTML= 'Add' + '<br />' + 'new' + '<br/>' + 'expenses';

newDivFooter.appendChild(newH4);
newLiFooter.appendChild(newDivFooter);
timelineMainDiv.appendChild(newLiFooter);

