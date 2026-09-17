import { useState, useEffect } from 'react';

const API = 'https://gordon-server.onrender.com';
const token = () => localStorage.getItem('adminToken');

const PastorResourcesPanel = () => {
  const [resources, setResources] = useState([]);
  const [tab, setTab] = useState('url');
  const [urlForm, setUrlForm] = useState({ title: '', url: '', description: '' });
  const [fileForm, setFileForm] = useState({ title: '', description: '', file: null });
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const res = await fetch(`${API}/api/pastor-resources`);
    setResources(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleAddUrl = async e => {
    e.preventDefault();
    await fetch(`${API}/api/pastor-resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify(urlForm),
    });
    setUrlForm({ title: '', url: '', description: '' });
    load();
  };

  const handleUpload = async e => {
    e.preventDefault();
    if (!fileForm.file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('video', fileForm.file);
    fd.append('title', fileForm.title);
    fd.append('description', fileForm.description);
    await fetch(`${API}/api/pastor-resources/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token()}` },
      body: fd,
    });
    setFileForm({ title: '', description: '', file: null });
    setUploading(false);
    load();
  };

  const handleDelete = async id => {
    await fetch(`${API}/api/pastor-resources/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  return (
    <div className="admin-panel">
      <h2>Pastor Resources</h2>

      <div className="resource-tabs">
        <button className={tab === 'url' ? 'active' : ''} onClick={() => setTab('url')}>Add by URL</button>
        <button className={tab === 'file' ? 'active' : ''} onClick={() => setTab('file')}>Upload from Computer</button>
      </div>

      {tab === 'url' && (
        <form onSubmit={handleAddUrl} className="admin-form">
          <input placeholder="Video Title" value={urlForm.title} onChange={e => setUrlForm({ ...urlForm, title: e.target.value })} required />
          <input placeholder="YouTube or Vimeo URL" value={urlForm.url} onChange={e => setUrlForm({ ...urlForm, url: e.target.value })} required />
          <textarea placeholder="Description (optional)" value={urlForm.description} onChange={e => setUrlForm({ ...urlForm, description: e.target.value })} />
          <button type="submit">Add Resource</button>
        </form>
      )}

      {tab === 'file' && (
        <form onSubmit={handleUpload} className="admin-form">
          <input placeholder="Video Title" value={fileForm.title} onChange={e => setFileForm({ ...fileForm, title: e.target.value })} required />
          <input type="file" accept="video/*" onChange={e => setFileForm({ ...fileForm, file: e.target.files[0] })} required />
          <textarea placeholder="Description (optional)" value={fileForm.description} onChange={e => setFileForm({ ...fileForm, description: e.target.value })} />
          <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Video'}</button>
        </form>
      )}

      <ul className="admin-list">
        {resources.map(r => (
          <li key={r._id}>
            <div>
              <strong>{r.title}</strong>
              <span style={{ marginLeft: '8px', fontSize: '0.8rem', color: '#6b7280' }}>{r.type === 'file' ? '📁 Uploaded' : '🔗 URL'}</span>
              {r.description && <p>{r.description}</p>}
              <a href={r.type === 'file' ? `${API}${r.url}` : r.url} target="_blank" rel="noreferrer">{r.url}</a>
            </div>
            <button onClick={() => handleDelete(r._id)} className="btn-delete">Delete</button>
          </li>
        ))}
        {resources.length === 0 && <p>No resources added yet.</p>}
      </ul>
    </div>
  );
};

export default PastorResourcesPanel;
