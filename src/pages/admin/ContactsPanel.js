import { useState, useEffect } from 'react';

const API = 'https://gordon-server.onrender.com';
const token = () => localStorage.getItem('adminToken');

const ContactsPanel = () => {
  const [contacts, setContacts] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    const res = await fetch(`${API}/api/submissions/contacts`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    setContacts(await res.json());
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await fetch(`${API}/api/submissions/contacts/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return;
    await fetch(`${API}/api/submissions/contacts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  const toggle = (id) => {
    setExpanded(expanded === id ? null : id);
    const contact = contacts.find(c => c._id === id);
    if (contact && !contact.read) markRead(id);
  };

  const unread = contacts.filter(c => !c.read).length;

  return (
    <div className="admin-panel">
      <div className="submissions-header">
        <h2>Contact Messages</h2>
        {unread > 0 && <span className="unread-badge">{unread} unread</span>}
      </div>

      {contacts.length === 0 && <p className="no-results">No contact messages yet.</p>}

      <div className="submissions-list">
        {contacts.map(c => (
          <div key={c._id} className={`submission-card ${!c.read ? 'unread' : ''}`}>
            <div className="submission-card-header" onClick={() => toggle(c._id)}>
              <div className="submission-meta">
                {!c.read && <span className="unread-dot" />}
                <strong>{c.name}</strong>
                <span className="submission-email">{c.email}</span>
              </div>
              <div className="submission-right">
                <span className="submission-date">
                  {new Date(c.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="submission-chevron">{expanded === c._id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expanded === c._id && (
              <div className="submission-body">
                <p className="submission-message">{c.message}</p>
                <div className="submission-actions">
                  <a href={`mailto:${c.email}`} className="btn-reply">Reply</a>
                  <button onClick={() => handleDelete(c._id)} className="btn-delete">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsPanel;
