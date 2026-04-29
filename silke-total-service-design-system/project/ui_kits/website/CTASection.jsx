/* eslint-disable */
const CTASection = () => (
  <section className="stcta">
    <div className="stcta-inner">
      <h2>Skal vi kigge forbi?</h2>
      <p>Ring, eller skriv hvad du har brug for. Vi vender tilbage med en fast pris.</p>
      <div className="stcta-actions">
        <Button as="a" href="pages/kontakt.html" variant="primary-light" icon={<ArrowRight/>}>Bestil et besøg</Button>
        <span className="stcta-phone">
          <img src="../../assets/icon-phone.svg" alt=""/> -- -- -- --
        </span>
      </div>
    </div>
  </section>
);
window.CTASection = CTASection;

const Footer = () => (
  <footer className="stft">
    <div className="stft-inner">
      <div className="stft-brand">
        <img src="../../assets/logo-mark.svg" alt="Silke" width="48" height="48"/>
        <p>Have‑ og ejendomsservice<br/>i Midtjylland.</p>
      </div>
      <div className="stft-col">
        <h4>Ydelser</h4>
        <a href="#">Haveordning</a>
        <a href="#">Hækklipning</a>
        <a href="#">Græsslåning</a>
        <a href="#">Fliserens</a>
        <a href="#">Vinduesrens</a>
        <a href="#">Snerydning</a>
      </div>
      <div className="stft-col">
        <h4>Firma</h4>
        <a href="pages/om-os.html">Om os</a>
        <a href="pages/omraade.html">Område</a>
        <a href="pages/kontakt.html">Kontakt</a>
      </div>
      <div className="stft-col">
        <h4>Kontakt</h4>
        <span><img src="../../assets/icon-phone.svg" alt=""/> -- -- -- --</span>
        <span><img src="../../assets/icon-mail.svg" alt=""/> --</span>
        <a href="https://www.facebook.com/profile.php?id=61574788933190" target="_blank" rel="noopener">
          <img src="../../assets/icon-mail.svg" alt=""/> Facebook · silkehave
        </a>
        <span className="stft-meta"><img src="../../assets/icon-mappin.svg" alt=""/> Midtjylland</span>
      </div>
    </div>
    <div className="stft-base">
      <span>© Silke Total Service</span>
      <span>Have‑ og ejendomsservice</span>
    </div>
  </footer>
);
window.Footer = Footer;
