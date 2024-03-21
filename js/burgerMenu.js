const menuBtn = document.querySelector('.burger');
const menu = document.querySelector('.nav-list');
const navLink = document.querySelectorAll('.nav-link');
const body = document.body;

menuBtn.addEventListener('click', function(event) {

	event.stopPropagation();

	setTimeout(() => {
				menuBtn.classList.toggle('active');
				menu.classList.toggle('active');
				body.classList.toggle('lock');
				if (!profileMenu.classList.contains('hidden') ) {
						profileMenu.classList.add('hidden')	
				}
			}, 200); 

})

Array.from(navLink);

navLink.forEach((el) => {
		el.addEventListener('click', () => {
			setTimeout(() => {
				menuBtn.classList.remove('active');
				menu.classList.remove('active');
				body.classList.remove('lock')
			}, 200);
		})
	});

window.onclick = function(event) {
	
	if (event.target !== menu
		&& event.target !== menuBtn
		&& !event.target.classList.contains('nav-link') 
		&& menuBtn.classList.contains('active')) {

			menuBtn.classList.remove('active');
			menu.classList.remove('active');
			body.classList.remove('lock')		
	}
	
} 
