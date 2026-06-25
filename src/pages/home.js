import '../css/home.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import churches from '../data/churches';

// Fix default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero">
        <div>
          <p className="eyebrow">Gordon Memorial Baptist Association</p>
          <h1>Encouraging Pastors. Supporting Churches. Promoting the Gospel.</h1>
          <p>
            We exist to encourage pastors, resource churches, promote upcoming events,
            and connect our association together.
          </p>

          <div className="hero-buttons">
            <a href="#resources">Resources</a>
            <a href="#events" className="secondary">More Events</a>
          </div>
        </div>
      </section>

      <section className="cards-section" id="resources">
        <div className="info-card">
          <h2>Statement</h2>
          <p>
            Gordon Memorial Baptist Association serves local churches by providing
            encouragement, resources, communication, and ministry support.
          </p>
        </div>

        <div className="info-card">
          <h2>Resources</h2>
          <p>
            Helpful tools, forms, documents, and ministry resources for pastors and churches.
          </p>
        </div>

        <div className="info-card">
          <h2>Encourage Pastors</h2>
          <p>
            We want pastors to feel supported, informed, and connected with other churches.
          </p>
        </div>
      </section>

      <section className="promo-section">
        <div>
          <h2>Splash Gordon Promo Video</h2>
          <p>
            Watch and share this promo video with pastors and churches.
          </p>
          <button>Watch Promo Video</button>
        </div>

        <div className="video-box">
          Promo Video Area
        </div>
      </section>

      <section className="events-section" id="events">
        <h2>Upcoming Events</h2>
        <p>Promote association events, church gatherings, meetings, and special services.</p>

        <div className="event-list">
          <div className="event-card">
            <h3>Association Event</h3>
            <p>Date, location, and event details go here.</p>
          </div>

          <div className="event-card">
            <h3>Church Event</h3>
            <p>Promote events from churches in the association.</p>
          </div>
        </div>
      </section>

      <section className="church-map-section">
        <div>
          <h2>Church List & Map</h2>
          <p>
            View churches in the Gordon Memorial Baptist Association on a map.
          </p>
          <p className="contact">
            Contact: Tony Chester — <a href="tel:2398269908">(239) 826-9908</a>
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
                  {church.pastor && <>Pastor: {church.pastor}<br /></>}
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
