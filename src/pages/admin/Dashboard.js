import { useState, useEffect } from 'react';
import Login from './Login';
import EventsPanel from './EventsPanel';
import PhotosPanel from './PhotosPanel';
import PromoPanel from './PromoPanel';
import ChurchesPanel from './ChurchesPanel';
import PastorResourcesPanel from './PastorResourcesPanel';
import BlewerFormsPanel from './BlewerFormsPanel';
import '../../css/admin/admin.css';

const isTokenValid = () => {
  const token = localStorage.getItem('adminToken');
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

const Dashboard = () => {
  const [authed, setAuthed] = useState(isTokenValid);
  const [tab, setTab] = useState('events');

  useEffect(() => {
    if (!isTokenValid()) {
      localStorage.removeItem('adminToken');
      setAuthed(false);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAuthed(false);
  };

  if (!authed) return <Login onLogin={() => setAuthed(true)} />;

  return (
    <main className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button onClick={logout} className="admin-logout">Logout</button>
      </div>
      <nav className="admin-tabs">
        <button className={tab === 'events' ? 'active' : ''} onClick={() => setTab('events')}>Events</button>
        <button className={tab === 'photos' ? 'active' : ''} onClick={() => setTab('photos')}>Photos</button>
        <button className={tab === 'promo' ? 'active' : ''} onClick={() => setTab('promo')}>Promo Video</button>
        <button className={tab === 'churches' ? 'active' : ''} onClick={() => setTab('churches')}>Pastors/Churches</button>
        <button className={tab === 'pastor-resources' ? 'active' : ''} onClick={() => setTab('pastor-resources')}>Pastor Resources</button>
        <button className={tab === 'blewer-forms' ? 'active' : ''} onClick={() => setTab('blewer-forms')}>Blewer Forms</button>
      </nav>
      <div className="admin-content">
        {tab === 'events' && <EventsPanel />}
        {tab === 'photos' && <PhotosPanel />}
        {tab === 'promo' && <PromoPanel />}
        {tab === 'churches' && <ChurchesPanel />}
        {tab === 'pastor-resources' && <PastorResourcesPanel />}
        {tab === 'blewer-forms' && <BlewerFormsPanel />}
      </div>
    </main>
  );
};

export default Dashboard;
