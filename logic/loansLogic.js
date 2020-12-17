let loans = repo.getAllLoans();

// Main div for loans
let loansMainDiv = document.getElementById("loansMainDiv");

//Create loans elements
loans.forEach(element => {
    let newDiv = document.createElement("div");
    newDiv.classList.add('col-md-4');

    let newSpan = document.createElement("span");
    newSpan.classList.add('fa-stack','fa-4x');
    
    let newI1 = document.createElement("i");
    newI1.classList.add('fas','fa-circle','fa-stack-2x','text-primary');

    let newI2 = document.createElement("i");
    newI2.classList.add('fas','fa-shopping-cart','fa-stack-1x','fa-inverse');

    let newH4 = document.createElement("h4");
    newH4.classList.add('my-3');

    let newP = document.createElement('p');
    newP.classList.add('text-muted'); 

    // Moze dac klase ktora bedzie dodawac x lub v w zaleznosci czy zaplacone
    let paidInd = element.paid ? 'paid' : 'not paid';
    newH4.innerHTML= element.name + ' | ' + element.amount + ' zł';
    newP.innerHTML=element.returnDate + ' | ' + paidInd

    newDiv.appendChild(newSpan);
    newSpan.appendChild(newI1);
    newSpan.appendChild(newI2);
    newDiv.appendChild(newH4);
    newDiv.appendChild(newP);

    loansMainDiv.appendChild(newDiv);
    
});

//dodac js po kliknieciu mozna oznaczyc jako spłacone
//dodac js po najechaniu animacja np. duze V zielone lub napis zapłać




