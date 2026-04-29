/* Silke Total Service — interactions
   Header scroll state + morph logo, mobile menu, before/after compare slider. */

(function () {
  'use strict';

  // -------- Header: solid state + morph drop→leaf on scroll --------
  const header = document.getElementById('site-header');
  const logoPath = document.getElementById('logo-path');
  const logoHighlight = document.getElementById('logo-highlight');
  const veins = ['vein-mid', 'vein-r1', 'vein-r2', 'vein-l1', 'vein-l2'].map(id => document.getElementById(id));

  const drop = [50,6, 58,18, 80,38, 80,60, 80,78, 67,92, 50,92, 33,92, 20,78, 20,60, 20,38, 42,18, 50,6];
  const leaf = [50,6, 50,12, 78,30, 78,50, 78,72, 65,92, 50,92, 35,92, 22,72, 22,50, 22,30, 50,12, 50,6];
  const blue = [82, 158, 209];
  const green = [88, 138, 70];
  const lerp = (a, b, k) => a + (b - a) * k;

  function applyMorph(t) {
    if (!logoPath) return;
    const p = drop.map((v, i) => lerp(v, leaf[i], t));
    const d = `M${p[0]},${p[1]} C${p[2]},${p[3]} ${p[4]},${p[5]} ${p[6]},${p[7]} C${p[8]},${p[9]} ${p[10]},${p[11]} ${p[12]},${p[13]} C${p[14]},${p[15]} ${p[16]},${p[17]} ${p[18]},${p[19]} C${p[20]},${p[21]} ${p[22]},${p[23]} ${p[24]},${p[25]} Z`;
    logoPath.setAttribute('d', d);
    const rgb = blue.map((c, i) => Math.round(lerp(c, green[i], t)));
    logoPath.setAttribute('fill', `rgb(${rgb.join(',')})`);
    logoHighlight.setAttribute('opacity', String((1 - t) * 0.55));
    veins[0].setAttribute('opacity', String(t * 0.55));
    veins[1].setAttribute('opacity', String(t * 0.4));
    veins[2].setAttribute('opacity', String(t * 0.4));
    veins[3].setAttribute('opacity', String(t * 0.4));
    veins[4].setAttribute('opacity', String(t * 0.4));
  }

  // Pages with class "sth-static" stay in solid + leaf state regardless of scroll.
  const isStatic = header && header.classList.contains('sth-static');

  function onScroll() {
    if (isStatic) return;
    const y = window.scrollY;
    header.classList.toggle('sth-solid', y > 80);
    const t = Math.max(0, Math.min(1, y / 520));
    applyMorph(t);
  }
  if (header) {
    if (isStatic) {
      header.classList.add('sth-solid');
      applyMorph(1);
    } else {
      applyMorph(0);
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  // -------- Mobile menu --------
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => mobileMenu.classList.toggle('is-open'));
  }

  // -------- Compare slider --------
  const wrap = document.getElementById('compare');
  if (wrap) {
    const before = document.getElementById('compare-before');
    const handle = document.getElementById('compare-handle');
    const hint = document.getElementById('compare-hint');

    let pos = 50;
    let auto = true;
    let dragging = false;

    function setPos(v) {
      pos = Math.max(0, Math.min(100, v));
      before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      handle.style.left = pos + '%';
      wrap.setAttribute('aria-valuenow', String(Math.round(pos)));
    }
    setPos(50);

    let raf;
    const start = performance.now();
    function loop(now) {
      if (!auto) return;
      const elapsed = (now - start) / 1000;
      setPos(50 + 42 * Math.sin((elapsed / 7) * Math.PI * 2));
      raf = requestAnimationFrame(loop);
    }
    raf = requestAnimationFrame(loop);

    function stopAuto() {
      if (!auto) return;
      auto = false;
      cancelAnimationFrame(raf);
      if (hint) {
        hint.style.opacity = '0';
        setTimeout(() => hint.remove(), 320);
      }
    }

    function fromClientX(clientX) {
      const rect = wrap.getBoundingClientRect();
      setPos(((clientX - rect.left) / rect.width) * 100);
    }

    wrap.addEventListener('pointerdown', (e) => {
      stopAuto();
      dragging = true;
      try { wrap.setPointerCapture(e.pointerId); } catch {}
      fromClientX(e.clientX);
    });
    wrap.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      fromClientX(e.clientX);
    });
    const release = (e) => {
      dragging = false;
      try { wrap.releasePointerCapture(e.pointerId); } catch {}
    };
    wrap.addEventListener('pointerup', release);
    wrap.addEventListener('pointercancel', release);
  }

  // -------- Scroll-driven video (service page) --------
  // Sticky-pinned video whose currentTime is bound to scroll progress through
  // the outer track. Pattern: rAF loop lerps current → target so wheel/inertia
  // scroll feels smooth instead of jittery. iOS / coarse-pointer / reduced-motion
  // get an autoplay-loop fallback because Safari refuses to seek smoothly.
  const scrollvid = document.getElementById('scrollvid');
  if (scrollvid) {
    const video = document.getElementById('scrollvid-video');
    const loader = document.getElementById('scrollvid-loader');
    const loaderFill = document.getElementById('scrollvid-loader-fill');

    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes('Mac') && 'ontouchend' in document);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const useFallback = isCoarsePointer || isIOS || prefersReduced;

    if (useFallback) {
      // Autoplay-loop fallback. No scrubbing.
      scrollvid.classList.add('is-fallback');
      video.setAttribute('autoplay', '');
      video.setAttribute('loop', '');
      video.muted = true;
      const tryPlay = () => video.play().catch(() => {});
      video.addEventListener('loadeddata', tryPlay, { once: true });
      tryPlay();
      // Hide loader once a frame is visible
      video.addEventListener('loadeddata', () => loader && loader.classList.add('is-hidden'), { once: true });
    } else {
      let target = 0;     // desired currentTime (driven by scroll)
      let current = 0;    // smoothed currentTime (driven by rAF lerp)
      let ready = false;
      let rafId = null;

      // Eagerly start downloading
      try { video.load(); } catch {}

      const updateLoader = () => {
        if (!video.duration || video.buffered.length === 0) return;
        const end = video.buffered.end(video.buffered.length - 1);
        const pct = Math.min(1, end / video.duration);
        if (loaderFill) loaderFill.style.width = (pct * 100).toFixed(1) + '%';
      };

      const checkReady = () => {
        if (ready) return;
        if (video.readyState >= 4) {
          ready = true;
          if (loader) loader.classList.add('is-hidden');
          startTicking();
          updateScrollTarget();
        }
      };
      video.addEventListener('progress', updateLoader);
      video.addEventListener('canplaythrough', checkReady);
      video.addEventListener('loadeddata', checkReady);
      checkReady();

      // Map scroll position → target time. Section is taller than viewport;
      // progress = 0 when section top hits viewport top, 1 when section bottom
      // hits viewport bottom.
      function updateScrollTarget() {
        if (!ready || !video.duration) return;
        const rect = scrollvid.getBoundingClientRect();
        const trackLength = scrollvid.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        const progress = Math.max(0, Math.min(0.9999, scrolled / trackLength));
        target = progress * video.duration;
      }

      function tick() {
        // Lerp 0.15 → balanced. Higher feels snappier, lower feels silkier.
        current = current + (target - current) * 0.15;
        if (Math.abs(video.currentTime - current) > 0.01) {
          try { video.currentTime = current; } catch {}
        }
        rafId = requestAnimationFrame(tick);
      }
      function startTicking() {
        if (rafId !== null) return;
        rafId = requestAnimationFrame(tick);
      }

      window.addEventListener('scroll', updateScrollTarget, { passive: true });
      window.addEventListener('resize', updateScrollTarget, { passive: true });
    }
  }

  // -------- Quote form (kontakt) --------
  const form = document.getElementById('quote-form');
  if (form) {
    const pills = form.querySelectorAll('.stqf-pill');
    const hiddenServices = form.querySelector('input[name="services"]');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('is-on');
        const selected = Array.from(pills)
          .filter((p) => p.classList.contains('is-on'))
          .map((p) => p.dataset.value);
        if (hiddenServices) hiddenServices.value = selected.join(', ');
      });
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      const done = document.getElementById('quote-done');
      if (done) done.style.display = 'block';
    });
  }
})();
