import { Link } from 'react-router-dom';
import '../css/header.css';

const Logo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 60" className="logo-svg">
    <circle cx="30" cy="30" r="25" fill="#facc15" />
    <path d="M30 12 L30 48 M20 22 L40 22" stroke="#111827" strokeWidth="4" strokeLinecap="round" />
    <text x="65" y="28" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#111827">Love Like Jesus</text>
    <text x="65" y="48" fontFamily="Arial, sans-serif" fontSize="11" fill="#4b5563">Gordon Memorial Baptist Association</text>
  </svg>
);

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/" className="logo-link"><Logo /></Link>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/#resources">Resources</Link>
        <Link to="/#events">Events</Link>
        <Link to="/churches">Churches</Link>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
