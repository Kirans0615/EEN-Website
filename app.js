document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    document.querySelectorAll('.line').forEach(line => {
        observer.observe(line);
        line.style.transform = 'translateY(-100px)'; // Start position for animation
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const spans = document.querySelectorAll('.dynamic-weight');
    let currentIndex = 0; // Starting index

    function updateWeight() {
        // Reset all to default
        spans.forEach(span => span.classList.remove('bold'));
        
        // Set the current to bold
        spans[currentIndex].classList.add('bold');

        // Move to next index or cycle back to start
        currentIndex = (currentIndex + 1) % spans.length;
    }

    // Initial call to set the first item's weight
    updateWeight();

    // Continue updating every 2 seconds
    setInterval(updateWeight, 1500);
});

document.querySelectorAll('.benefit-title').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.toggle('active');
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
});





document.addEventListener("DOMContentLoaded", function() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5 // Trigger when 50% of the element is visible
    });

    document.querySelectorAll('.line').forEach(line => {
        observer.observe(line);
        line.style.transform = 'translateY(-100px)'; // Start position for animation
    });
});




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
const imageStyles = [
    { height: '50px', objectFit: 'cover', width: '100%' },
    { height: '50px', objectFit: 'contain', width: '100%' },
    { height: '50px', objectFit: 'cover', width: '100%' },
    { height: '50px', objectFit: 'contain', width: '100%' }
];

const textContainer = document.querySelector('.text-section');
const imageElement = document.getElementById('dynamic-image');

let currentIndex = 0;

function updateContent() {
    imageElement.style.opacity = 0;

    setTimeout(() => {
        textContainer.querySelectorAll('p').forEach((p, index) => {
            p.classList.remove('active');
            if (index === currentIndex) {
                p.classList.add('active');
            }
        });

        imageElement.src = imagePaths[currentIndex];
        imageElement.alt = textElements[currentIndex];

        if (!imageElement.classList.contains('dynamic-image-style')) {
            imageElement.classList.add('dynamic-image-style');
        }

        imageElement.style.opacity = 1;

        currentIndex = (currentIndex + 1) % textElements.length;
    }, 500);
}

textElements.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    textContainer.appendChild(p);
});

updateContent();
setInterval(updateContent, 4500);

// Adding functionality for alternating font weight
