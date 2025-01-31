const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


const textElements = [
    "Sell Your Home",
    "Buy a Home",
    "Work in Real Estate",
    "Seamless Deals"
];

const imagePaths = [
    "/PICS/students.jpg",
    "/PICS/signdeal.jpg",
    "/PICS/family.jpg",
    "/PICS/bridge.jpg"
];

const textContainer = document.querySelector('.text-section');
const imageElement = document.getElementById('dynamic-image');

let currentIndex = 0;

function updateContent() {
    // Fade out the image
    imageElement.style.opacity = 0;

    // Wait for the fade effect to complete before changing the image source and text
    setTimeout(() => {
        textContainer.querySelectorAll('p').forEach((p, index) => {
            p.classList.remove('active');
            if (index === currentIndex) {
                p.classList.add('active');
            }
        });

        imageElement.src = imagePaths[currentIndex];
        imageElement.alt = textElements[currentIndex];  // Update alt attribute for accessibility

        // Fade in the new image
        imageElement.style.opacity = 1;

        currentIndex = (currentIndex + 1) % textElements.length;
    }, 500);  // Duration of the fade-out effect, should match the CSS transition time
}

// Create text elements dynamically
textElements.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    textContainer.appendChild(p);
});

// Initial highlight and image
updateContent();

// Change text and image every 4 seconds plus transition time
setInterval(updateContent, 4500);
