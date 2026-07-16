import { useState, useEffect } from 'react';

const API = 'https://gordon-server.onrender.com';
const token = () => localStorage.getItem('adminToken');

const PastorResourcesPanel = () => {
  const [resources, setResources] = useState([]);
  const [form, setForm] = useState({ title: '', url: '', description: '' });

  const load = async () => {
    const res = await fetch(`${API}/api/pastor-resources`);
    setResources(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    await fetch(`${API}/api/pastor-resources`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify(form),
    });
    setForm({ title: '', url: '', description: '' });
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
      <form onSubmit={handleAdd} className="admin-form">
        <input
          placeholder="Video Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          placeholder="YouTube or Vimeo URL"
          value={form.url}
          onChange={e => setForm({ ...form, url: e.target.value })}
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button type="submit">Add Resource</button>
      </form>

      <ul className="admin-list">
        {resources.map(r => (
          <li key={r._id}>
            <div>
              <strong>{r.title}</strong>
              {r.description && <p>{r.description}</p>}
              <a href={r.url} target="_blank" rel="noreferrer">{r.url}</a>
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
