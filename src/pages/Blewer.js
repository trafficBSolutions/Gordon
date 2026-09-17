import { useState, useEffect } from 'react';
import '../css/blewer.css';

const API = 'https://gordon-server.onrender.com';

const Blewer = () => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/blewer-forms`).then(r => r.json()).then(setForms).catch(() => {});
  }, []);

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
            The Blewer Food Center Pantry, located in Calhoun, GA, is dedicated to addressing food insecurity by offering emergency food assistance to individuals and families in need. Our mission is to ensure that every household has access to quality food items that meet their basic nutritional needs.
          </p>
          <p>
            We work tirelessly to provide a warm and supportive environment where those experiencing hunger can find the nourishment they require. Whether you're in immediate need or facing ongoing challenges, our food pantry is here to help you and your family thrive.
          </p>

          {forms.length > 0 && (
            <div className="blewer-forms">
              <h2>Client Forms</h2>
              <p>Download, complete, and email the form back to Judy.</p>
              <ul>
                {forms.map(f => (
                  <li key={f._id}>
                    <a href={`${API}${f.url}`} target="_blank" rel="noreferrer">📄 {f.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
