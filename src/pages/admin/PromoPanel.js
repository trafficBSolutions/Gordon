import { useState, useEffect } from 'react';

const API = 'http://localhost:5000';
const token = () => localStorage.getItem('adminToken');

const PromoPanel = () => {
  const [promo, setPromo] = useState({ title: '', url: '' });

  useEffect(() => {
    fetch(`${API}/api/promo`).then(r => r.json()).then(setPromo);
  }, []);

  const handleSave = async e => {
    e.preventDefault();
    const res = await fetch(`${API}/api/promo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify(promo),
    });
    setPromo(await res.json());
    alert('Promo video updated!');
  };

  return (
    <div className="admin-panel">
      <h2>Promo Video</h2>
      <form onSubmit={handleSave} className="admin-form">
        <input placeholder="Video Title" value={promo.title} onChange={e => setPromo({ ...promo, title: e.target.value })} />
        <input placeholder="YouTube/Vimeo URL" value={promo.url} onChange={e => setPromo({ ...promo, url: e.target.value })} />
        <button type="submit">Save</button>
      </form>
      {promo.url && (
        <div className="admin-preview">
          <p>Preview:</p>
          <iframe src={promo.url.replace('watch?v=', 'embed/')} title="Promo" width="100%" height="300" frameBorder="0" allowFullScreen />
        </div>
      )}
    </div>
  );
};

export default PromoPanel;
