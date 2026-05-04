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

  let scrollRaf = null;
  let lastMorphT = -1;
  function updateHeaderFromScroll() {
    scrollRaf = null;
    if (isStatic) return;
    const y = window.scrollY;
    header.classList.toggle('sth-solid', y > 80);
    const t = Math.max(0, Math.min(1, y / 520));
    const roundedT = Math.round(t * 1000) / 1000;
    if (roundedT === lastMorphT) return;
    lastMorphT = roundedT;
    applyMorph(t);
  }
  function onScroll() {
    if (scrollRaf !== null) return;
    scrollRaf = requestAnimationFrame(updateHeaderFromScroll);
  }
  if (header) {
    if (isStatic) {
      header.classList.add('sth-solid');
      applyMorph(1);
    } else {
      applyMorph(0);
      updateHeaderFromScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }
  }

  // -------- Mobile menu --------
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (burger && mobileMenu) {
    burger.setAttribute('aria-controls', mobileMenu.id);
    burger.setAttribute('aria-expanded', 'false');
    function setMobileMenu(open) {
      mobileMenu.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    }
    burger.addEventListener('click', () => setMobileMenu(!mobileMenu.classList.contains('is-open')));
    mobileMenu.addEventListener('click', (e) => { if (e.target.closest('a')) setMobileMenu(false); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) { setMobileMenu(false); burger.focus(); }
    });
  }

  // -------- Compare slider --------
  const wrap = document.getElementById('compare');
  if (wrap) {
    const before = document.getElementById('compare-before');
    const handle = document.getElementById('compare-handle');
    const hint = document.getElementById('compare-hint');

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let pos = 50;
    let auto = !prefersReduced;
    let dragging = false;

    function setPos(v) {
      pos = Math.max(0, Math.min(100, v));
      before.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
      handle.style.left = pos + '%';
      wrap.setAttribute('aria-valuenow', String(Math.round(pos)));
    }
    setPos(50);

    let raf = null;
    let inViewport = false;
    let elapsedBeforePause = 0;
    let animationStartedAt = 0;
    function loop(now) {
      if (!auto || !inViewport) { raf = null; return; }
      const elapsed = (elapsedBeforePause + now - animationStartedAt) / 1000;
      setPos(50 + 42 * Math.sin((elapsed / 7) * Math.PI * 2));
      raf = requestAnimationFrame(loop);
    }
    function startAuto() {
      if (!auto || !inViewport || raf !== null) return;
      animationStartedAt = performance.now();
      raf = requestAnimationFrame(loop);
    }
    function pauseAuto() {
      if (raf === null) return;
      elapsedBeforePause += performance.now() - animationStartedAt;
      cancelAnimationFrame(raf); raf = null;
    }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        inViewport = entries.some((e) => e.isIntersecting);
        inViewport ? startAuto() : pauseAuto();
      }).observe(wrap);
    } else {
      inViewport = true; startAuto();
    }

    function stopAuto() {
      if (!auto) return;
      auto = false;
      pauseAuto();
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

  // -------- Hedge clipper canvas --------
  const clipStage = document.getElementById('clip-stage');
  if (clipStage) {
    const canvas = document.getElementById('clip-canvas');
    const ctx = canvas.getContext('2d');
    const hint = document.getElementById('clip-hint');
    const cursor = document.getElementById('clip-cursor');
    const cleanImg = document.querySelector('.stclip-clean');
    const BRUSH_W = 72;
    const BRUSH_H = 36;
    let hinted = false;
    let growTimer = null;
    let growFrame = 0;
    let growing = false;
    let rafId = null;

    const untrimmedImg = new Image();

    function coverDraw(img) {
      const w = canvas.width, h = canvas.height;
      const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const sw = img.naturalWidth * scale;
      const sh = img.naturalHeight * scale;
      ctx.drawImage(img, (w - sw) / 2, (h - sh) / 2, sw, sh);
    }

    function resize() {
      const r = clipStage.getBoundingClientRect();
      canvas.width = Math.round(r.width);
      canvas.height = Math.round(r.height);
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 1;
      coverDraw(untrimmedImg);
    }

    function erase(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1;
      for (let i = 0; i < 10; i++) {
        const ox = (Math.random() * 2 - 1) * BRUSH_W;
        const oy = (Math.random() * 2 - 1) * BRUSH_H;
        const radius = 8 + Math.random() * 12;
        ctx.beginPath();
        ctx.arc(x + ox, y + oy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const GROW_FRAMES = 140;
    function growTick() {
      growFrame++;
      ctx.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = 0.014;
      coverDraw(untrimmedImg);
      ctx.globalAlpha = 1;
      if (growFrame < GROW_FRAMES) {
        rafId = requestAnimationFrame(growTick);
      } else {
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        coverDraw(untrimmedImg);
        growing = false;
        growFrame = 0;
      }
    }

    function scheduleGrow() {
      clearTimeout(growTimer);
      growTimer = setTimeout(() => {
        if (!growing) { growing = true; growFrame = 0; rafId = requestAnimationFrame(growTick); }
      }, 1400);
    }

    function stopGrow() {
      if (!growing) return;
      growing = false;
      growFrame = 0;
      clearTimeout(growTimer);
      if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    }

    const cursorImg = document.getElementById('clip-cursor-img');
    const SRC_OPEN   = 'assets/photos/hekasaks-aaben.png';
    const SRC_CLOSED = 'assets/photos/hekasaks-lukket.png';
    let snipInterval = null;
    let moveTimer = null;
    let snipState = false;
    let mouseX = 0;
    let mouseY = 0;

    const particleCanvas = document.createElement('canvas');
    particleCanvas.id = 'clip-particle-canvas';
    particleCanvas.style.position = 'fixed';
    particleCanvas.style.top = '0';
    particleCanvas.style.left = '0';
    particleCanvas.style.width = '100%';
    particleCanvas.style.height = '100%';
    particleCanvas.style.pointerEvents = 'none';
    particleCanvas.style.zIndex = '199';
    document.body.appendChild(particleCanvas);
    const pCtx = particleCanvas.getContext('2d');

    function resizeParticles() {
      particleCanvas.width = window.innerWidth;
      particleCanvas.height = window.innerHeight;
    }
    resizeParticles();
    window.addEventListener('resize', resizeParticles, { passive: true });

    const leafImg = new Image();
    leafImg.src = 'assets/photos/boege-blad.png';
    const particles = [];

    function particleLoop() {
      pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
      const floorY = clipStage.getBoundingClientRect().bottom;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        if (p.settled) {
          p.vx *= 0.85;
          p.x += p.vx;
          p.alpha -= 0.004;
        } else {
          p.vy += 0.35;
          p.vx *= 0.98;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.rotSpeed;
          if (p.y >= floorY - p.size * 0.4) {
            p.y = floorY - p.size * 0.4;
            p.vy = 0;
            p.rotSpeed *= 0.2;
            p.settled = true;
          }
          p.alpha -= 0.008;
        }

        pCtx.save();
        pCtx.translate(p.x, p.y);
        pCtx.rotate(p.rot);
        pCtx.globalAlpha = Math.max(0, p.alpha);
        pCtx.drawImage(leafImg, -p.size / 2, -p.size / 2, p.size, p.size);
        pCtx.restore();

        if (p.alpha <= 0) particles.splice(i, 1);
      }
      requestAnimationFrame(particleLoop);
    }
    requestAnimationFrame(particleLoop);

    function spawnLeaves(x, y) {
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x + (Math.random() * 30 - 15),
          y: y + (Math.random() * 10 - 5),
          vx: Math.random() * 6 - 3,
          vy: Math.random() * 3 - 4,
          rot: Math.random() * Math.PI * 2,
          rotSpeed: Math.random() * 0.16 - 0.08,
          size: 20 + Math.random() * 20,
          alpha: 1
        });
      }
    }

    function startSnipping() {
      if (snipInterval) return;
      snipInterval = setInterval(() => {
        snipState = !snipState;
        if (cursorImg) cursorImg.src = snipState ? SRC_CLOSED : SRC_OPEN;
        if (snipState) {
          const rect = canvas.getBoundingClientRect();
          erase(mouseX - rect.left, mouseY - rect.top);
          spawnLeaves(mouseX, mouseY);
        }
      }, 120);
    }

    function stopSnipping() {
      clearInterval(snipInterval);
      snipInterval = null;
      snipState = false;
      if (cursorImg) cursorImg.src = SRC_OPEN;
    }

    clipStage.addEventListener('mousemove', e => {
      if (!cleanImg) return;
      const rect = clipStage.getBoundingClientRect();
      const nx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const ny = (e.clientY - rect.top - rect.height / 2) / rect.height;
      cleanImg.style.transform = `translate(${nx * -6}px, ${ny * -4}px)`;
    });
    clipStage.addEventListener('mouseleave', () => {
      if (cleanImg) cleanImg.style.transform = 'translate(0, 0)';
    });

    function onMouseMove(clientX, clientY) {
      if (!hinted) {
        hinted = true;
        if (hint) { hint.style.opacity = '0'; setTimeout(() => { if (hint.parentNode) hint.remove(); }, 320); }
      }
      mouseX = clientX;
      mouseY = clientY;
      stopGrow();
      scheduleGrow();
      const rect = canvas.getBoundingClientRect();
      erase(clientX - rect.left, clientY - rect.top);
    }

    canvas.addEventListener('mousemove', e => {
      onMouseMove(e.clientX, e.clientY);
      if (cursor) {
        cursor.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
      }
      startSnipping();
      clearTimeout(moveTimer);
      moveTimer = setTimeout(stopSnipping, 300);
    });
    canvas.addEventListener('mouseenter', () => { if (cursor) cursor.classList.add('is-visible'); });
    canvas.addEventListener('mouseleave', () => {
      if (cursor) cursor.classList.remove('is-visible');
      stopSnipping();
      clearTimeout(moveTimer);
    });

    canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      const t = e.touches[0];
      onMouseMove(t.clientX, t.clientY);
    }, { passive: false });

    untrimmedImg.onload = () => {
      resize();
      const ro = new ResizeObserver(resize);
      ro.observe(clipStage);
    };
    untrimmedImg.src = 'assets/photos/haek-ikke-klippet.png';
    window.addEventListener('pagehide', () => { stopSnipping(); stopGrow(); });
  }

  // -------- Quote form (kontakt) --------
  const form = document.getElementById('quote-form');
  if (form) {
    const pills = form.querySelectorAll('.stqf-pill');
    const hiddenServices = form.querySelector('input[name="services"]');
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('is-on');
        pill.setAttribute('aria-pressed', String(pill.classList.contains('is-on')));
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
