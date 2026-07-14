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
          <h1>Supporting Pastors. Strengthening Churches. Sharing Hope.</h1>
          <p>
            We exist to foster thriving pastors and churches who partner together to thrive hope in Christ in our region and beyond.
          </p>
        </div>
      </section>

      <section className="church-map-section">
        <div>
          <h2>Church List & Map</h2>
          <p>
            View churches in the Gordon Memorial Baptist Association on a map.
          </p>
          <p className="contact">
            Tony Chester | Office: <a href="tel:7065346986">(706) 534-6986</a> | <a href="mailto:AMS@hopegordon.com">AMS@hopegordon.com</a>
            Amy Rickett | <a href="mailto:arickett373@gmail.com">arickett373@gmail.com</a>
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
