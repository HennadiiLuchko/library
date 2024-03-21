const buyCardButton = document.querySelector('.buyCard-button');
const buyCardInputs = modalBuyCard.querySelectorAll('input');
const bankCardNumber = modalBuyCard.querySelector('#bankCardNumber');
const month = modalBuyCard.querySelector('#month');
const year = modalBuyCard.querySelector('#year');
const cvc = modalBuyCard.querySelector('#cvc');


buyCardButton.addEventListener('click', (event) => {

    event.preventDefault();
    getValidateBuyCardForm(event)
   
    if(isValid === true) {

        currentUser = JSON.parse(localStorage.getItem("users"))[indexUser];
        currentUser.buy = true;
        returnUsers[indexUser] = currentUser;
        let serialObj = JSON.stringify(returnUsers);   
        localStorage.setItem("users", serialObj);

        modalBuyCard.classList.add('hidden');
        body.classList.remove('lock');

        rentedBooks(indexUser)

        buyCardInputs.forEach(element => {
            element.value = '';
        })

        favoritesButton.forEach(function(element){ 
            element.removeEventListener('click', showModalBuyCard);
        })
        
    }
})


function validateNumber(number) {
    let re = /^[0-9\s]*$/;
    return re.test(String(number));
}

function getValidateBuyCardForm(e) {
    let bankCardNumberVal = bankCardNumber.value.trim().replaceAll(' ', ''),
        monthVal = month.value.trim().replaceAll(' ', ''),
        yearVal = year.value.trim().replaceAll(' ', ''),
        cvcVal = cvc.value.trim().replaceAll(' ', ''),
        emptyInputs = Array.from(buyCardInputs).filter(input => input.value === '');

        isValid = true;

    buyCardInputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('error');
            e.preventDefault();
            return isValid = false;
        } else {
            input.classList.remove('error');
        }
    });

    if (emptyInputs.length !== 0) {
        alert('inputs not filled');
        e.preventDefault();
        return isValid = false;
    }

    // Validation Bank card number

    if (!validateNumber(bankCardNumberVal)) {
        alert('Bank card number not valid');
		e.preventDefault();
        bankCardNumber.classList.add('error');
        return false;
    } else {
        bankCardNumber.classList.remove('error');
    }

    if (bankCardNumberVal.length !== 16) {
        alert('Bank card number not valid\n Bank card number must contain 16 digits');
        e.preventDefault();
        bankCardNumber.classList.add('error');
        return isValid = false;
    } else {
        bankCardNumber.classList.remove('error');
    }

    // Validation Expiration code Month

    if (!validateNumber(monthVal)) {
        alert('Expiration code Month not valid');
		e.preventDefault();
        month.classList.add('error');
        return false;
    } else {
        month.classList.remove('error');
    }
    
    if (monthVal.length !== 2) {
        alert('Expiration code Month not valid\n Expiration code Month must contain 2 digits');
        e.preventDefault();
        month.classList.add('error');
        return isValid = false;
    } else {
        month.classList.remove('error');
    }

    // Validation Expiration code Year

    if (!validateNumber(yearVal)) {
        alert('Expiration code Year not valid');
		e.preventDefault();
        year.classList.add('error');
        return false;
    } else {
        year.classList.remove('error');
    }
    
    if (yearVal.length !== 2) {
        alert('Expiration code Year not valid\n Expiration code Year must contain 2 digits');
        e.preventDefault();
        year.classList.add('error');
        return isValid = false;
    } else {
        year.classList.remove('error');
    }

    // Validation CVC

    if (!validateNumber(cvcVal)) {
        alert('CVC not valid');
		e.preventDefault();
        cvc.classList.add('error');
        return false;
    } else {
        cvc.classList.remove('error');
    }
    
    if (cvcVal.length !== 3) {
        alert('CVC not valid\n CVC must contain 3 digits');
        e.preventDefault();
        cvc.classList.add('error');
        return isValid = false;
    } else {
        cvc.classList.remove('error');
    }
}
