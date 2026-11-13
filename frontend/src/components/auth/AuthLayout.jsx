import { Clapperboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AuthLayout({ children }) {
  return (
    <section className="auth-layout" aria-label="CineClub authentication">
      <div className="auth-layout__glow" aria-hidden="true" />
      <Link className="auth-brand" to="/" aria-label="CineClub home">
        <Clapperboard aria-hidden="true" size={23} />
        <span>CineClub</span>
      </Link>
      {children}
      <p className="auth-layout__caption">A place for the stories that stay with us.</p>
    </section>
  );
}
