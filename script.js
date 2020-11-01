const menuIcon = document.querySelector(".fa-bars");
const menu = document.querySelector("nav ul");
const closingIcon = document.querySelector(".fa-times"); 
const body = document.querySelector("body"); 

const openMenu = () => {
	menu.style.display = "flex";
	body.classList.add("scroll-disabled");
	menu.className = "menu-slidein";
};

const closeMenu = () => {
	body.classList.remove("scroll-disabled");
	menu.className = "menu-slideout";
};

menuIcon.addEventListener("click", openMenu);

closingIcon.addEventListener("click", closeMenu);

window.addEventListener("resize", () => {
	if (window.innerWidth > 768) {
		menu.classList = [];
		menu.style.display = "flex";
	} else {
		menu.style.display = "none";
	}
});