import { useState, useEffect } from 'react';

const API = 'https://gordon-server.onrender.com';
const token = () => localStorage.getItem('adminToken');

const ChurchesPanel = () => {
  const [churches, setChurches] = useState([]);
  const [editing, setEditing] = useState(null);
  const [pastor, setPastor] = useState('');

  const load = async () => {
    const res = await fetch(`${API}/api/churches`);
    setChurches(await res.json());
  };

  useEffect(() => { load(); }, []);

  const startEdit = (church) => {
    setEditing(church.id);
    setPastor(church.pastor);
  };

  const handleSave = async (id) => {
    await fetch(`${API}/api/churches/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ pastor }),
    });
    setEditing(null);
    load();
  };

  return (
    <div className="admin-panel">
      <h2>Edit Pastors</h2>
      <table className="admin-table">
        <thead>
          <tr><th>Church</th><th>Pastor</th><th>Action</th></tr>
        </thead>
        <tbody>
          {churches.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>
                {editing === c.id
                  ? <input value={pastor} onChange={e => setPastor(e.target.value)} />
                  : (c.pastor || '—')}
              </td>
              <td>
                {editing === c.id
                  ? <>
                      <button onClick={() => handleSave(c.id)} className="btn-save">Save</button>
                      <button onClick={() => setEditing(null)} className="btn-cancel">Cancel</button>
                    </>
                  : <button onClick={() => startEdit(c)} className="btn-edit">Edit</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChurchesPanel;
