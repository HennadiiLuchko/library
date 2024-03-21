const profileIcon = document.querySelector('.profile-icon__wrapper');
const profileMenu = document.querySelector('.profile-menu__drop');

profileIcon.addEventListener('click', (event) => {
    event.stopPropagation();

    setTimeout(() => {
        profileMenu.classList.toggle('hidden');
        if (menu.classList.contains('active') ) {
            menu.classList.remove('active')	;
            menuBtn.classList.remove('active')
            body.classList.remove('lock');	
        }
    }, 400); 
    
})


window.onclick = function(event) {
	
	if (event.target !== profileMenu
		&& !profileMenu.classList.contains('hidden') ) {
            profileMenu.classList.add('hidden')	
	}
	
} 
