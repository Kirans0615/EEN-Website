/* ============================================================
   EEN Motion Enhanced
   Spring cursor · scroll bar · text reveal · 3D tilt ·
   clip-path reveal · ripple · marquee · toast forms
   Requires GSAP 3.12 + ScrollTrigger (already loaded)
   ============================================================ */

(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var TOUCH   = window.matchMedia('(hover: none)').matches;

  /* ── Custom spring cursor ──────────────────────────────── */
  function initCursor() {
    if (TOUCH || REDUCED) return;
    var dot  = document.querySelector('.cursor-dot');
    var ring = document.querySelector('.cursor-ring');
    if (!dot || !ring) return;

    var rx = window.innerWidth / 2, ry = window.innerHeight / 2;
    var mx = rx, my = ry;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      gsap.to(dot, { x: mx - 4, y: my - 4, duration: 0.08, ease: 'none' });
    });

    (function lerpRing() {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      gsap.set(ring, { x: rx - 20, y: ry - 20 });
      requestAnimationFrame(lerpRing);
    })();

    document.querySelectorAll('a, button, .card, .tilt-card, [role="button"]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        gsap.to(ring, { scale: 1.9, opacity: 0.35, duration: 0.3, ease: 'power2.out' });
        gsap.to(dot,  { scale: 0,   duration: 0.2 });
      });
      el.addEventListener('mouseleave', function () {
        gsap.to(ring, { scale: 1,   opacity: 0.65, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
        gsap.to(dot,  { scale: 1,   duration: 0.35, ease: 'elastic.out(1, 0.5)' });
      });
    });
  }

  /* ── Scroll progress bar ───────────────────────────────── */
  function initScrollProgress() {
    var bar = document.getElementById('scroll-progress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var h   = document.body.scrollHeight - window.innerHeight;
      var pct = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
      bar.style.transform = 'scaleX(' + pct + ')';
    }, { passive: true });
  }

  /* ── Text character reveal ─────────────────────────────── */
  function initTextReveal() {
    if (REDUCED) return;
    document.querySelectorAll('[data-text-reveal]').forEach(function (el) {
      var words = el.textContent.split(' ');
      el.innerHTML = words.map(function (word) {
        var chars = word.split('').map(function (c) {
          return '<span class="char">' + c + '</span>';
        }).join('');
        return '<span class="word">' + chars + '</span>';
      }).join(' ');
      el.setAttribute('aria-label', words.join(' '));

      if (typeof ScrollTrigger === 'undefined') return;
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: function () {
          gsap.from(el.querySelectorAll('.char'), {
            opacity: 0,
            y: 22,
            rotateX: -55,
            stagger: 0.022,
            duration: 0.55,
            ease: 'power3.out'
          });
        }
      });
    });
  }

  /* ── Clip-path image reveal ────────────────────────────── */
  function initImageReveal() {
    if (REDUCED || typeof ScrollTrigger === 'undefined') return;
    gsap.utils.toArray('.img-reveal').forEach(function (el) {
      gsap.set(el, { clipPath: 'inset(0 100% 0 0)' });
      ScrollTrigger.create({
        trigger: el,
        start: 'top 82%',
        once: true,
        onEnter: function () {
          gsap.to(el, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1.15,
            ease: 'power4.out'
          });
        }
      });
    });
  }

  /* ── 3D card tilt ──────────────────────────────────────── */
  function initTiltCards() {
    if (TOUCH || REDUCED) return;
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var x = ((e.clientX - r.left) / r.width  - 0.5) * 2;
        var y = ((e.clientY - r.top)  / r.height - 0.5) * 2;
        gsap.to(card, {
          rotateY: x * 7,
          rotateX: -y * 7,
          transformPerspective: 900,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card, {
          rotateY: 0, rotateX: 0,
          duration: 0.9,
          ease: 'elastic.out(1, 0.4)'
        });
      });
    });
  }

  /* ── Magnetic spring buttons ───────────────────────────── */
  function initMagneticSpring() {
    if (TOUCH || REDUCED) return;
    document.querySelectorAll('.btn-magnetic').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width  / 2) * 0.28;
        var y = (e.clientY - r.top  - r.height / 2) * 0.28;
        gsap.to(btn, { x: x, y: y, duration: 0.35, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', function () {
        gsap.to(btn, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  /* ── Button ripple on click ────────────────────────────── */
  function initRipple() {
    document.querySelectorAll('.button, .btn-primary, .btn-outline').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        var r    = btn.getBoundingClientRect();
        var size = Math.max(r.width, r.height) * 2.2;
        var rip  = document.createElement('span');
        rip.setAttribute('aria-hidden', 'true');
        rip.style.cssText = [
          'position:absolute',
          'border-radius:50%',
          'pointer-events:none',
          'width:' + size + 'px',
          'height:' + size + 'px',
          'left:' + (e.clientX - r.left - size / 2) + 'px',
          'top:' + (e.clientY - r.top  - size / 2) + 'px',
          'background:rgba(255,255,255,0.22)',
          'transform:scale(0)'
        ].join(';');
        btn.appendChild(rip);
        gsap.to(rip, {
          scale: 1, opacity: 0, duration: 0.55, ease: 'power2.out',
          onComplete: function () { rip.remove(); }
        });
      });
    });
  }

  /* ── Marquee loop ──────────────────────────────────────── */
  function initMarquee() {
    document.querySelectorAll('.marquee-track').forEach(function (track) {
      if (REDUCED) return;
      var orig = track.innerHTML;
      track.innerHTML = orig + orig;
      var fullW = track.scrollWidth / 2;
      gsap.to(track, {
        x: -fullW,
        duration: 28,
        ease: 'none',
        repeat: -1
      });
    });
  }

  /* ── Animated heading underline (JS-rendered) ──────────── */
  function initHeadingLines() {
    if (REDUCED) return;
    document.querySelectorAll('.section-heading').forEach(function (h) {
      var existing = h.querySelector('.heading-line-js');
      if (existing) return;
      var line = document.createElement('span');
      line.className = 'heading-line-js';
      line.setAttribute('aria-hidden', 'true');
      h.appendChild(line);
      if (typeof ScrollTrigger === 'undefined') return;
      gsap.from(line, {
        scrollTrigger: { trigger: h, start: 'top 86%', once: true },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out'
      });
    });
  }

  /* ── Toast for Netlify forms ───────────────────────────── */
  function initFormToast() {
    var toast = document.getElementById('een-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'een-toast';
      toast.setAttribute('role', 'status');
      toast.setAttribute('aria-live', 'polite');
      document.body.appendChild(toast);
    }

    function showToast(msg, type) {
      toast.textContent  = msg;
      toast.className    = 'toast toast--' + (type || 'success') + ' toast--visible';
      clearTimeout(toast._t);
      toast._t = setTimeout(function () {
        toast.classList.remove('toast--visible');
      }, 4200);
    }

    document.querySelectorAll('form[data-netlify]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var data = new FormData(form);
        /* Netlify expects url-encoded bodies unless the form uploads files */
        var body = form.querySelector('input[type="file"]')
          ? data
          : new URLSearchParams(data);
        fetch('/', { method: 'POST', body: body })
          .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            showToast("Message sent — we'll be in touch shortly!", 'success');
            form.reset();
          })
          .catch(function () {
            showToast('Something went wrong. Please email us directly.', 'error');
          });
      });
    });
  }

  /* ── Nav: add active class based on current page ───────── */
  function initNavActive() {
    var path = window.location.pathname.replace(/\/$/, '') || '/index.html';
    document.querySelectorAll('.navbar__links').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href && path.endsWith(href.replace(/^\//, ''))) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /* ── Hero video speed — normal, owned by app.js ─────────── */
  function initHeroVideo() { /* no-op */ }

  /* ── Init ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', function () {
    initCursor();
    initScrollProgress();
    initTextReveal();
    initImageReveal();
    initTiltCards();
    initMagneticSpring();
    initRipple();
    initMarquee();
    initHeadingLines();
    initFormToast();
    initNavActive();
    initHeroVideo();
  });

})();
