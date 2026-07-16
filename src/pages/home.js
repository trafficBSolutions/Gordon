import { useState, useEffect } from 'react';
import '../css/home.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import churches from '../data/churches';

const API = 'https://gordon-server.onrender.com';

// Fix default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Home = () => {
  const [promo, setPromo] = useState({ title: '', url: '' });
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/promo`).then(r => r.json()).then(setPromo).catch(() => {});
    fetch(`${API}/api/events`).then(r => r.json()).then(setEvents).catch(() => {});
  }, []);

  return (
    <main className="home-page">
      <section className="hero">
        <div>
          <h1>Supporting Pastors.<br />Strengthening Churches.<br />Sharing Hope.</h1>
          <p>
            GMBA exists to support pastors and strengthen churches who share hope in Christ in our region and beyond!
          </p>
        </div>
      </section>

      <section className="video-section">
        <h2>{promo.title || 'From Tony'}</h2>
        <p>Watch the latest video update from our Associational Mission Strategist.</p>
        <div className="video-box">
          {promo.url ? (
            <iframe
              src={promo.url.replace('watch?v=', 'embed/')}
              title="Promo Video"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={{ borderRadius: '18px', minHeight: '300px' }}
            />
          ) : (
            <p>No video available yet.</p>
          )}
        </div>
      </section>

      <section className="events-section" id="events">
        <h2>Upcoming Events</h2>
        <p>Association events, church gatherings, meetings, and special services.</p>
        <div className="event-list">
          {events.length > 0 ? events.map(ev => (
            <div key={ev._id} className="event-card">
              <h3>{ev.title}</h3>
              <p>{ev.date}{ev.location && ` — ${ev.location}`}</p>
              {ev.description && <p>{ev.description}</p>}
            </div>
          )) : (
            <p>No upcoming events.</p>
          )}
        </div>
      </section>

      <section className="church-map-section">
        <div>
          <h2>Church List & Map</h2>
          <p>
            View churches in the Gordon Memorial Baptist Association on a map.
          </p>
        </div>

        <div className="map-box">
          <MapContainer center={[34.50, -84.93]} zoom={11} style={{ height: '500px', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {churches.map((church, i) => (
              <Marker key={i} position={[church.lat, church.lng]}>
                <Popup>
                  <strong>{church.name}</strong><br />
                  {church.address}<br />
                  {church.phone && <>{church.phone}<br /></>}
                  {church.website && <a href={church.website} target="_blank" rel="noreferrer">Website</a>}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </section>
    </main>
  );
};

export default Home;
