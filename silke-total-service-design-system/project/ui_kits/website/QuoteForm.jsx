/* eslint-disable */
const QuoteForm = () => {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({ services: [], name: '', phone: '', email: '', address: '', message: '' });
  const [done, setDone] = React.useState(false);
  const toggle = (s) => setData(d => ({ ...d, services: d.services.includes(s) ? d.services.filter(x => x !== s) : [...d.services, s] }));
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));
  if (done) return (
    <div className="stqf stqf-done">
      <img src="../../assets/icon-check.svg" alt=""/>
      <h3>Tak — vi er på sagen.</h3>
      <p>Vi vender tilbage hurtigst muligt med en fast pris.<br/>Du hører fra os på {data.phone || data.email || 'kontakten'}.</p>
    </div>
  );
  return (
    <form className="stqf" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <div className="stqf-steps">
        {[1,2,3].map(n => <span key={n} className={`stqf-dot ${step >= n ? 'stqf-dot-on' : ''}`}>{n}</span>)}
      </div>
      {step === 1 && (
        <div className="stqf-section">
          <Eyebrow>Trin 1 af 3</Eyebrow>
          <h3>Hvad har du brug for?</h3>
          <p>Vælg én eller flere — du kan altid tilføje mere senere.</p>
          <div className="stqf-services">
            {SERVICES.map(s => (
              <button type="button" key={s.id} onClick={() => toggle(s.id)} className={`stqf-pill ${data.services.includes(s.id) ? 'stqf-pill-on' : ''}`}>
                <img src={`../../assets/${s.icon}`} alt=""/> {s.title}
              </button>
            ))}
          </div>
          <div className="stqf-actions">
            <Button onClick={() => setStep(2)} variant="primary" icon={<ArrowRight/>} type="button">Næste</Button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="stqf-section">
          <Eyebrow>Trin 2 af 3</Eyebrow>
          <h3>Skriv lidt om opgaven.</h3>
          <label>Adresse <span>(så vi kender omgivelserne)</span>
            <input value={data.address} onChange={e => set('address', e.target.value)} placeholder="Vejnavn 12, 8600 Silkeborg" />
          </label>
          <label>Beskrivelse
            <textarea rows="4" value={data.message} onChange={e => set('message', e.target.value)} placeholder="Skriv kort hvad du har brug for — fx '100 m bøgehæk, klippes 2× om året'"/>
          </label>
          <div className="stqf-actions">
            <button type="button" className="stqf-back" onClick={() => setStep(1)}>← Tilbage</button>
            <Button onClick={() => setStep(3)} variant="primary" icon={<ArrowRight/>} type="button">Næste</Button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="stqf-section">
          <Eyebrow>Trin 3 af 3</Eyebrow>
          <h3>Hvor kan vi nå dig?</h3>
          <div className="stqf-row">
            <label>Navn<input value={data.name} onChange={e => set('name', e.target.value)} placeholder="Mette Sørensen" required/></label>
            <label>Telefon<input value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="30 12 34 56" required/></label>
          </div>
          <label>E‑mail <span>(valgfri)</span>
            <input type="email" value={data.email} onChange={e => set('email', e.target.value)} placeholder="dig@eksempel.dk"/>
          </label>
          <p className="stqf-help">Vi vender tilbage hurtigst muligt. Ingen bindinger.</p>
          <div className="stqf-actions">
            <button type="button" className="stqf-back" onClick={() => setStep(2)}>← Tilbage</button>
            <Button variant="primary" icon={<ArrowRight/>} type="submit">Send forespørgsel</Button>
          </div>
        </div>
      )}
    </form>
  );
};
window.QuoteForm = QuoteForm;
