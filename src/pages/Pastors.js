import { useState, useEffect } from 'react';
import '../css/pastors.css';

const API = 'https://gordon-server.onrender.com';

const PastorResources = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/pastor-resources`).then(r => r.json()).then(setVideos).catch(() => {});
  }, []);

  return (
    <main className="pastors-page">
      <section className="pastors-hero">
        <h1>Pastor Resources</h1>
        <p>Videos, tools, and encouragement for pastors in our association.</p>
      </section>

      <section className="pastors-content">
        {videos.length > 0 ? (
          <div className="pastors-grid">
            {videos.map((v, i) => (
              <div key={i} className="pastor-card">
                <h3>{v.title}</h3>
                {v.description && <p className="pastor-resource-desc">{v.description}</p>}
                {v.url && (
                  <a href={v.url} target="_blank" rel="noreferrer" className="pastor-resource-btn">Visit Resource</a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="no-results">Check back soon for new resources from Tony.</p>
        )}
      </section>
    </main>
  );
};

export default PastorResources;
