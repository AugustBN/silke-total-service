/* eslint-disable */
const SERVICES = [
  { id: 'haveordning',  title: 'Haveordning',  icon: 'icon-haveordning.svg',  body: 'Fast aftale året rundt — vi holder haven, så du ikke skal tænke på det.' },
  { id: 'haekklipning', title: 'Hækklipning',  icon: 'icon-haekklipning.svg', body: 'Bøg, liguster, thuja. Vi klipper, samler op og kører væk.' },
  { id: 'graesslaaning',title: 'Græsslåning',  icon: 'icon-graesslaaning.svg',body: 'Ugentligt eller efter behov. Kanter med, hvis du vil have det.' },
  { id: 'fliserens',    title: 'Fliserens',    icon: 'icon-fliserens.svg',    body: 'Højtryk og blødt kemi. Terrassen ser ud som ny igen.' },
  { id: 'vinduesrens',  title: 'Vinduesrens',  icon: 'icon-vinduesrens.svg',  body: 'Indvendigt og udvendigt. Karme tørres af. Ingen striber.' },
  { id: 'snerydning',   title: 'Snerydning',   icon: 'icon-snerydning.svg',   body: 'Sæsonaftale eller akut. Saltning og rydning før morgentrafik.' },
];

const ServiceGrid = () => (
  <section className="stsg" id="ydelser">
    <div className="stsg-inner">
      <div className="stsg-head">
        <Eyebrow>Det vi laver</Eyebrow>
        <h2>Seks ting vi gør godt.</h2>
        <p className="lead">Vælg én — eller bind dem sammen i en haveordning, så det hele kører af sig selv.</p>
      </div>
      <div className="stsg-grid">
        {SERVICES.map(s => (
          <a className="stsg-card" key={s.id} href={s.id === 'haekklipning' ? 'pages/service.html' : '#'}>
            <img className="stsg-icon" src={`../../assets/${s.icon}`} alt="" />
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <span className="stsg-more">Læs mere →</span>
          </a>
        ))}
      </div>
    </div>
  </section>
);
window.ServiceGrid = ServiceGrid;
window.SERVICES = SERVICES;
