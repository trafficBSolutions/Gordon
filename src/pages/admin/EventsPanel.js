import { useState, useEffect } from 'react';

const API = 'http://localhost:5000';
const token = () => localStorage.getItem('adminToken');

const EventsPanel = () => {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', location: '', description: '' });

  const load = async () => {
    const res = await fetch(`${API}/api/events`);
    setEvents(await res.json());
  };

  useEffect(() => { load(); }, []);

  const handleAdd = async e => {
    e.preventDefault();
    await fetch(`${API}/api/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify(form),
    });
    setForm({ title: '', date: '', location: '', description: '' });
    load();
  };

  const handleDelete = async id => {
    await fetch(`${API}/api/events/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  return (
    <div className="admin-panel">
      <h2>Manage Events</h2>
      <form onSubmit={handleAdd} className="admin-form">
        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Add Event</button>
      </form>
      <ul className="admin-list">
        {events.map(ev => (
          <li key={ev.id}>
            <div>
              <strong>{ev.title}</strong> — {ev.date} {ev.location && `@ ${ev.location}`}
              {ev.description && <p>{ev.description}</p>}
            </div>
            <button onClick={() => handleDelete(ev.id)} className="btn-delete">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsPanel;
