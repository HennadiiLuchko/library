const seasonBtn = document.querySelectorAll('.real-radio');
const radioTitle = document.querySelectorAll('.radio-title');
const favoritesCards= document.querySelectorAll('.favorites-cards');

let indexRadioTitle = 0;
let seasonTitle = 'favorites-winter';

seasonBtn.forEach((el) => {

    let indexRadioTitle = 0;
    let seasonTitle = 'favorites-winter';

    el.addEventListener('change', function(e) {
        
        if(el.checked && el.value === 'winter') {
            indexRadioTitle = 0;
            seasonTitle = 'favorites-winter';
		};

        if(el.checked && el.value === 'spring') {
            indexRadioTitle = 1;
            seasonTitle = 'favorites-spring';
		};

        if(el.checked && el.value === 'summer') {
            indexRadioTitle = 2;
            seasonTitle = 'favorites-summer';
		};

        if(el.checked && el.value === 'autumn') {
            indexRadioTitle = 3;
            seasonTitle = 'favorites-autumn';
		};

        getLabelChaked(indexRadioTitle);
        showSeasonItems(seasonTitle);
    })
})

const getLabelChaked = (idx) => {
    radioTitle.forEach((el) => {
        if(el.classList.contains('radio-checked')) {
            el.classList.remove('radio-checked');            
        }
    })
    radioTitle[idx].classList.add('radio-checked');
}

const showSeasonItems = (season) => {
    favoritesCards.forEach((el) => {
        if(!el.classList.contains('hidden')) {
            el.classList.add('hidden');            
        }

        if(el.classList.contains(`${season}`)) {
            el.classList.remove('hidden');            
        }
    })
}

