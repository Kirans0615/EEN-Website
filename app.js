document.addEventListener("DOMContentLoaded", function () {

    // ── Mobile menu toggle ──────────────────────────────────────
    const menu = document.getElementById('mobile-menu');
    const menuLinks = document.querySelector('.navbar__menu');
    if (menu && menuLinks) {
        menu.addEventListener('click', function () {
            menu.classList.toggle('is-active');
            menuLinks.classList.toggle('active');
            menu.setAttribute('aria-expanded', menu.classList.contains('is-active'));
        });
    }

    // ── Hero video playback speed ───────────────────────────────
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        heroVideo.playbackRate = 2.0;
        heroVideo.addEventListener('loadedmetadata', () => { heroVideo.playbackRate = 2.0; });
    }

    // ── Dynamic font-weight cycling (hero tagline) ──────────────
    const dynamicSpans = document.querySelectorAll('.dynamic-weight');
    if (dynamicSpans.length) {
        let weightIndex = 0;
        function updateWeight() {
            dynamicSpans.forEach(span => span.classList.remove('bold'));
            dynamicSpans[weightIndex].classList.add('bold');
            weightIndex = (weightIndex + 1) % dynamicSpans.length;
        }
        updateWeight();
        setInterval(updateWeight, 1500);
    }

    // ── Stats line animation ────────────────────────────────────
    const lineObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.line').forEach(line => {
        line.style.opacity = '0';
        line.style.transform = 'translateY(-100px)';
        line.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        lineObserver.observe(line);
    });

    // ── Scroll fade-in for .fade-in-up-hidden elements ──────────
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const fadeObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.remove('fade-in-up-hidden');
                    entry.target.classList.add('fade-in-up');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        document.querySelectorAll('.fade-in-up-hidden').forEach(el => {
            fadeObserver.observe(el);
        });
    } else {
        document.querySelectorAll('.fade-in-up-hidden').forEach(el => {
            el.classList.remove('fade-in-up-hidden');
        });
    }

    // ── Accordion (Why Buy/Why Join) ────────────────────────────
    document.querySelectorAll('.benefit-title').forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            if (content) {
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

});
