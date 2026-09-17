import { useState, useEffect } from 'react';

const API = 'https://gordon-server.onrender.com';
const token = () => localStorage.getItem('adminToken');

const BlewerFormsPanel = () => {
  const [forms, setForms] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const load = async () => {
    const res = await fetch(`${API}/api/blewer-forms`);
    setForms(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleUpload = async e => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('form', file);
    fd.append('title', title || file.name);
    await fetch(`${API}/api/blewer-forms`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token()}` },
      body: fd,
    });
    setTitle('');
    setFile(null);
    setUploading(false);
    load();
  };

  const handleDelete = async id => {
    await fetch(`${API}/api/blewer-forms/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  return (
    <div className="admin-panel">
      <h2>Blewer Food Center Forms</h2>
      <form onSubmit={handleUpload} className="admin-form">
        <input
          placeholder="Form Title (e.g. Client Intake Form)"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={e => setFile(e.target.files[0])}
          required
        />
        <button type="submit" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Form'}</button>
      </form>

      <ul className="admin-list">
        {forms.map(f => (
          <li key={f._id}>
            <div>
              <strong>{f.title}</strong>
              <br />
              <a href={`${API}${f.url}`} target="_blank" rel="noreferrer">View / Download</a>
            </div>
            <button onClick={() => handleDelete(f._id)} className="btn-delete">Delete</button>
          </li>
        ))}
        {forms.length === 0 && <p>No forms uploaded yet.</p>}
      </ul>
    </div>
  );
};

export default BlewerFormsPanel;
