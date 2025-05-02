// list of kanade images 
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

// on click, change image and start music
body.addEventListener('click', () => {
    current = (current + 1) % images.length;
    body.style.backgroundImage = `url('${images[current]}')`;

    if (music.paused) {
        music.play();
    }
});
// handle arrow key navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
        current = (current + 1) % images.length;
    } else if (event.key === 'ArrowLeft') {
        current = (current - 1 + images.length) % images.length;
    } else {
        return; // exit if not arrow key
    }

    // update background
    body.style.backgroundImage = `url('${images[current]}')`;

    // start music if not playing
    if (music.paused) {
        music.play();
    }
});