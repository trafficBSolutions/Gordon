import '../css/footer.css';

const Footer = () => {
  return (
    <footer className="site-footer" id="contact">
      <div className="footer-content">
        <div className="footer-col">
          <h3>Gordon Memorial Baptist Association</h3>
          <p>Supporting Pastors. Strengthening Churches. Sharing Hope.</p>
        </div>
        <div className="footer-col">
          <h4>Quick Links</h4>
          <a href="/">Home</a>
          <a href="/pastors">Pastors</a>
          <a href="/churches">Churches</a>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Office: <a href="tel:7065346986">(706) 534-6986</a></p>
          <p><a href="mailto:AMS@hopegordon.com">AMS@hopegordon.com</a></p>
          <p>373 Morrow Rd SE,Calhoun, GA 30701</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Gordon Memorial Baptist Association Website Created by <a className="footer-face"href="https://www.material-worx.com/portfolio" target="_blank" rel="noopener noreferrer">MX Systems</a> - All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
