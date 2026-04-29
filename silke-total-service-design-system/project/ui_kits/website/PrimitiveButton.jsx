/* eslint-disable */
/** Shared button + link primitives. */

const Button = ({ children, variant = 'primary', as = 'button', href, onClick, icon, ...rest }) => {
  const cls = `stb stb-${variant}`;
  const inner = (
    <>
      {children}
      {icon && <span className="stb-icon" aria-hidden="true">{icon}</span>}
    </>
  );
  if (as === 'a' || href) return <a className={cls} href={href || '#'} onClick={onClick} {...rest}>{inner}</a>;
  return <button className={cls} onClick={onClick} {...rest}>{inner}</button>;
};

const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
);

const Eyebrow = ({ children }) => <div className="stb-eyebrow">{children}</div>;

window.Button = Button;
window.ArrowRight = ArrowRight;
window.Eyebrow = Eyebrow;
