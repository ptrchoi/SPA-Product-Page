/*  
    FreeCodeCamp Responsive Web Design Project: 
    >PRODUCT LANDING PAGE<

    > PURE/VANILLA JAVASCRIPT
*/

/* ==================== REQUIRED FILES DUE TO PARCEL BUNDLING ACCESSIBILITY ====================== */
const vol_on = require('./images/icons/volume-2.svg');
const vol_off = require('./images/icons/volume-x.svg');

/* ==================== OBJECT-WRAPPED CONSTS & VARS ====================== */
//Initialize variables/flags
let flags = {
	imgReady: true,
	volumeOn: false,
	overlayOn: false,
	logoReady: true
};

//Define values for timeouts
let timeouts = {
	imgFadeDuration: 500, //img fade duration == 0.5s
	logoSoundDuration: 5000 //logo sfx duration == 5s
};

/* ==================== NAV MENU OVERLAY FUNCTIONS ====================== */
/* Nav menu switches to overlay column view on smaller screens,
    no overlay and row view on wider screens.
    Icon swaps between hamburger or 'x' when overlay is off/on. */
function checkOverlay() {
	if (flags.overlayOn) {
		toggleOverlay();
	}
}

function toggleOverlay() {
	//debugger;
	toggleOverlayDisplay();
	showOverlayLinks(flags.overlayOn);
}

function toggleOverlayDisplay() {
	//Toggle menu overlay between off/on & menu icon between burger/x
	document.getElementById('nav-overlay').classList.toggle('nav-overlay--on');
	document.getElementById('nav-icon').classList.toggle('nav-icon--x');

	if (flags.overlayOn) {
		flags.overlayOn = false;
	} else {
		flags.overlayOn = true;
	}
}

function showOverlayLinks(showLinks) {
	let links = document.querySelectorAll('.nav-link');

	/* Note that assigning 'display' property to DOM in script overrides CSS media query assignments. */
	if (showLinks) {
		for (i = 0; i < links.length; i++) {
			links[i].style.display = 'flex';
		}
	} else {
		for (i = 0; i < links.length; i++) {
			links[i].style.display = 'none';
		}
	}
}

/* ---------- WINDOW RESIZE HANDLER FOR OVERLAY ------------ */
/* Need to test for viewport resizing while nav overlay is open. */
if (matchMedia) {
	const mq = window.matchMedia('(min-width: 992px)');
	mq.addListener(windowResized);
	windowResized(mq);
}

function windowResized(mq) {
	//If nav overlay is on and viewport is stretched past breakpoint, toggle overlay off.
	showOverlayLinks(mq.matches);

	if (mq.matches && flags.overlayOn) {
		toggleOverlayDisplay();
	}
}

/* ====================== IMAGE GALLERY MODAL ==================== */
function openModal(img, type) {
	document.getElementById('modal').classList.toggle('modal--on');

	//Only show modal next/prev icons for gallery imgs.
	if (type === 'gallery') {
		document.getElementById('modal-icon-prev').style.visibility = 'visible';
		document.getElementById('modal-icon-next').style.visibility = 'visible';
		showImage(img);
	} else {
		document.getElementById('modal-icon-prev').style.visibility = 'hidden';
		document.getElementById('modal-icon-next').style.visibility = 'hidden';
		document.getElementById('modal-img').src = img.src;
	}
}

function closeModal() {
	document.getElementById('modal').classList.toggle('modal--on');
}

function getCurrentIndex(img) {
	let imgList = document.getElementsByClassName('gallery-img');

	//If no img passed in, get 'current-image'
	if (!img) {
		let imgArr = document.getElementsByClassName('current-image');
		img = imgArr[0]; //There's only 1 img in the list of 'current-image' class
	}
	//Get index of current image
	for (let i = 0; i < imgList.length; i++) {
		if (imgList[i] === img) {
			return i;
		}
	}
}

function nextImageHandler(dir) {
	if (flags.imgReady) {
		let imgList = document.getElementsByClassName('gallery-img');
		let currentIndex = getCurrentIndex();

		// Check for wrap at beginning and end of list
		if (currentIndex === imgList.length - 1 && dir === 1) {
			currentIndex = 0;
		} else if (currentIndex === 0 && dir === -1) {
			currentIndex = imgList.length - 1;
		} else {
			currentIndex += dir;
		}
		showImage(imgList[currentIndex]);
	}
}

function showImage(img) {
	let imgList = document.getElementsByClassName('gallery-img');
	let currentImgArr = document.getElementsByClassName('current-image'); //Only 1 image in this arr
	let currentIndex = getCurrentIndex(img);

	//Clear last image
	currentImgArr[0].classList.toggle('current-image');
	setTimeout(function() {
		document.getElementById('modal-img').classList.remove('transition-img');
		flags.imgReady = true;
	}, timeouts.imgFadeDuration);

	//Set the current image and fade transition
	imgList[currentIndex].classList.toggle('current-image');
	document.getElementById('modal-img').src = img.src;
	document.getElementById('modal-img').classList.add('transition-img');
	flags.imgReady = false;
}

/* ====================== BACKGROUND VIDEO - VOLUME CONTROL ==================== */
function volumeControl() {
	//Enable/Mute volume on video
	if (flags.volumeOn) {
		document.getElementById('volume-icon').style.backgroundImage = `url(${vol_off})`;
		document.getElementById('backgroundVideo').muted = true;
		flags.volumeOn = false;
	} else {
		document.getElementById('volume-icon').style.backgroundImage = `url(${vol_on})`;
		document.getElementById('backgroundVideo').muted = false;
		flags.volumeOn = true;
	}
}

/* ====================== LOGO ANIMATION & SOUND FX ==================== */
function playFX() {
	if (flags.logoReady) {
		flags.logoReady = false;
		document.getElementById('harmonic-sfx').play();
		document.getElementById('header-img').classList.add('rotate-anim');

		setTimeout(function() {
			document.getElementById('header-img').classList.remove('rotate-anim');
			flags.logoReady = true;
		}, timeouts.logoSoundDuration);
	}
}

/* ====================== EXPANDING/COLLAPSING DIV ==================== */
function expandDiv(expand) {
	document.getElementById('story2').classList.toggle('expanded-div');
	document.getElementById('story3').classList.toggle('expanded-div');

	//Expand/collapse div
	if (expand) {
		document.getElementById('expand-icon').style.display = 'none';
		document.getElementById('collapse-icon').style.display = 'inline-block';
	} else {
		document.getElementById('collapse-icon').style.display = 'none';
		document.getElementById('expand-icon').style.display = 'inline-block';
	}
}

/* ====================== HTML BUTTON EVENT LISTENERS: 
(defined here vs inline HTML due to Parcel Bundler compiling inaccessability) ==================== */

// Nav-bar inputs
document.getElementById('nav-item1').addEventListener('click', () => checkOverlay());
document.getElementById('nav-item2').addEventListener('click', () => checkOverlay());
document.getElementById('nav-item3').addEventListener('click', () => checkOverlay());
document.getElementById('nav-item4').addEventListener('click', () => checkOverlay());
document.getElementById('nav-icon').addEventListener('click', () => toggleOverlay());

// Image Modal/Overlay inputs
document.getElementById('modal-icon-close').addEventListener('click', () => closeModal());
document.getElementById('modal-icon-prev').addEventListener('click', () => nextImageHandler(-1));
document.getElementById('modal-icon-next').addEventListener('click', () => nextImageHandler(1));

// Gallery Image inputs
document.getElementById('img1').addEventListener('click', (el) => openModal(el.srcElement, 'gallery'));
document.getElementById('img2').addEventListener('click', (el) => openModal(el.srcElement, 'gallery'));
document.getElementById('img3').addEventListener('click', (el) => openModal(el.srcElement, 'gallery'));
document.getElementById('img4').addEventListener('click', (el) => openModal(el.srcElement, 'gallery'));
document.getElementById('img5').addEventListener('click', (el) => openModal(el.srcElement, 'gallery'));

// Non-gallery Image inputs
document.getElementById('story-img1').addEventListener('click', (el) => openModal(el.srcElement));
document.getElementById('story-img2').addEventListener('click', (el) => openModal(el.srcElement));
document.getElementById('story-img3').addEventListener('click', (el) => openModal(el.srcElement));
document.getElementById('story-img4').addEventListener('click', (el) => openModal(el.srcElement));

// Misc Inputs
document.getElementById('volume-icon').addEventListener('click', () => volumeControl());
document.getElementById('header-img').addEventListener('click', () => playFX());
document.getElementById('expand-icon').addEventListener('click', () => expandDiv(true));
document.getElementById('collapse-icon').addEventListener('click', () => expandDiv(false));
