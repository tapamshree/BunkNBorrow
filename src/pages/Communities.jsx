import { useState } from 'react';
import { Search, ExternalLink, Users, Flag, Hash } from 'lucide-react';
import { communities } from '../data/mockData';

const platformInfo = {
  whatsapp: { label: 'WhatsApp', color: '#25D366' },
  discord: { label: 'Discord', color: '#5865F2' },
  telegram: { label: 'Telegram', color: '#0088CC' },
};

export default function Communities() {
  const [search, setSearch] = useState('');
  const [reportedLinks, setReportedLinks] = useState({});

  const filtered = communities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleReport = (communityId) => {
    setReportedLinks(prev => ({ ...prev, [communityId]: true }));
  };

  return (
    <section style={{ padding: '32px 20px 60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, marginBottom: '8px' }}>
            Community Directory
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)' }}>
            Discover {communities.length} student clubs and interest groups on campus.
            Click to join via WhatsApp, Discord, or Telegram.
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '28px' }}>
          <div className="search-bar">
            <Search size={16} color="var(--text-muted)" />
            <input placeholder="Search clubs, interests, activities..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map(community => (
            <div key={community.id} className="card" style={{ padding: '24px' }}>
              {/* Top Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span className="pill pill-purple">
                  <Hash size={12} /> {community.category}
                </span>
                <span className="pill pill-green" style={{ fontSize: '0.65rem' }}>
                  {community.activity}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
                {community.name}
              </h3>
              <p style={{
                color: 'var(--text-muted)', fontSize: 'var(--fs-small)', lineHeight: 1.6,
                marginBottom: '16px',
              }}>
                {community.description}
              </p>

              {/* Members */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: '16px',
              }}>
                <Users size={13} /> {community.members} students
              </div>

              {/* Platform Links */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                {Object.entries(community.links).map(([platform, url]) => {
                  const p = platformInfo[platform];
                  return (
                    <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                      className="btn btn-sm" style={{
                        background: p.color + '15', color: p.color, border: `1.5px solid ${p.color}30`,
                        fontWeight: 600, fontSize: '0.7rem',
                        transition: 'all var(--duration-fast)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = p.color;
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = p.color + '15';
                        e.currentTarget.style.color = p.color;
                      }}
                    >
                      Join {p.label} <ExternalLink size={10} />
                    </a>
                  );
                })}
              </div>

              {/* Report */}
              {reportedLinks[community.id] ? (
                <div style={{
                  fontSize: 'var(--fs-xs)', color: 'var(--success)', fontWeight: 600,
                }}>
                  Report submitted — we'll fix the link soon
                </div>
              ) : (
                <button onClick={() => handleReport(community.id)}
                  className="btn-ghost" style={{
                    fontSize: 'var(--fs-xs)', color: 'var(--text-muted)',
                    display: 'flex', alignItems: 'center', gap: '4px',
                    padding: '4px 0',
                  }}>
                  <Flag size={11} /> Report dead link
                </button>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)',
          }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>No communities found</p>
            <p style={{ fontSize: 'var(--fs-small)' }}>Try a different search term.</p>
          </div>
        )}
      </div>
    </section>
  );
}
