/* eslint-disable */
const SHOTS = [
  { img: 'photos/haek-stigen.png',       label: 'Hækklipning · liguster' },
  { img: 'photos/boegehaek-tarp.png',    label: 'Bøgehæk efter klip' },
  { img: 'photos/terrasse-parasol.png',  label: 'Terrasse · sensommer' },
  { img: 'photos/hoejtryk-doer.png',     label: 'Højtryksspuling' },
  { img: 'photos/haek-knael-busk.png',   label: 'Detaljen i bunden' },
  { img: 'photos/ny-haek-roekke.png',    label: 'Ny række · klar til vækst' },
];

// Before/after compare slider — auto-sweeps on load, draggable after.
const CompareSlider = ({ before, after, beforeAlt, afterAlt }) => {
  const [pos, setPos] = React.useState(50);          // % from left
  const [auto, setAuto] = React.useState(true);      // auto-sweep until user grabs
  const [wrapW, setWrapW] = React.useState(0);
  const wrapRef = React.useRef(null);
  const draggingRef = React.useRef(false);

  // Track wrapper width so the clipped inner image lines up with the visible viewport.
  React.useEffect(() => {
    if (!wrapRef.current) return;
    const measure = () => setWrapW(wrapRef.current.clientWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, []);

  // Auto-sweep: 50 → 8 → 92 → 50, eased, ~7s loop. Stops on user input.
  React.useEffect(() => {
    if (!auto) return;
    let raf;
    const start = performance.now();
    const loop = (now) => {
      const elapsed = (now - start) / 1000;
      // sine wave between 8 and 92 with period 7s
      const v = 50 + 42 * Math.sin((elapsed / 7) * Math.PI * 2);
      setPos(v);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [auto]);

  const updateFromClientX = (clientX) => {
    const rect = wrapRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, pct)));
  };

  const onPointerDown = (e) => {
    setAuto(false);
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };
  const onPointerMove = (e) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };
  const onPointerUp = (e) => {
    draggingRef.current = false;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch {}
  };

  return (
    <>
      <style>{`
        .stcs { position: relative; width: 100%; aspect-ratio: 16/10; border-radius: var(--radius-lg); overflow: hidden; user-select: none; touch-action: none; cursor: ew-resize; margin-bottom: 48px; background: var(--bark); box-shadow: 0 30px 60px -20px rgba(31,58,44,0.35), 0 8px 16px rgba(0,0,0,0.08); }
        .stcs-layer { position: absolute; inset: 0; }
        .stcs-img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; pointer-events: none; display: block; }
        .stcs-clip { position: absolute; top: 0; left: 0; bottom: 0; overflow: hidden; will-change: width; }
        .stcs-clip-inner { position: relative; width: 100vw; max-width: none; height: 100%; }
        .stcs-tag { position: absolute; top: 16px; background: rgba(245,241,232,0.95); color: var(--bark); font-family: var(--font-sans); font-weight: 700; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; padding: 6px 12px; border-radius: 999px; pointer-events: none; backdrop-filter: blur(4px); z-index: 3; }
        .stcs-tag-before { left: 16px; }
        .stcs-tag-after { right: 16px; background: var(--forest); color: var(--cream); }
        .stcs-handle { position: absolute; top: 0; bottom: 0; transform: translateX(-50%); pointer-events: none; will-change: left; z-index: 4; }
        .stcs-line { position: absolute; top: 0; bottom: 0; left: 50%; width: 3px; margin-left: -1.5px; background: var(--cream); box-shadow: 0 0 12px rgba(0,0,0,0.4); }
        .stcs-knob { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 48px; height: 48px; border-radius: 50%; background: var(--cream); color: var(--forest); display: grid; place-items: center; box-shadow: 0 4px 14px rgba(0,0,0,0.25), 0 0 0 4px rgba(245,241,232,0.25); pointer-events: none; }
        .stcs-hint { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: rgba(31,58,44,0.92); color: var(--cream); font-size: 13px; font-weight: 500; padding: 8px 14px; border-radius: 999px; pointer-events: none; z-index: 5; }
      `}</style>
      <div
        className="stcs"
        ref={wrapRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        role="slider"
        aria-label="Træk for at sammenligne før og efter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
      >
        {/* AFTER fills the layer */}
        <div className="stcs-layer">
          <img className="stcs-img" src={`../../assets/${after}`} alt={afterAlt} draggable="false" />
        </div>
        {/* BEFORE clipped from the left. Inner has same width as wrapper so the visible portion lines up. */}
        <div className="stcs-clip" style={{ width: `${pos}%` }}>
          <div className="stcs-clip-inner" style={{ width: wrapW ? wrapW + 'px' : '100%' }}>
            <img className="stcs-img" src={`../../assets/${before}`} alt={beforeAlt} draggable="false" />
          </div>
        </div>

        <div className="stcs-tag stcs-tag-before">Før</div>
        <div className="stcs-tag stcs-tag-after">Efter</div>

        <div className="stcs-handle" style={{ left: `${pos}%` }}>
          <div className="stcs-line" />
          <div className="stcs-knob">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 6l-6 6 6 6" />
              <path d="M15 6l6 6-6 6" />
            </svg>
          </div>
        </div>

        {auto && (<div className="stcs-hint">Træk for at se forskellen</div>)}
      </div>
    </>
  );
};

const BeforeAfter = () => (
  <section className="stba">
    <div className="stba-inner">
      <div className="stba-head">
        <Eyebrow>Før / efter</Eyebrow>
        <h2>Fliserens, der faktisk gør en forskel.</h2>
        <p className="lead" style={{maxWidth: 540, marginTop: 8}}>
          Træk i håndtaget — eller lad det selv vise dig, hvad højtryksspuleren gør ved
          en alm. dansk indkørsel. Følg med i flere før/efter-billeder på{' '}
          <a href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener">vores Facebook</a>.
        </p>
      </div>

      <CompareSlider
        before="photos/fliser-foer.png"
        after="photos/fliser-efter.png"
        beforeAlt="Fliser før højtryksspuling"
        afterAlt="Fliser efter højtryksspuling"
      />

      <div className="stba-strip">
        {SHOTS.map((s, i) => (
          <figure className="stba-card" key={i}>
            <img src={`../../assets/${s.img}`} alt={s.label} />
            <figcaption>{s.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
window.BeforeAfter = BeforeAfter;
