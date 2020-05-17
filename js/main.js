//self executing anonymous function
(function () {
	"use strict";
	console.log("SEAF has fired");

	//// variables ////
	var mobileNavBurger = document.querySelector("#mobileNav");
	var navMenu = document.querySelector("#navMenu");
	var sectionFrontCards = document.querySelectorAll(".sectionFront");
	var sectionBackCards = document.querySelectorAll(".sectionBack");
	var testimonials = document.querySelectorAll(".testimonialText");
	var circleButtons = document.querySelectorAll(".circleButton");
	var sliderButtonsGroup = document.querySelector("#sliderButtons");
	var navLinks = document.querySelectorAll("#navMenu ul li a");

	//// event listeners ////
	function flipCard(e) {
		// get card index from its id
		var cardHtmlId = e.currentTarget.id;
		var cardIndex = getIndex(cardHtmlId);
		sectionFrontCards[cardIndex].classList.toggle("invisible");
		sectionBackCards[cardIndex].classList.toggle("invisible");
	}

	function displayMenu(e) {
		navMenu.classList.toggle("invisible");
		mobileNavBurger.classList.toggle("openMenu");
	}

	// listener to provide a slider functionality on circle button click to navigate testimonials
	function testimonialSlider(e) {
		e.preventDefault();

		// mark slider circle button as selected
		var currCircle = e.currentTarget;
		currCircle.classList.add("selected");
		var currIndex = getIndex(currCircle.id);

		// show respective testimonial
		testimonials[currIndex].classList.remove("invisible");
		testimonials[currIndex].classList.add("visible");

		// remove selected class from other (previously) selected buttons
		// and hide their respective testimonial
		for (var i = 0; i < circleButtons.length; i++) {
			if (i != currIndex) {
				circleButtons[i].classList.remove("selected");
				testimonials[i].classList.remove("visible");
				testimonials[i].classList.add("invisible");
			}
			}
	}

	// listener to prevent default behaviour for the group of circle buttons, in case clicked outside the circles
	function preventLinkDefault(e) {
		e.preventDefault();
	}

	// listenr to apply greensock scroll animation for a smooth scroll to navigation links
	function smoothScroll(e) {
		e.preventDefault();
		var href = e.currentTarget.dataset.url;
		TweenLite.to(window, 1, { scrollTo: { y: "#" + href, offsetY: 3, autoKill: false } });
	}

	// helper function to parse index from an element's id
	function getIndex(elemId) {
		return parseInt(elemId.slice(elemId.length - 1, elemId.length));
	}

	//// listeners ////	
	// add listeners for card flip on card click

	// NB: functinoality working but not ideal, since the css of the back cards needs to be altered to have full height as front cards
	// 		the use of css has been implemented but was not compatible with grid
	for (var i = 0; i < sectionFrontCards.length; i++) {
		sectionFrontCards[i].addEventListener("click", flipCard, false);
		sectionBackCards[i].addEventListener("click", flipCard, false);
	}

	for (var i = 0; i < circleButtons.length; i++) {
		circleButtons[i].addEventListener("click", testimonialSlider, false);
	}

	mobileNavBurger.addEventListener("click", displayMenu, false);
	sliderButtonsGroup.addEventListener("click", preventLinkDefault, false);

	for (var i = 0; i < navLinks.length; i++) {
		navLinks[i].addEventListener("click", smoothScroll);
	}
})();