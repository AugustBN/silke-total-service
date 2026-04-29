/* eslint-disable */
const Hero = () => (
  <section className="sthero">
    <img className="sthero-bg" src="../../assets/photos/terrasse-parasol.png" alt="" />
    <div className="sthero-tint" />
    <div className="sthero-inner">
      <Eyebrow>Have‑ og ejendomsservice · Midtjylland</Eyebrow>
      <h1 className="sthero-title">Hækken trænger til en tur.<br/>Vi kommer forbi.</h1>
      <p className="sthero-lead">
        Vi klipper, samler op og kører væk. Du får en have der ser ud,
        som du gerne vil have den — uden at skulle gøre det selv.
      </p>
      <div className="sthero-ctas">
        <Button as="a" href="pages/kontakt.html" variant="primary" icon={<ArrowRight/>}>Få et tilbud</Button>
        <Button as="a" href="#ydelser" variant="ghost-light">Se hvad vi laver</Button>
      </div>
      <div className="sthero-meta">
        <span><strong>Lokal</strong> · Midtjylland</span>
        <span><strong>Fast pris</strong> før vi starter</span>
        <span><strong>Privat</strong> + boligforeninger</span>
      </div>
    </div>
  </section>
);
window.Hero = Hero;
