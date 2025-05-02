// list of miku images
const images = [
    'images/miku1.jpg',   
    'images/miku2.jpg',
    'images/miku3.jpg',
    'images/miku4.jpg',
    'images/miku5.jpg',
    'images/miku6.jpg',
    'images/miku7.jpg',
];

// preload all images
images.forEach(src => {
    const img = new Image();
    img.src = src;
});

let current = 0;
const body = document.body;
const music = document.getElementById('bg-music');

// set initial background
body.style.backgroundImage = `url('${images[current]}')`;

// function to update background and play music
function updateBackground() {
    body.style.backgroundImage = `url('${images[current]}')`;
    if (music.paused) {
        music.play();
    }
}

// flag to check if fullscreen has been activated
let fullscreenActivated = false;

// request fullscreen on first click
function goFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
    }
    fullscreenActivated = true;
    document.removeEventListener('click', goFullscreen); // only once
}

// click: first click activates fullscreen, second click changes the image
body.addEventListener('click', () => {
    if (!fullscreenActivated) {
        goFullscreen(); // Trigger fullscreen on the first click
    } else {
        current = (current + 1) % images.length;
        updateBackground(); // Change image and play music on subsequent clicks
    }
});

// arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        current = (current + 1) % images.length;
    } else if (event.key === 'ArrowLeft') {
        current = (current - 1 + images.length) % images.length;
    } else {
        return;
    }
    updateBackground();
});
