
const profileMenuUser = document.querySelector('.profile-menu');
const favoritesButtonContainer = document.querySelectorAll('.favorites-button__container');

function renderHeader(user) {
    if(isLogIn === false) {
        profileIcon.innerHTML = '';
        profileIcon.insertAdjacentHTML('afterbegin', `
            <div class="profile-icon"></div>
        `);
        profileMenu.innerHTML = '';
        profileMenu.insertAdjacentHTML('afterbegin', `
            <h4 class="drop-menu__title">Profile</h4>
            <ul class="list drop-menu__list">
                <li class="drop-menu__login">Log In</li>
                <li class="drop-menu__register">Register</li>
            </ul>
        `);

        const dropMenuLogin = document.querySelector('.drop-menu__login');
        const dropMenuRegister = document.querySelector('.drop-menu__register');

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
    
    }

    if(isLogIn === true) {
    
        profileIcon.innerHTML = '';
        profileIcon.insertAdjacentHTML('afterbegin', `
            <div class="profile-icon__user" title = "${user.firstName + ' ' + user.lastName}">${user.firstName.at(0).toUpperCase() + user.lastName.at(0).toUpperCase()}</div> 
        `);
        profileMenu.innerHTML = '';
        profileMenu.insertAdjacentHTML('afterbegin', `
            <h4 class="drop-menu__title user-card">${user.card}</h4>
            <ul class="list drop-menu__list">
                <li class="drop-menu__profile">My profile</li>
                <li class="drop-menu__logout">Log Out</li>
            </ul>
        `);

    const dropMenuProfile = document.querySelector('.drop-menu__profile');
    if(dropMenuProfile) {
        dropMenuProfile.addEventListener('click', () => {
            profileMenu.classList.add('hidden');
            showModal(modalProfile);
        });
    }
    }

    const dropMenuLogOut = document.querySelector('.drop-menu__logout');
    if(dropMenuLogOut) {
        dropMenuLogOut.addEventListener('click', () => {
            isLogIn = false;
            renderHeader(user);
            renderDigitalLibraryCard(user);
            renderFavoritesButtonContainer();

        });
    }
   
}



function renderProfileCard (user) {
    const userLogoAvatar = modalProfile.querySelector('.user-logo__avatar');
    const userLogoNameFirst = modalProfile.querySelector('.user-logo__nameFirst');
    const userLogoNameSecond = modalProfile.querySelector('.user-logo__nameSecond');
    const visitsNumber = modalProfile.querySelector('.visits-number');
    const bonusesNumber = modalProfile.querySelector('.bonuses-number');
    const booksNumber = modalProfile.querySelector('.book-number');
    const rantedBooksList = modalProfile.querySelector('.ranted-books__list');
    const cardNumberInfo = modalProfile.querySelector('.card-number__info');
    const cardNumberCopy = modalProfile.querySelector('.card-number__icon');

    if(isLogIn === true) {
        userLogoAvatar.innerText = user.firstName.at(0).toUpperCase() + user.lastName.at(0).toUpperCase();
        userLogoNameFirst.innerText = user.firstName;
        userLogoNameSecond.innerText = user.lastName;
        visitsNumber.innerText = user.visits;
        bonusesNumber.innerText = user.bonuses || 0;
        booksNumber.innerText = user.own.length || 0;
        cardNumberInfo.innerText = user.card;


        cardNumberCopy.onclick = function() {
            let text = cardNumberInfo.innerText;
        
            navigator.clipboard.writeText(text)
            .then(() => {
                alert('Card number copied to clipboard');
            })
            .catch(err => {
                console.error('Error in copying card number: ', err);
            });
        }
        rantedBooksList.innerHTML = "";
        user.own.forEach(item => {
            rantedBooksList.insertAdjacentHTML('beforeend', `
                <li>${bookTitle[item].innerText.toLowerCase()}, ${bookAutor[item].innerText.split(" ").slice(1).join(" ")}</li>
            `)
        })

    }

}

function renderDigitalLibraryCard(user) {
    const digitalLibraryCard = document.querySelector('.library-card');
    const libraryCardTitle = digitalLibraryCard.querySelector('h3');
    const libraryCardReaderName = digitalLibraryCard.querySelector('.reader-name');
    const libraryCardReaderCard = digitalLibraryCard.querySelector('.reader-card');
    const buttonContainer = digitalLibraryCard.querySelector('.button-container');
    const accountInfoTitle = digitalLibraryCard.querySelector('.account-info__title');
    const accountInfoDescription = digitalLibraryCard.querySelector('.account-info__description');
    const accountInfoButtons = digitalLibraryCard.querySelector('.account-info__buttons');


    if(isLogIn === true) {
        libraryCardTitle.innerText = 'Your Library card';
        libraryCardReaderName.value = `${user.firstName + ' ' + user.lastName}`;
        libraryCardReaderCard.value = `${user.card}`;

        buttonContainer.innerHTML = "";
        buttonContainer.insertAdjacentHTML('afterbegin', `
            <div class="library-card__profile">
                <div class="library-card__visits">
                    <p class="library-card__subtitle">visits</p>
                    <div class="visits-icon"></div>
                    <span class="visits-number">${user.visits}</span> 
                </div>
                <div class="library-card__bonuses">
                    <p class="library-card__subtitle">bonuses</p>
                    <div class="bonuses-icon"></div>
                    <span class="bonuses-number">${user.bonuses}</span> 
                </div>
                <div class="library-card__book">
                    <p class="library-card__subtitle">books</p>
                    <div class="book-icon"></div>
                    <span class="book-number">${user.own.length}</span> 
                </div>
            </div>
        `)
    
        accountInfoTitle.innerText = 'Visit your profile';
        accountInfoDescription.innerText = 'With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.';

        accountInfoButtons.innerHTML = "";
        accountInfoButtons.insertAdjacentHTML('afterbegin', `
            <button class="button account-info__profile">Profile</button>
        `)

        const accountInfoProfile = digitalLibraryCard.querySelector('.account-info__profile');

        accountInfoProfile.addEventListener('click', () => showModal(modalProfile));
    }

    if(isLogIn === false) {
        libraryCardTitle.innerText = 'Find your Library card';
        libraryCardReaderName.value = '';
        libraryCardReaderCard.value = '';

        buttonContainer.innerHTML = "";
        buttonContainer.insertAdjacentHTML('afterbegin', `
        <button class="button library-card__formBtn" disabled>Check the card</button>
        `);

        accountInfoTitle.innerText = 'Get a reader card';
        accountInfoDescription.innerText = 'You will be able to see a reader card after logging into account or you can register a new account';

        accountInfoButtons.innerHTML = "";
        accountInfoButtons.insertAdjacentHTML('afterbegin', `
            <button class="button account-info__signup">Sign Up</button>
            <button class="button account-info__login">Log in</button>
        `)

        const accountInfoLogin = document.querySelector('.account-info__login');
        const accountInfoSignup = document.querySelector('.account-info__signup');

        accountInfoLogin.addEventListener('click', () => showModal(modalLogin));
        accountInfoSignup.addEventListener('click', () => showModal(modalSignup));
    }

}

function renderFavoritesButtonContainer() {
    favoritesButtonContainer.forEach((item) => {
        item.innerHTML = '';
        item.insertAdjacentHTML('afterbegin', `
            <button class="button favorites-button">Buy</button>
    `)
    })
}