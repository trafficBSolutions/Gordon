import { useState, useEffect } from 'react';
import Login from './Login';
import EventsPanel from './EventsPanel';
import PhotosPanel from './PhotosPanel';
import PromoPanel from './PromoPanel';
import ChurchesPanel from './ChurchesPanel';
import PastorResourcesPanel from './PastorResourcesPanel';
import '../../css/admin/admin.css';

const Dashboard = () => {
  const [authed, setAuthed] = useState(!!localStorage.getItem('adminToken'));
  const [tab, setTab] = useState('events');

  useEffect(() => {
    setAuthed(!!localStorage.getItem('adminToken'));
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
      </nav>
      <div className="admin-content">
        {tab === 'events' && <EventsPanel />}
        {tab === 'photos' && <PhotosPanel />}
        {tab === 'promo' && <PromoPanel />}
        {tab === 'churches' && <ChurchesPanel />}
        {tab === 'pastor-resources' && <PastorResourcesPanel />}
      </div>
    </main>
  );
};

export default Dashboard;
