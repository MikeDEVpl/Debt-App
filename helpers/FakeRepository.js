class Repository{
    getAllEvents() {
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
        return events;
    }
    
    getAllLoans(){
        let loans = [
            {
                name: 'Stefan',
                amount: 90.00,
                returnDate: '2020-12-23'
            },
            {
                name: 'Alojzy',
                amount: 15.00,
                returnDate: '2020-11-09'
            }
        ];
        return loans;
    }

    getExpensesForEvent(eventName){
    
        if (eventName === 'Wyjazd') {
            let expenses = [
                {
                    name: 'Piwo',
                    cost: 200.00
                }
            ];
            return expenses
        }
        if(eventName === 'Koncert')
        {
            let expenses = [
                {
                    name: 'Grill',
                    cost: 75.00
                }
            ];
            return expenses
        }

    }

}
