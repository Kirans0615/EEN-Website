document.addEventListener("DOMContentLoaded", function () {
    // === SECTION 1: Animate .line elements on scroll ===
    const lineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.line').forEach(line => {
        lineObserver.observe(line);
        line.style.transform = 'translateY(-100px)';
    });

    // === SECTION 2: Alternating font weight effect ===
    const spans = document.querySelectorAll('.dynamic-weight');
    let weightIndex = 0;

    function updateWeight() {
        spans.forEach(span => span.classList.remove('bold'));
        spans[weightIndex].classList.add('bold');
        weightIndex = (weightIndex + 1) % spans.length;
    }

    if (spans.length > 0) {
        updateWeight();
        setInterval(updateWeight, 1500);
    }

    // === SECTION 3: Expandable benefit sections ===
    document.querySelectorAll('.benefit-title').forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    // === SECTION 4: Swiper for buy.html (outer + inner sliders) ===
    if (window.location.pathname.includes("buy.html")) {
        const outerSwiper = new Swiper(".mySwiper", {
            loop: true,
            autoplay: {
                delay: 2000,
                disableOnInteraction: false,
            },
            speed: 2000,
            slidesPerView: 2,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });

        document.querySelectorAll('.inner-swiper').forEach(swiperContainer => {
            new Swiper(swiperContainer, {
                loop: true,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                speed: 700,
                slidesPerView: 1,
                allowTouchMove: true,
            });
        });
    }

    // === SECTION 5: Mobile menu toggle ===
    const menu = document.querySelector('#mobile-menu');
    const menuLinks = document.querySelector('.navbar__menu');

    if (menu && menuLinks) {
        menu.addEventListener('click', function () {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
        });
    }

    // === SECTION 6: Rotating text + image animation ===
    const textElements = ["Sell Your Home", "Buy a Home", "Work in Real Estate", "Seamless Deals"];
    const imagePaths = ["/PICS/students.jpg", "/PICS/signdeal.jpg", "/PICS/family.jpg", "/PICS/bridge.jpg"];
    const textContainer = document.querySelector('.text-section');
    const imageElement = document.getElementById('dynamic-image');
    let currentIndex = 0;

    if (textContainer && imageElement) {
        textElements.forEach(text => {
            const p = document.createElement('p');
            p.textContent = text;
            textContainer.appendChild(p);
        });

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

        updateContent();
        setInterval(updateContent, 4500);
    }
});
