/* ============================================================
   EEN Animations — GSAP + ScrollTrigger + Barba.js
   ============================================================ */

(function () {
  'use strict';

  /* ── GSAP setup ──────────────────────────────────────────── */
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    /* Page entrance */
    gsap.from('[data-barba="container"]', {
      opacity: 0, duration: 0.45, ease: 'power2.out', clearProps: 'opacity'
    });

    /* Scroll reveal: .section-heading */
    gsap.utils.toArray('.section-heading').forEach(el => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 87%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 36,
        duration: 0.75,
        ease: 'power3.out'
      });
    });

    /* Scroll reveal: .card-grid children with stagger */
    gsap.utils.toArray('.card-grid').forEach(grid => {
      const cards = grid.querySelectorAll('.card');
      if (!cards.length) return;
      gsap.from(cards, {
        scrollTrigger: {
          trigger: grid,
          start: 'top 82%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 56,
        stagger: 0.11,
        duration: 0.65,
        ease: 'power3.out'
      });
    });

    /* Parallax on .hero-bg elements */
    gsap.utils.toArray('.hero-bg').forEach(bg => {
      const section = bg.closest('section') || bg.parentElement;
      gsap.to(bg, {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        },
        yPercent: 22,
        ease: 'none'
      });
    });

    /* Reduced-motion: kill all animations */
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.globalTimeline.timeScale(0);
      ScrollTrigger.getAll().forEach(st => st.kill());
    }
  }

  /* ── Stat count-up (works even without GSAP) ────────────── */
  function initCountUp() {
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseFloat(el.dataset.target || 0);
      const suffix = el.dataset.suffix || '';

      if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 87%',
          once: true,
          onEnter: () => countUp(el, target, suffix)
        });
      } else {
        /* Fallback: IntersectionObserver */
        const obs = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting) {
            countUp(el, target, suffix);
            obs.disconnect();
          }
        }, { threshold: 0.5 });
        obs.observe(el);
      }
    });
  }

  function countUp(el, target, suffix) {
    const duration = 1800;
    const start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(ease * target) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  /* ── Magnetic CTA buttons ───────────────────────────────── */
  function initMagnetic() {
    document.querySelectorAll('.btn-magnetic').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.25;
        if (typeof gsap !== 'undefined') {
          gsap.to(btn, { x, y, duration: 0.4, ease: 'power2.out' });
        } else {
          btn.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
      btn.addEventListener('mouseleave', () => {
        if (typeof gsap !== 'undefined') {
          gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
        } else {
          btn.style.transform = 'translate(0,0)';
        }
      });
    });
  }

  /* ── Nav frosted glass on scroll ────────────────────────── */
  function initNavScroll() {
    const nav = document.querySelector('nav, .navbar');
    if (!nav) return;
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Barba.js page transitions ──────────────────────────── */
  function initBarba() {
    if (typeof barba === 'undefined') return;
    barba.init({
      transitions: [{
        name: 'een-fade',
        leave(data) {
          return gsap.to(data.current.container, { opacity: 0, duration: 0.28, ease: 'power2.in' });
        },
        enter(data) {
          return gsap.from(data.next.container, { opacity: 0, y: 16, duration: 0.38, ease: 'power2.out' });
        }
      }],
      views: [{
        afterEnter() { initCountUp(); initMagnetic(); }
      }]
    });
  }

  /* ── Hero video playback speed (set in app.js too) ──────── */
  function initHeroVideo() {
    document.querySelectorAll('.hero-video').forEach(v => {
      v.playbackRate = 2.0;
      v.addEventListener('loadedmetadata', () => { v.playbackRate = 2.0; });
    });
  }

  /* ── Init ───────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initCountUp();
    initMagnetic();
    initNavScroll();
    initBarba();
    initHeroVideo();
  });

})();
