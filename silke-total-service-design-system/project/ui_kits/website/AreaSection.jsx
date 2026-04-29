/* eslint-disable */
const TOWNS = [
  'Silkeborg', 'Viborg', 'Skanderborg', 'Herning', 'Ikast', 'Brande',
  'Bjerringbro', 'Hammel', 'Ry', 'Them', 'Kjellerup', 'Karup',
];

const AreaSection = () => (
  <section className="stas">
    <div className="stas-inner">
      <div className="stas-text">
        <Eyebrow>Område</Eyebrow>
        <h2>Vi kører primært i Midtjylland.</h2>
        <p>
          Base i Silkeborg-området, og vi kører ud i en god radius derfra.
          Står du udenfor listen — ring og spørg, vi kan ofte godt komme alligevel.
        </p>
        <div className="stas-towns">
          {TOWNS.map(t => <span key={t} className="stas-chip">{t}</span>)}
        </div>
        <Button as="a" href="pages/omraade.html" variant="ghost">Se kort over området</Button>
      </div>
      <div className="stas-map" aria-hidden="true">
        {/* Stylised map placeholder — Midtjylland silhouette + radius pin */}
        <svg viewBox="0 0 320 320" width="100%" height="100%">
          <rect width="320" height="320" fill="#EFEADE"/>
          <path d="M40,120 Q60,80 110,70 Q160,55 200,80 Q260,95 270,140 Q285,200 240,240 Q190,280 130,260 Q70,240 50,190 Q30,160 40,120 Z" fill="#F5F1E8" stroke="#8A8578" strokeWidth="1"/>
          <circle cx="155" cy="170" r="60" fill="rgba(127,166,107,0.18)" stroke="#3B6B45" strokeDasharray="3 4" strokeWidth="1"/>
          <circle cx="155" cy="170" r="6" fill="#1F3A2C"/>
          <text x="170" y="172" fontFamily="DM Sans, sans-serif" fontSize="11" fill="#1F3A2C" fontWeight="600">Silkeborg</text>
          <circle cx="115" cy="125" r="3" fill="#3B6B45"/>
          <text x="80" y="118" fontFamily="DM Sans" fontSize="10" fill="#3A2E22">Viborg</text>
          <circle cx="200" cy="195" r="3" fill="#3B6B45"/>
          <text x="208" y="198" fontFamily="DM Sans" fontSize="10" fill="#3A2E22">Skanderborg</text>
          <circle cx="90" cy="205" r="3" fill="#3B6B45"/>
          <text x="55" y="220" fontFamily="DM Sans" fontSize="10" fill="#3A2E22">Herning</text>
        </svg>
      </div>
    </div>
  </section>
);
window.AreaSection = AreaSection;
