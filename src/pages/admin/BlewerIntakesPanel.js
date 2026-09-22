import { useState, useEffect } from 'react';

const API = 'https://gordon-server.onrender.com';
const token = () => localStorage.getItem('adminToken');

const field = (label, value) => value ? (
  <div className="intake-view-field">
    <span className="intake-view-label">{label}</span>
    <span className="intake-view-value">{value}</span>
  </div>
) : null;

const BlewerIntakesPanel = () => {
  const [intakes, setIntakes] = useState([]);
  const [expanded, setExpanded] = useState(null);

  const load = async () => {
    const res = await fetch(`${API}/api/submissions/blewer-intakes`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    setIntakes(await res.json());
  };

  useEffect(() => { load(); }, []);

  const markRead = async (id) => {
    await fetch(`${API}/api/submissions/blewer-intakes/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this intake submission?')) return;
    await fetch(`${API}/api/submissions/blewer-intakes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token()}` },
    });
    load();
  };

  const toggle = (id) => {
    setExpanded(expanded === id ? null : id);
    const intake = intakes.find(i => i._id === id);
    if (intake && !intake.read) markRead(id);
  };

  const unread = intakes.filter(i => !i.read).length;

  return (
    <div className="admin-panel">
      <div className="submissions-header">
        <h2>Blewer Intake Submissions</h2>
        {unread > 0 && <span className="unread-badge">{unread} unread</span>}
      </div>

      {intakes.length === 0 && <p className="no-results">No intake submissions yet.</p>}

      <div className="submissions-list">
        {intakes.map(intake => (
          <div key={intake._id} className={`submission-card ${!intake.read ? 'unread' : ''}`}>
            <div className="submission-card-header" onClick={() => toggle(intake._id)}>
              <div className="submission-meta">
                {!intake.read && <span className="unread-dot" />}
                <strong>{intake.name}</strong>
                <span className="submission-email">{intake.phone}</span>
              </div>
              <div className="submission-right">
                <span className="submission-date">
                  {new Date(intake.submittedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="submission-chevron">{expanded === intake._id ? '▲' : '▼'}</span>
              </div>
            </div>

            {expanded === intake._id && (
              <div className="submission-body">
                <div className="intake-view-section">Primary Applicant</div>
                {field('Name', intake.name)}
                {field('Last 4 SS#', intake.ss4)}
                {field('Date of Birth', intake.dob)}
                {field('Date', intake.date)}

                {(intake.spouseName || intake.spouseDob) && <>
                  <div className="intake-view-section">Spouse</div>
                  {field('Name', intake.spouseName)}
                  {field('Last 4 SS#', intake.spouseSs4)}
                  {field('Date of Birth', intake.spouseDob)}
                  {field('Phone', intake.phone)}
                </>}

                <div className="intake-view-section">Address</div>
                {field('Address', `${intake.address}, ${intake.city}, ${intake.state} ${intake.zip}`)}

                {(intake.members || []).filter(m => m.name).length > 0 && <>
                  <div className="intake-view-section">Others in Household</div>
                  <table className="intake-view-table">
                    <thead>
                      <tr>
                        <th>Name</th><th>Last 4 SS#</th><th>DOB</th><th>Relationship</th>
                      </tr>
                    </thead>
                    <tbody>
                      {intake.members.filter(m => m.name).map((m, i) => (
                        <tr key={i}>
                          <td>{m.name}</td>
                          <td>{m.ss4 || '—'}</td>
                          <td>{m.dob || '—'}</td>
                          <td>{m.relationship || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>}

                <div className="intake-view-section">Income</div>
                {field('Source 1', intake.income1)}
                {field('Source 2', intake.income2)}
                {field('Source 3', intake.income3)}

                <div className="intake-view-section">Church & Visit</div>
                {field('Church Membership', intake.churchMembership)}
                {field('Wants church visit', intake.wantsVisit === 'yes' ? 'Yes' : intake.wantsVisit === 'no' ? 'No' : '—')}

                <div className="intake-view-section">Signature</div>
                {field('Signed by', intake.signature)}
                {field('Date', intake.signatureDate)}

                <div className="submission-actions">
                  <button onClick={() => handleDelete(intake._id)} className="btn-delete">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlewerIntakesPanel;
