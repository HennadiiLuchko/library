// const userFirstName = document.querySelector('#firstName');
// const userLastName = document.querySelector('#lastName');
const userEmail = document.querySelector('#email');
const userPassword = document.querySelector('#password2');
const signupButton = document.querySelector('.signup-button');
const modalForm = modalSignup.querySelector('.form-modal');
const formInputs = modalSignup.querySelectorAll('input');
 const favoritesButton = document.querySelectorAll('.favorites-button');

let isLogIn = false;
let cardNumber;
let isValid;
let users = JSON.parse(localStorage.getItem("users"));

if(users) {
    users = users;
} else {
    users = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johnDoe@gmail.com',
            password: 'RSSStage0',
            card: 'F00234030',
            visits: 22,
            bonuses: 1240,
            own: [3,7],
            buy: true,
        }
    ];    
}

signupButton.addEventListener('click', (event) => {
    event.preventDefault();
   
    let userData = {};

    getCardNamber(users);

    getValidateForm(event)

    if(isValid === true) {
        for(let {name, value} of modalForm.elements) {
            if(name) {
                userData[name] = value;
            }
        }
    
        modalSignup.classList.add('hidden');
        body.classList.remove('lock');
    
        userData.card = cardNumber;
        userData.visits = 1;
        userData.buy = false;
        userData.own = [];
        userData.bonuses = 0;
        
    
        users.push(userData);
        let serialObj = JSON.stringify(users);
    
        localStorage.setItem("users", serialObj);
        isLogIn = true;


        // вызовы рендерных функций по отображению
        const checkCardBtn = document.querySelector('.library-card__formBtn');
        checkCardBtn.removeAttribute('disabled');
        renderProfileCard (userData);
        renderHeader(userData);
        findLibraryCard(userData);
        
        isLogIn = false;
        const loginButton = document.querySelector('.login-button');
        returnUsers = JSON.parse(localStorage.getItem("users"));
        indexUser =  returnUsers.length - 1;

        getfavoritesButton();
       
        formInputs.forEach(element => {
            element.value = '';
        })
    
    }

})


function getCardNamber(obj) {

    cardNumber = Math.floor((Math.random() * Math.pow(16, 9))).toString(16).toUpperCase();

    obj.forEach(element => {
        if(element.card === cardNumber) {
            getCardNamber(obj)
        }
    });

    return cardNumber
}


// VALIDATION FORM


function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

 function getValidateForm(e) {
    let emailVal = userEmail.value,
        passwordVal = userPassword.value,
        emptyInputs = Array.from(formInputs).filter(input => input.value === '');

        isValid = true;

    formInputs.forEach(function (input) {
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

    if(!validateEmail(emailVal)) {
       alert('email not valid');
	   	e.preventDefault();
           userEmail.classList.add('error');
        return isValid = false;
    } else {
        userEmail.classList.remove('error');
    }

    if (passwordVal.length < 8 ) {
        alert(' password not valid\n password must be at least 8 characters');
		e.preventDefault();
        userPassword.classList.add('error');
        return isValid = false;
    } else {
        userPassword.classList.remove('error');
    }

    users.forEach(function (item){
        if(item.email === emailVal) {
            alert('this email is already registered');
            e.preventDefault();
            userEmail.classList.add('error');
         return isValid = false;
        } else {
         userEmail.classList.remove('error');
         }      
    })

}


function findLibraryCard() {
    const checkCardBtn = document.querySelector('.library-card__formBtn');
    checkCardBtn.removeAttribute('disabled');
    //   checkCardBtn.setAttribute('disabled', true);

    checkCardBtn.addEventListener('click', (event) => {
       
        validateFindLibraryCard(event);
        
        if(isValid === true) {
            const digitalLibraryCard = document.querySelector('.library-card');
            const buttonContainer = digitalLibraryCard.querySelector('.button-container');
            const libraryCardReaderName = digitalLibraryCard.querySelector('.reader-name');
            const libraryCardReaderCard = digitalLibraryCard.querySelector('.reader-card');

            let returnUsers = JSON.parse(localStorage.getItem("users"));
            let currentUser

            returnUsers.forEach(function (item, index){
                if(item.card === libraryCardReaderCard.value) {
                    if(item.firstName === libraryCardReaderName.value.split(" ")[0] 
                    && item.lastName === libraryCardReaderName.value.split(" ")[1]) {
                        let indexUser = index;
                        currentUser = returnUsers[indexUser];

                        const libraryCardProfile = digitalLibraryCard.querySelector('.library-card__profile');
                        const visitsNumber = digitalLibraryCard.querySelector('.visits-number');
                        const bonusesNumber = digitalLibraryCard.querySelector('.bonuses-number');
                        const bookNumber = digitalLibraryCard.querySelector('.book-number');
  
                        visitsNumber.innerText = currentUser.visits;
                        bonusesNumber.innerText = currentUser.bonuses;
                        bookNumber.innerText = currentUser.own.length;
  
                        libraryCardProfile.classList.remove('hidden');
  
                      setTimeout(() => {
                          libraryCardProfile.classList.add('hidden');         
                          libraryCardReaderCard.value = "";
                          libraryCardReaderName.value = "";                 
                      }, 10000); 
                    }
                }
            })
        }
    })
}

function validateFindLibraryCard(e) {
    const libraryCardForm = document.querySelector('.library-card__form');
    const formInputs = libraryCardForm.querySelectorAll('input');
    
    let  emptyInputs = Array.from(formInputs).filter(input => input.value === '');

        isValid = true;

    formInputs.forEach(function (input) {
        if (input.value === '') {
            input.classList.add('error');
			e.preventDefault();
            return isValid = false;
        } else {
            input.classList.remove('error');
            e.preventDefault();
        }
    });

    if (emptyInputs.length !== 0) {
        alert('inputs not filled');
		e.preventDefault();
        return isValid = false;
    }
}

// rented books
function getfavoritesButton() {
    // const favoritesButton = document.querySelectorAll('.favorites-button');

    favoritesButton.forEach(function(element){
        if(isLogIn === false) {
            element.addEventListener('click', showModalLogin)
        
        }   
    })
}

function showModalLogin() {
    showModal(modalLogin)
}

getfavoritesButton();