const carouselButton = document.querySelectorAll('.carousel-button');
const sliderLine = document.querySelector('.slider-line');
const carretLeft = document.querySelector('.carret-left');
const carretRight = document.querySelector('.carret-right');

let sliderCount = 0;

carretLeft.addEventListener('click', prevSlide);
carretRight.addEventListener('click', nextSlide);



function nextSlide() {
    sliderCount++;

    if(carretLeft.classList.contains('carret__disable')) {
        carretLeft.classList.remove('carret__disable')
    }

    if(sliderCount >= 4) {
        sliderCount = 4;
        carretRight.classList.add('carret__disable');
    }

    rowSlider();
    thisSlider(sliderCount);
}

function prevSlide() {
    sliderCount--;

    if(carretRight.classList.contains('carret__disable')) {
        carretRight.classList.remove('carret__disable');
    }

    if(sliderCount <= 0) {
        sliderCount = 0;
        carretLeft.classList.add('carret__disable');
    }

    rowSlider();
    thisSlider(sliderCount);
}

function rowSlider() {
    sliderLine.style.transform = `translateX(${- sliderCount * 475}px)`
}


function thisSlider(index) {
    carouselButton.forEach(item => {
        if(item.classList.contains('carousel-button_active')) {
            item.classList.remove('carousel-button_active');
            item.classList.add('carousel-button_inert');            
        }
    })

    carouselButton[index].classList.remove('carousel-button_inert')
    carouselButton[index].classList.add('carousel-button_active')

} 

carouselButton.forEach((item, index) => {
    item.addEventListener('click', () => {
        sliderCount = index;
        rowSlider();
        thisSlider(sliderCount);
        
        if(sliderCount <= 0) {
            carretLeft.classList.add('carret__disable');
        } else if(sliderCount >= 4) {
            carretRight.classList.add('carret__disable');
        } else {
            if(carretRight.classList.contains('carret__disable')) {
                carretRight.classList.remove('carret__disable');
            }
            if(carretLeft.classList.contains('carret__disable')) {
                carretLeft.classList.remove('carret__disable')
            }
        }
    })
}) 

window.addEventListener('resize', () => {
    
    if(window.screen.availWidth > 1024) {
        if(sliderCount === 3 || sliderCount === 4) {
            sliderCount = 2;
            rowSlider();
            thisSlider(sliderCount);
        }
    }
    
})