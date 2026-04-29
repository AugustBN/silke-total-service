/* eslint-disable */
const REVIEWS = [
  { quote: 'De kom da de havde aftalt, klippede hækken og ryddede pænt op efter sig. Fast pris, ingen overraskelser.', name: 'Mette S.', meta: 'Privatkunde · Silkeborg', tag: 'eksempel' },
  { quote: 'Vi har en haveordning til vores ejendom. Det er bare nemt — de kommer, og det ser pænt ud hele sæsonen.', name: 'Boligforening · Viborg', meta: 'Erhvervskunde', tag: 'eksempel' },
  { quote: 'Fliserne lignede nye bagefter. De viste mig hvad de gjorde, og hvad det kom til at koste, før de begyndte.', name: 'Jens P.', meta: 'Privatkunde · Ry', tag: 'eksempel' },
];

const ReviewsSection = () => (
  <section className="strv">
    <div className="strv-inner">
      <div className="strv-head">
        <Eyebrow>Hvad kunder siger</Eyebrow>
        <h2>Lavt drama, fast pris, pænt resultat.</h2>
      </div>
      <div className="strv-grid">
        {REVIEWS.map((r, i) => (
          <figure className="strv-card" key={i}>
            <img className="strv-quote" src="../../assets/icon-quote.svg" alt="" />
            <blockquote>{r.quote}</blockquote>
            <figcaption>
              <strong>{r.name}</strong>
              <span>{r.meta}</span>
            </figcaption>
            <span className="strv-tag">{r.tag}</span>
          </figure>
        ))}
      </div>
    </div>
  </section>
);
window.ReviewsSection = ReviewsSection;
