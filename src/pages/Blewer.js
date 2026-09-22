import { useState, useEffect, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import '../css/blewer.css';

const API = 'https://gordon-server.onrender.com';
const RECAPTCHA_SITE_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const emptyMember = { name: '', ss4: '', dob: '', relationship: '' };

const INITIAL_FORM = {
  // Primary
  name: '', ss4: '', dob: '', date: '',
  // Spouse
  spouseName: '', spouseSs4: '', spouseDob: '', phone: '',
  // Address
  address: '', city: '', state: 'GA', zip: '',
  // Household members (up to 6)
  members: Array(6).fill(null).map(() => ({ ...emptyMember })),
  // Income
  income1: '', income2: '', income3: '',
  // Church / visit
  churchMembership: '', wantsVisit: '',
  // Signature
  signature: '', signatureDate: '',
};

const Blewer = () => {
  const [forms, setForms] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    fetch(`${API}/api/blewer-forms`).then(r => r.json()).then(setForms).catch(() => {});
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleMemberChange = (index, field, value) => {
    const updated = form.members.map((m, i) => i === index ? { ...m, [field]: value } : m);
    setForm({ ...form, members: updated });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const captchaToken = recaptchaRef.current.getValue();
    if (!captchaToken) {
      setStatus('captcha');
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch(`${API}/api/blewer-intake`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, captchaToken }),
      });
      if (res.ok) {
        setStatus('success');
        setForm(INITIAL_FORM);
        setShowForm(false);
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

                {/* Row 1: Primary person */}
                <div className="intake-section-label">Primary Applicant</div>
                <div className="intake-row">
                  <div className="intake-field intake-field--lg">
                    <label>Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="intake-field intake-field--sm">
                    <label>Last 4 of SS#</label>
                    <input name="ss4" maxLength="4" value={form.ss4} onChange={handleChange} />
                  </div>
                  <div className="intake-field">
                    <label>Date of Birth</label>
                    <input name="dob" type="date" value={form.dob} onChange={handleChange} />
                  </div>
                  <div className="intake-field">
                    <label>Date</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} />
                  </div>
                </div>

                {/* Row 2: Spouse */}
                <div className="intake-section-label">Spouse</div>
                <div className="intake-row">
                  <div className="intake-field intake-field--lg">
                    <label>Spouse Name</label>
                    <input name="spouseName" value={form.spouseName} onChange={handleChange} />
                  </div>
                  <div className="intake-field intake-field--sm">
                    <label>Last 4 of SS#</label>
                    <input name="spouseSs4" maxLength="4" value={form.spouseSs4} onChange={handleChange} />
                  </div>
                  <div className="intake-field">
                    <label>Date of Birth</label>
                    <input name="spouseDob" type="date" value={form.spouseDob} onChange={handleChange} />
                  </div>
                  <div className="intake-field">
                    <label>Phone # *</label>
                    <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>

                {/* Row 3: Address */}
                <div className="intake-section-label">Address</div>
                <div className="intake-row">
                  <div className="intake-field intake-field--lg">
                    <label>Address *</label>
                    <input name="address" value={form.address} onChange={handleChange} required />
                  </div>
                  <div className="intake-field">
                    <label>City *</label>
                    <input name="city" value={form.city} onChange={handleChange} required />
                  </div>
                  <div className="intake-field intake-field--sm">
                    <label>State</label>
                    <input name="state" value={form.state} onChange={handleChange} />
                  </div>
                  <div className="intake-field intake-field--sm">
                    <label>Zip Code *</label>
                    <input name="zip" value={form.zip} onChange={handleChange} required />
                  </div>
                </div>

                {/* Others in Household */}
                <div className="intake-section-label">Others in Household</div>
                <div className="intake-household-header">
                  <span>Name</span>
                  <span>Last 4 of SS#</span>
                  <span>Date of Birth</span>
                  <span>Relationship</span>
                </div>
                {form.members.map((m, i) => (
                  <div className="intake-row intake-household-row" key={i}>
                    <div className="intake-field intake-field--lg">
                      <input placeholder="Name" value={m.name} onChange={e => handleMemberChange(i, 'name', e.target.value)} />
                    </div>
                    <div className="intake-field intake-field--sm">
                      <input placeholder="SS# last 4" maxLength="4" value={m.ss4} onChange={e => handleMemberChange(i, 'ss4', e.target.value)} />
                    </div>
                    <div className="intake-field">
                      <input type="date" value={m.dob} onChange={e => handleMemberChange(i, 'dob', e.target.value)} />
                    </div>
                    <div className="intake-field">
                      <input placeholder="Relationship" value={m.relationship} onChange={e => handleMemberChange(i, 'relationship', e.target.value)} />
                    </div>
                  </div>
                ))}

                {/* Income */}
                <div className="intake-section-label">Income</div>
                <div className="intake-row">
                  <div className="intake-field">
                    <label>Income Source 1 (per month)</label>
                    <input name="income1" placeholder="e.g. Employment — $1,200" value={form.income1} onChange={handleChange} />
                  </div>
                  <div className="intake-field">
                    <label>Income Source 2 (per month)</label>
                    <input name="income2" placeholder="e.g. SSI — $800" value={form.income2} onChange={handleChange} />
                  </div>
                  <div className="intake-field">
                    <label>Income Source 3 (per month)</label>
                    <input name="income3" placeholder="e.g. Child Support — $400" value={form.income3} onChange={handleChange} />
                  </div>
                </div>

                {/* Church / Visit */}
                <div className="intake-row">
                  <div className="intake-field intake-field--lg">
                    <label>Church Membership</label>
                    <input name="churchMembership" placeholder="Church name (if any)" value={form.churchMembership} onChange={handleChange} />
                  </div>
                  <div className="intake-field">
                    <label>Would you like a call / visit from a local church?</label>
                    <div className="intake-radio-group">
                      <label className="intake-radio">
                        <input type="radio" name="wantsVisit" value="yes" checked={form.wantsVisit === 'yes'} onChange={handleChange} />
                        Yes
                      </label>
                      <label className="intake-radio">
                        <input type="radio" name="wantsVisit" value="no" checked={form.wantsVisit === 'no'} onChange={handleChange} />
                        No
                      </label>
                    </div>
                  </div>
                </div>

                {/* Declaration & Signature */}
                <div className="intake-declaration">
                  I declare that the above information is correct. I also understand that this information
                  may be shared with other service agencies in Gordon County.
                </div>
                <div className="intake-row">
                  <div className="intake-field intake-field--lg">
                    <label>Signature (type full name) *</label>
                    <input name="signature" value={form.signature} onChange={handleChange} required placeholder="Type your full name as signature" />
                  </div>
                  <div className="intake-field">
                    <label>Date *</label>
                    <input name="signatureDate" type="date" value={form.signatureDate} onChange={handleChange} required />
                  </div>
                </div>

                {status === 'captcha' && (
                  <p className="intake-msg error">Please complete the reCAPTCHA before submitting.</p>
                )}
                <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} />

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
