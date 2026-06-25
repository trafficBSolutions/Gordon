import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-content">
        <div className="footer-col">
          <h3>Gordon Memorial Baptist Association</h3>
          <p>Encouraging Pastors. Supporting Churches. Promoting the Gospel.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/#resources">Resources</a>
          <a href="/#events">Events</a>
          <a href="/churches">Churches</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Tony Chester</p>
          <p><a href="tel:2398269908">(239) 826-9908</a></p>
          <p>Calhoun, GA 30701</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gordon Memorial Baptist Association Website Created by <a className="footer-face"href="https://www.material-worx.com/portfolio" target="_blank" rel="noopener noreferrer">MX Systems</a> - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
