import { useState } from 'react';
import churches from '../data/churches';
import '../css/pastors.css';

const Pastors = () => {
  const [search, setSearch] = useState('');

  const pastors = churches
    .filter(c => c.pastor)
    .map(c => ({ name: c.pastor, church: c.name, phone: c.phone }))
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.church.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <main className="pastors-page">
      <section className="pastors-hero">
        <h1>Our Pastors</h1>
        <p>Meet the pastors serving across the Gordon Memorial Baptist Association.</p>
      </section>

      <section className="pastors-content">
        <input
          type="text"
          className="pastor-search"
          placeholder="Search by pastor or church name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="pastors-grid">
          {pastors.map((p, i) => (
            <div key={i} className="pastor-card">
              <h3>{p.name}</h3>
              <p className="pastor-church">{p.church}</p>
              {p.phone && <p className="pastor-phone">{p.phone}</p>}
            </div>
          ))}
          {pastors.length === 0 && <p className="no-results">No pastors found.</p>}
        </div>
      </section>
    </main>
  );
};

export default Pastors;
