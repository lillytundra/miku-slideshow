// list of Miku images
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
}

// flag to check if the first click has been made
let firstClick = false;

// request fullscreen and play music on the first click
function goFullscreenAndPlayMusic() {
    const elem = document.documentElement;
    
    // Request fullscreen
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { // Safari
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { // IE11
        elem.msRequestFullscreen();
    }

    // Start music
    music.play();

    firstClick = true;
    document.removeEventListener('click', goFullscreenAndPlayMusic); // Only do this once
}

// first click: trigger fullscreen + play music, subsequent clicks: change image
body.addEventListener('click', () => {
    if (!firstClick) {
        goFullscreenAndPlayMusic(); // First click: fullscreen + music
    } else {
        current = (current + 1) % images.length;
        updateBackground(); // Subsequent clicks: change image
    }
});

// arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        current = (current + 1) % images.length;
    } else if (event.key === 'ArrowLeft') {
        current = (current - 1 + images.length) % images.length;
    } else {
        return; // Exit if not arrow key
    }
    updateBackground(); // Update background with new image
});
