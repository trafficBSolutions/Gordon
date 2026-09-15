import { useState, useEffect } from 'react';

const API = 'https://gordon-server.onrender.com';
const token = () => localStorage.getItem('adminToken');

const PromoPanel = () => {
  const [promo, setPromo] = useState({ title: '', url: '', type: 'youtube' });
  const [mode, setMode] = useState('upload'); // 'upload' or 'youtube'
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch(`${API}/api/promo`).then(r => r.json()).then(data => {
      setPromo(data);
      setTitle(data.title || '');
      setMode(data.type === 'upload' ? 'upload' : 'youtube');
      if (data.type === 'youtube') setYoutubeUrl(data.url || '');
    }).catch(() => {});
  }, []);

  const handleFileUpload = async e => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setMsg('');

    const fd = new FormData();
    fd.append('video', file);
    fd.append('title', title);

    // Use XMLHttpRequest to track upload progress
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${API}/api/promo/upload`);
    xhr.setRequestHeader('Authorization', `Bearer ${token()}`);

    xhr.upload.onprogress = e => {
      if (e.lengthComputable) setProgress(Math.round((e.loaded / e.total) * 100));
    };

    xhr.onload = () => {
      setUploading(false);
      if (xhr.status === 200 || xhr.status === 201) {
        const data = JSON.parse(xhr.responseText);
        setPromo(data);
        setMsg('Video uploaded successfully!');
        setFile(null);
      } else if (xhr.status === 401) {
        localStorage.removeItem('adminToken');
        window.location.reload();
      } else {
        try {
          const data = JSON.parse(xhr.responseText);
          setMsg(`Upload failed: ${data.error || 'Unknown error'}`);
        } catch {
          setMsg('Upload failed. Please try again.');
        }
      }
    };

    xhr.onerror = () => {
      setUploading(false);
      setMsg('Upload failed. Please try again.');
    };

    xhr.send(fd);
  };

  const handleYoutubeSave = async e => {
    e.preventDefault();
    setMsg('');
    const res = await fetch(`${API}/api/promo`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ title, url: youtubeUrl }),
    });
    if (res.ok) {
      setPromo(await res.json());
      setMsg('Promo video updated!');
    } else {
      setMsg('Failed to save.');
    }
  };

  return (
    <div className="admin-panel">
      <h2>Promo Video</h2>

      <div className="promo-mode-toggle">
        <button className={mode === 'upload' ? 'active' : ''} onClick={() => setMode('upload')}>
          Upload from Computer
        </button>
        <button className={mode === 'youtube' ? 'active' : ''} onClick={() => setMode('youtube')}>
          Use YouTube URL
        </button>
      </div>

      <input
        placeholder="Video Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="promo-title-input"
      />

      {mode === 'upload' ? (
        <form onSubmit={handleFileUpload} className="admin-form promo-upload-form">
          <label className="file-label">
            {file ? file.name : 'Choose a video file (MP4, MOV, etc.)'}
            <input
              type="file"
              accept="video/*"
              onChange={e => setFile(e.target.files[0])}
              style={{ display: 'none' }}
            />
          </label>
          <button type="submit" disabled={uploading || !file}>
            {uploading ? `Uploading... ${progress}%` : 'Upload Video'}
          </button>
          {uploading && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          )}
        </form>
      ) : (
        <form onSubmit={handleYoutubeSave} className="admin-form">
          <input
            placeholder="YouTube URL (e.g. https://www.youtube.com/watch?v=...)"
            value={youtubeUrl}
            onChange={e => setYoutubeUrl(e.target.value)}
          />
          <button type="submit">Save</button>
        </form>
      )}

      {msg && <p className={msg.includes('success') || msg.includes('updated') ? 'form-msg success' : 'form-msg error'}>{msg}</p>}

      {promo.url && (
        <div className="admin-preview">
          <p>Current Video:</p>
          {promo.type === 'upload' ? (
            <video src={promo.url} controls width="100%" style={{ borderRadius: '8px' }} />
          ) : (
            <iframe src={promo.url.replace('watch?v=', 'embed/')} title="Promo" width="100%" height="300" frameBorder="0" allowFullScreen />
          )}
        </div>
      )}
    </div>
  );
};

export default PromoPanel;
