//Te loansy maja byc z repozytorium
let loans = [
    {
        name: 'Edmund',
        amount: 90.00,
        returnDate: '9999-12-23',
        paid: false
    },
    {
        name: 'Wiktor',
        amount: 15.00,
        returnDate: '9999-11-09',
        paid:true
    }
];

//Logika widoku (tworzenie elementów)

let tbody= document.getElementById("tableBody");
let thead = document.getElementById("tableHead");

//Create headers
let newRowHead  = document.createElement("tr");

for(let header of Object.keys(loans[0])){
    let newTh = document.createElement("th");
    newTh.innerText= header;
    newRowHead.appendChild(newTh);
    thead.appendChild(newRowHead);
}

//Create row for buttons
let emptyColumn = document.createElement("th");
emptyColumn.innerText="Rozlicz";
newRowHead.appendChild(emptyColumn);
thead.appendChild(newRowHead);


//Create rows
loans.forEach(element => {
    let newRow=document.createElement('tr');

    let newDebtorName=document.createElement('td');
    newDebtorName.id='debtor';
    newDebtorName.innerHTML=element.name;

    let newAmount=document.createElement('td');
    newAmount.id='amount';
    newAmount.innerHTML=element.amount;

    let newReturnDate=document.createElement('td');
    newReturnDate.id='return-date';
    newReturnDate.innerHTML=element.returnDate;

    let newPaidFlag=document.createElement('td');
    newPaidFlag.id='is-paid';
    newPaidFlag.innerHTML=element.paid;

    let newPayButton = document.createElement("a");
    newPayButton.id="paid-btn";
    let textPayButton = document.createTextNode("Rozlicz");
    newPayButton.appendChild(textPayButton);
    newPayButton.classList.add("btn"); 
    newPayButton.classList.add("btn-primary");
    newPayButton.classList.add("btn-sm");
    newPayButton.classList.add("_table-row");
    newPayButton.value="Rozlicz";

    newRow.appendChild(newDebtorName);
    newRow.appendChild(newAmount);
    newRow.appendChild(newReturnDate);
    newRow.appendChild(newPaidFlag);
    newRow.appendChild(newPayButton);

    tbody.appendChild(newRow);    
});





