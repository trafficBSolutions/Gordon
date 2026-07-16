import '../css/contact.css';

const Contact = () => {
  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with the Association &amp; Blewer Food Center offices.</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <p><strong>Office:</strong> <a href="tel:7065346986">(706) 534-6986</a></p>
          <p>373 Morrow Rd SE, Calhoun, GA 30701</p>
          <br />
          <p><strong>Tony Chester, AMS:</strong> <a href="mailto:AMS@hopegordon.com">AMS@hopegordon.com</a></p>
          <br />
          <p><strong>Amy Rickett, Administrative Assistant:</strong> <a href="mailto:arickett373@gmail.com">arickett373@gmail.com</a></p>
          <br />
          <p><strong>Judy Craig, Director Blewer Food Center:</strong> <a href="tel:7062632570">(706) 263-2570</a></p>
          <p><a href="mailto:blewerfoodcenter@gmail.com">blewerfoodcenter@gmail.com</a></p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
