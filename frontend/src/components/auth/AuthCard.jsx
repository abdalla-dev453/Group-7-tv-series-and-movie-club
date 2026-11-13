export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <section className="auth-card" aria-labelledby="auth-card-title">
      <p className="auth-card__eyebrow">Your seat is waiting</p>
      <h1 id="auth-card-title">{title}</h1>
      <p className="auth-card__subtitle">{subtitle}</p>
      {children}
      <div className="auth-card__footer">{footer}</div>
    </section>
  );
}
