import { useState, useEffect } from 'react';
import '../css/blewer.css';

const API = 'https://gordon-server.onrender.com';

const INITIAL_FORM = {
  firstName: '', lastName: '', address: '', city: '', state: 'GA', zip: '',
  phone: '', email: '', householdSize: '', monthlyIncome: '',
  needReason: '', firstVisit: 'yes', referredBy: '',
};

const Blewer = () => {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/blewer-forms`).then(r => r.json()).then(setForms).catch(() => {});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(`${API}/api/blewer-intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        setShowForm(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <main className="blewer-page">
      <section className="blewer-hero">
        <h1>Blewer Food Center</h1>
        <p>Serving families in Gordon County with love and nourishment.</p>
      </section>

      <section className="blewer-content">
        <div className="blewer-info">
          <h2>Our Mission</h2>
          <p>
            The Blewer Food Center Pantry, located in Calhoun, GA, is dedicated to addressing food insecurity
            by offering emergency food assistance to individuals and families in need. Our mission is to ensure
            that every household has access to quality food items that meet their basic nutritional needs.
          </p>
          <p>
            We work tirelessly to provide a warm and supportive environment where those experiencing hunger
            can find the nourishment they require. Whether you're in immediate need or facing ongoing
            challenges, our food pantry is here to help you and your family thrive.
          </p>

          {/* Downloadable forms */}
          {forms.length > 0 && (
            <div className="blewer-forms">
              <h2>Client Forms</h2>
              <p>Download and print the form below.</p>
              <ul>
                {forms.map(f => (
                  <li key={f._id}>
                    <a href={f.url} target="_blank" rel="noreferrer">📄 {f.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Online intake form */}
          <div className="blewer-intake">
            <h2>Client Intake Form</h2>
            <p>Fill out the form below and it will be sent directly to our team.</p>

            {status === 'success' && (
              <p className="intake-msg success">✅ Your form has been submitted! We will be in touch soon.</p>
            )}
            {status === 'error' && (
              <p className="intake-msg error">Something went wrong. Please call us at (706) 263-2570.</p>
            )}

            {!showForm && status !== 'success' && (
              <button className="intake-toggle" onClick={() => setShowForm(true)}>
                Fill Out Intake Form Online
              </button>
            )}

            {showForm && (
              <form className="intake-form" onSubmit={handleSubmit}>
                <div className="intake-row">
                  <div className="intake-field">
                    <label>First Name *</label>
                    <input name="firstName" value={form.firstName} onChange={handleChange} required />
                  </div>
                  <div className="intake-field">
                    <label>Last Name *</label>
                    <input name="lastName" value={form.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="intake-field">
                  <label>Street Address *</label>
                  <input name="address" value={form.address} onChange={handleChange} required />
                </div>

                <div className="intake-row">
                  <div className="intake-field">
                    <label>City *</label>
                    <input name="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="intake-field intake-field--sm">
                    <label>State</label>
                    <input name="state" value={form.state} onChange={handleChange} />
                  </div>
                  <div className="intake-field intake-field--sm">
                    <label>ZIP *</label>
                    <input name="zip" value={form.zip} onChange={handleChange} required />
                  </div>
                </div>

                <div className="intake-row">
                  <div className="intake-field">
                    <label>Phone *</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                  </div>
                  <div className="intake-field">
                    <label>Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} />
                  </div>
                </div>

                <div className="intake-row">
                  <div className="intake-field">
                    <label>Household Size *</label>
                    <input name="householdSize" type="number" min="1" value={form.householdSize} onChange={handleChange} required />
                  </div>
                  <div className="intake-field">
                    <label>Monthly Household Income</label>
                    <input name="monthlyIncome" value={form.monthlyIncome} onChange={handleChange} placeholder="e.g. $1,200" />
                  </div>
                </div>

                <div className="intake-field">
                  <label>Reason for Need</label>
                  <textarea name="needReason" rows="3" value={form.needReason} onChange={handleChange} placeholder="Brief description (optional)" />
                </div>

                <div className="intake-row">
                  <div className="intake-field">
                    <label>Is this your first visit?</label>
                    <select name="firstVisit" value={form.firstVisit} onChange={handleChange}>
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  <div className="intake-field">
                    <label>Referred By</label>
                    <input name="referredBy" value={form.referredBy} onChange={handleChange} placeholder="Church, agency, etc." />
                  </div>
                </div>

                <div className="intake-actions">
                  <button type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? 'Submitting...' : 'Submit Form'}
                  </button>
                  <button type="button" className="intake-cancel" onClick={() => setShowForm(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="blewer-contact">
          <h2>Contact</h2>
          <p><strong>Judy Craig, Director</strong></p>
          <p><a href="tel:7062632570">(706) 263-2570</a></p>
          <p><a href="mailto:blewerfoodcenter@gmail.com">blewerfoodcenter@gmail.com</a></p>
          <p className="blewer-address">373 Morrow Rd SE, Calhoun, GA 30701</p>
        </div>
      </section>
    </main>
  );
};

export default Blewer;
