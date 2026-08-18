import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/feed">Movie Series Club</Link>
    <div className="nav-links">
      <Link to="/feed">Feed</Link>
      <Link to="/clubs">Clubs</Link>
      <Link to="/watched">Watched</Link>
      <Link to="/profile">Profile</Link>
    </div>
  </nav>
);

export default Navbar;
