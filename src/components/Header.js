import { Link } from 'react-router-dom';
import '../css/header.css';

const FacebookLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fb-logo">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const Header = () => {
  return (
    <header className="site-header">
      <a href="https://www.facebook.com/GMBA30701/" target="_blank" rel="noreferrer" className="logo-link">
        <FacebookLogo />
      </a>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/pastor-resources">Pastor Resources</Link>
        <Link to="/churches">Churches</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/blewer">Blewer</Link>
      </nav>
    </header>
  );
};

export default Header;
