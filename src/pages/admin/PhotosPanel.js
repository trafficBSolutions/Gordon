import { useState, useEffect } from 'react';

const API = 'http://localhost:5000';
const token = () => localStorage.getItem('adminToken');

const PhotosPanel = () => {
  const [photos, setPhotos] = useState([]);
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState('');

  const load = async () => {
    const res = await fetch(`${API}/api/photos`);
    setPhotos(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return;
    const fd = new FormData();
    fd.append('photo', file);
    fd.append('caption', caption);
    await fetch(`${API}/api/photos`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token()}` },
      body: fd,
    });
    setFile(null);
    setCaption('');
    load();
  };

  const handleDelete = async id => {
    await fetch(`${API}/api/photos/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  return (
    <div className="admin-panel">
      <h2>Manage Photos</h2>
      <form onSubmit={handleUpload} className="admin-form">
        <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} required />
        <input placeholder="Caption (optional)" value={caption} onChange={e => setCaption(e.target.value)} />
        <button type="submit">Upload</button>
      </form>
      <div className="admin-photos-grid">
        {photos.map(p => (
          <div key={p.id} className="admin-photo-card">
            <img src={`${API}${p.url}`} alt={p.caption} />
            {p.caption && <p>{p.caption}</p>}
            <button onClick={() => handleDelete(p.id)} className="btn-delete">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotosPanel;
