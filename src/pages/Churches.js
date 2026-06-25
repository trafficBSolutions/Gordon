import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import churches from '../data/churches';
import '../css/churches.css';

const Churches = () => {
  const [search, setSearch] = useState('');

  const filtered = churches.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.pastor.toLowerCase().includes(search.toLowerCase()) ||
    c.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="churches-page">
      <section className="churches-hero">
        <h1>Our Churches</h1>
        <p>Browse all 35 churches in the Gordon Memorial Baptist Association.</p>
      </section>

      <section className="churches-content">
        <input
          type="text"
          className="church-search"
          placeholder="Search by name, pastor, or address..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="table-wrapper">
          <table className="churches-table">
            <thead>
              <tr>
                <th>Church</th>
                <th>Pastor</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => (
                <tr key={i}>
                  <td>{c.name}</td>
                  <td>{c.pastor || '—'}</td>
                  <td>{c.address}</td>
                  <td>{c.phone || '—'}</td>
                  <td>{c.website ? <a href={c.website} target="_blank" rel="noreferrer">Visit</a> : '—'}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan="5" className="no-results">No churches found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="churches-map">
        <h2>Church Map</h2>
        <MapContainer center={[34.50, -84.93]} zoom={11} style={{ height: '500px', width: '100%', borderRadius: '12px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {filtered.map((church, i) => (
            <Marker key={i} position={[church.lat, church.lng]}>
              <Popup>
                <strong>{church.name}</strong><br />
                {church.pastor && <>Pastor: {church.pastor}<br /></>}
                {church.address}<br />
                {church.phone && <>{church.phone}<br /></>}
                {church.website && <a href={church.website} target="_blank" rel="noreferrer">Website</a>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>
    </main>
  );
};

export default Churches;
