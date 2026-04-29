/* eslint-disable */
// Morphing logo: blue water drop -> green leaf, driven by scrollY.
const MorphMark = ({ t }) => {
  const lerp = (a, b, k) => a + (b - a) * k;
  // Identical structure: M + 4 cubic Béziers + Z, so we lerp control points 1:1.
  const drop = [50,6,  58,18, 80,38, 80,60,  80,78, 67,92, 50,92,  33,92, 20,78, 20,60,  20,38, 42,18, 50,6];
  const leaf = [50,6,  50,12, 78,30, 78,50,  78,72, 65,92, 50,92,  35,92, 22,72, 22,50,  22,30, 50,12, 50,6];
  const p = drop.map((v, i) => lerp(v, leaf[i], t));
  const d = `M${p[0]},${p[1]} C${p[2]},${p[3]} ${p[4]},${p[5]} ${p[6]},${p[7]} C${p[8]},${p[9]} ${p[10]},${p[11]} ${p[12]},${p[13]} C${p[14]},${p[15]} ${p[16]},${p[17]} ${p[18]},${p[19]} C${p[20]},${p[21]} ${p[22]},${p[23]} ${p[24]},${p[25]} Z`;

  // Color lerp blue -> green via OKLCH-ish RGB mix
  const blue = [82, 158, 209];   // water blue
  const green = [88, 138, 70];   // leaf green
  const rgb = blue.map((c, i) => Math.round(lerp(c, green[i], t)));
  const fill = `rgb(${rgb.join(',')})`;

  return (
    <svg viewBox="0 0 100 100" width="36" height="36" aria-hidden="true">
      <path d={d} fill={fill} />
      {/* drop highlight (top-left) — fades out */}
      <ellipse cx="38" cy="38" rx="6" ry="10" fill="#ffffff" opacity={(1 - t) * 0.55} transform="rotate(-20 38 38)" />
      {/* leaf midrib + side veins — fade in */}
      <path d="M50,14 L50,86" stroke="#1f3a2c" strokeWidth="1.6" strokeLinecap="round" opacity={t * 0.55} />
      <path d="M50,38 Q60,42 66,50" stroke="#1f3a2c" strokeWidth="1" fill="none" strokeLinecap="round" opacity={t * 0.4} />
      <path d="M50,58 Q60,62 66,68" stroke="#1f3a2c" strokeWidth="1" fill="none" strokeLinecap="round" opacity={t * 0.4} />
      <path d="M50,38 Q40,42 34,50" stroke="#1f3a2c" strokeWidth="1" fill="none" strokeLinecap="round" opacity={t * 0.4} />
      <path d="M50,58 Q40,62 34,68" stroke="#1f3a2c" strokeWidth="1" fill="none" strokeLinecap="round" opacity={t * 0.4} />
    </svg>
  );
};

const Header = ({ onNavigate }) => {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [t, setT] = React.useState(0); // 0 = drop, 1 = leaf

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      // morph 0 → 1 over the first ~520px of scroll
      setT(Math.max(0, Math.min(1, y / 520)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Ydelser',   to: '#ydelser' },
    { label: 'Om os',     to: 'pages/om-os.html' },
    { label: 'Område',    to: 'pages/omraade.html' },
    { label: 'Kontakt',   to: 'pages/kontakt.html' },
  ];
  return (
    <header className={`sth ${scrolled ? 'sth-solid' : ''}`}>
      <div className="sth-inner">
        <a className="sth-logo" href="index.html">
          <span className="sth-logo-mark"><MorphMark t={t} /></span>
          <span className="sth-logo-word">
            <span className="sth-logo-line1">Silke</span>
            <span className="sth-logo-line2">Total Service</span>
          </span>
        </a>
        <nav className="sth-nav">
          {links.map(l => <a key={l.to} href={l.to}>{l.label}</a>)}
        </nav>
        <div className="sth-right">
          <a className="sth-phone" href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener">
            facebook · silkehave
          </a>
          <Button as="a" href="pages/kontakt.html" variant="primary">Få et tilbud</Button>
        </div>
        <button className="sth-burger" aria-label="Menu" onClick={() => setOpen(!open)}>
          <img src="../../assets/icon-menu.svg" alt="" />
        </button>
      </div>
      {open && (
        <div className="sth-mobile">
          {links.map(l => <a key={l.to} href={l.to}>{l.label}</a>)}
          <a className="sth-mobile-cta" href="pages/kontakt.html">Få et tilbud</a>
        </div>
      )}
    </header>
  );
};
window.Header = Header;
