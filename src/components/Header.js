import { Link } from 'react-router-dom';
import '../css/header.css';

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/" className="logo-link">
        <div className="logo-text">
          <span className="logo-main">Supporting Pastors.</span>
          <span className="logo-main">Strengthening Churches.</span>
          <span className="logo-main">Sharing Hope.</span>
        </div>
      </Link>
      <nav className="main-nav">
        <Link to="/">Home</Link>
        <Link to="/pastor-resources">Pastor Resources</Link>
        <Link to="/churches">Churches</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/blewer">Blewer</Link>
        <a href="https://www.facebook.com/GMBA30701/" target="_blank" rel="noreferrer" className="nav-facebook">Facebook</a>
      </nav>
    </header>
  );
};

export default Header;
