const dropMenuLogin = document.querySelector('.drop-menu__login');
const dropMenuRegister = document.querySelector('.drop-menu__register');
const modalSignup = document.querySelector('.modal-signup');
const modalLogin = document.querySelector('.modal-login');
const accountInfoLogin = document.querySelector('.account-info__login');
const accountInfoSignup = document.querySelector('.account-info__signup');
const loginDescription = modalLogin.querySelector('.form-modal__description-span');
const signupDescription = modalSignup.querySelector('.form-modal__description-span');
const dropMenuProfile = document.querySelector('.drop-menu__profile');
const dropMenuLogout = document.querySelector('.drop-menu__logout');
const modalProfile = document.querySelector('.modal-profile');


if(dropMenuLogin) {
    dropMenuLogin.addEventListener('click', () => {
        profileMenu.classList.add('hidden');
        showModal(modalLogin);
    
    });
}

if(dropMenuRegister) {
    dropMenuRegister.addEventListener('click', () => {
        profileMenu.classList.add('hidden');
        showModal(modalSignup);
    });
}


loginDescription.addEventListener('click', () => {
    modalLogin.classList.add('hidden');
    showModal(modalSignup);

});

signupDescription.addEventListener('click', () => {
    modalSignup.classList.add('hidden');
    showModal(modalLogin);
});

accountInfoLogin.addEventListener('click', () => showModal(modalLogin));

accountInfoSignup.addEventListener('click', () => showModal(modalSignup));

if(dropMenuProfile) {
    dropMenuProfile.addEventListener('click', () => {
        profileMenu.classList.add('hidden');
        showModal(modalProfile);
    });
}


function showModal(modal) {
    
    modal.classList.remove('hidden');
    body.classList.add('lock')


    window.addEventListener('click', (event) => {
        const target = event.target;
        // event.stopPropagation();
        
        if(target.classList.contains('overlay')
         || target.classList.contains('close-icon')) {
                modal.classList.add('hidden');
                body.classList.remove('lock');
        }
    })
}