import { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../css/contact.css';

const API = 'https://gordon-server.onrender.com';
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const captchaToken = recaptchaRef.current.getValue();
    if (!captchaToken) {
      setStatus('captcha');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`${API}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      if (res.ok) {
        setStatus('success');
        setForm({ name: '', email: '', message: '' });
        recaptchaRef.current.reset();
      } else {
        setStatus('error');
        recaptchaRef.current.reset();
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <h1>Contact Us</h1>
        <p>Get in touch with the Association &amp; Blewer Food Center offices.</p>
      </section>

      <section className="contact-content">
        <div className="contact-info">
          <h3>Gordon Memorial Baptist Association</h3>
          <p>373 Morrow Rd SE, Calhoun, GA 30701</p>
          <p>Office: <a href="tel:7065346986">(706) 534-6986</a></p>
          <br />
          <p><strong>Tony Chester, AMS</strong></p>
          <p><a href="mailto:AMS@hopegordon.com">AMS@hopegordon.com</a></p>
          <br />
          <p><strong>Amy Rickett, Administrative Assistant</strong></p>
          <p><a href="mailto:arickett373@gmail.com">arickett373@gmail.com</a></p>
          <br />
          <p><strong>Judy Craig, Director — Blewer Food Center</strong></p>
          <p><a href="tel:7062632570">(706) 263-2570</a></p>
          <p><a href="mailto:blewerfoodcenter@gmail.com">blewerfoodcenter@gmail.com</a></p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send a Message</h3>

          {status === 'success' && (
            <p className="form-msg success">✅ Message sent! We'll be in touch soon.</p>
          )}
          {status === 'error' && (
            <p className="form-msg error">Something went wrong. Please try again or call us directly.</p>
          )}

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="6"
            value={form.message}
            onChange={handleChange}
            required
          />
          {status === 'captcha' && (
            <p className="form-msg error">Please complete the reCAPTCHA before submitting.</p>
          )}
          <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
