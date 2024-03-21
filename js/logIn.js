const loginButton = document.querySelector('.login-button');
const loginName = document.querySelector('#login');
const loginPassword = document.querySelector('#password1');
const loginInputs = modalLogin.querySelectorAll('input');
const modalBuyCard = document.querySelector('.modal-buyCard');
const bookTitle = document.querySelectorAll('.item-card__title');
const bookAutor = document.querySelectorAll('.item-card__author');
// const favoritesButton = document.querySelectorAll('.favorites-button');
// const modalForm = modalLogin.querySelector('.form-modal');

let returnUsers;
let currentUser;
let indexUser;

returnUsers = JSON.parse(localStorage.getItem("users"));
// let currentUser;


Array.from(bookTitle);
Array.from(bookAutor);

    
    if(returnUsers) {
        returnUsers = returnUsers;
    } else {
        returnUsers = [
            {
                firstName: 'John',
                lastName: 'Doe',
                email: 'johnDoe@gmail.com',
                password: 'RSSStage0',
                card: 'F00234030',
                visits: 22,
                bonuses: 1240,
                books: ['The Last Queen, Clive Irving', 'Dominicana, Angie Cruz'],
                buy: true,
                own: [3,7]
            }
        ];    
    }



    // loginUser();
    
// function loginUser() {


    loginButton.addEventListener('click', (event) => {

        event.preventDefault();
        getValidateLogInForm(event)
        

        if(isValid === true) {
            returnUsers.forEach(function (item, index){
                if(item.email === loginName.value || item.card === loginName.value) {
                    if(item.password === loginPassword.value) {
                        let indexUser = index;
                        currentUser = returnUsers[indexUser];
                        currentUser.visits = currentUser.visits + 1;
                        returnUsers[indexUser] = currentUser;

                        let serialObj = JSON.stringify(returnUsers);   
                        localStorage.setItem("users", serialObj);

                        isLogIn = true;

                        renderHeader(currentUser);
                        renderProfileCard (currentUser);
                        renderDigitalLibraryCard(currentUser);
                        renderFavoritesButton(currentUser);
                        rentedBooks(indexUser);

                        loginPassword.classList.remove('error');
                        loginName.classList.remove('error');

                        modalLogin.classList.add('hidden');
                        body.classList.remove('lock');

                        loginInputs.forEach(element => {
                            element.value = '';
                        })
                        
                    } else {
                        alert('password or user`s data is not correct');
                        loginPassword.classList.add('error');
                        loginName.classList.add('error');
                    }
                              
                } 
            })

        }      

    })

// }

    function getValidateLogInForm(e) {
        let loginNameVal = loginName.value,
            loginPasswordVal = loginPassword.value,
            emptyInputs = Array.from(loginInputs).filter(input => input.value === '');
    
            isValid = true;
    
        loginInputs.forEach(function (input) {
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
    
        if (loginPasswordVal.length < 8 ) {
            alert(' password not valid\n password must be at least 8 characters');
            e.preventDefault();
            loginPassword.classList.add('error');
            return isValid = false;
        } else {
            loginPassword.classList.remove('error');
        }
    
    }

function rentedBooks(indexUser) {
    // const favoritesButton = document.querySelectorAll('.favorites-button');
    user = JSON.parse(localStorage.getItem("users"))[indexUser];

    // console.log(user);
    // console.log(isLogIn);

        Array.from(favoritesButton);
    
    if(isLogIn === true) {

        // if(user.buy === true) {
            
        //     favoritesButton.forEach(function(element, index){
        //         element.addEventListener('click', () => {
        //             element.removeEventListener('click', showModalBuyCard);
        //             element.removeEventListener('click', showModalLogin);
        //             if(user.own.length <= 12) {
        //                 favoritesButton[index].setAttribute('disabled', true);
        //                 favoritesButton[index].innerText = 'Own';


        //                 user.own.push(index);

        //                 returnUsers[indexUser] = user;

        //                 let serialObj = JSON.stringify(returnUsers);   
        //                 localStorage.setItem("users", serialObj);

        //                 renderProfileCard (user);
        //                 renderDigitalLibraryCard(user);

        //                 console.log(isLogIn +"click2")
        //             }              
        //         })
        //     })
        // };

        // if(user.buy === false) {
        //     favoritesButton.forEach(function(element){
        //         element.addEventListener('click', showModaBuyCard) 
        //         element.removeEventListener('click', showModalLogin);             
        //         console.log(isLogIn +"click3")
        //     })
        // }; 


        // ***************************
        // favoritesButton.forEach(function(element, index){
        //     element.removeEventListener('click', showModalLogin); 
        //     element.removeEventListener('click', showModalBuyCard);
        // })
            
            favoritesButton.forEach(function(element, index){

                if(user.buy === false) {
                    element.removeEventListener('click', showModalLogin); 
                    element.addEventListener('click', showModalBuyCard); 
                
                }; 

                if(user.buy === true) {
                    element.addEventListener('click', () => {
                        element.removeEventListener('click', showModalBuyCard);
                        element.removeEventListener('click', showModalLogin);
                        if(user.own.length <= 16) {
                            favoritesButton[index].setAttribute('disabled', true);
                            favoritesButton[index].innerText = 'Own';


                            user.own.push(index);

                            returnUsers[indexUser] = user;

                            let serialObj = JSON.stringify(returnUsers);   
                            localStorage.setItem("users", serialObj);

                            renderProfileCard (user);
                            renderDigitalLibraryCard(user);

                        }              
                    })
                };
            })
        

        


        // ***************************
    }    
}

function showModalBuyCard() {
    showModal(modalBuyCard)
    console.log('card modal')
}

function renderFavoritesButton(user) {
    // const favoritesButton = document.querySelectorAll('.favorites-button');
    Array.from(favoritesButton);
    
    user.own.forEach((item) => {
        favoritesButton[item].setAttribute('disabled', true);
        favoritesButton[item].innerText = 'Own';
    })
}

