import { useState } from 'react';
import { Search, MapPin, Star, MessageCircle } from 'lucide-react';
import { categories, users } from '../data/mockData';
import { useSession } from '../context/SessionContext';

export default function Marketplace({ onItemClick, onChat }) {
  const { allListings } = useSession();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = allListings.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.terms.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section style={{ padding: '32px 20px 60px' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, marginBottom: '8px' }}>
            Campus Marketplace
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)' }}>
            {filtered.length} items available on campus right now
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '24px' }}>
          <div className="search-bar">
            <Search size={16} color="var(--text-muted)" />
            <input placeholder="Search cameras, tents, lab gear..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
          {categories.map(cat => (
            <button key={cat.id} className={`pill ${activeCategory === cat.id ? 'pill-orange' : 'pill-muted'}`}
              onClick={() => setActiveCategory(cat.id)}
              style={{ cursor: 'pointer', transition: 'all var(--duration-fast)', border: 'none' }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {filtered.map(item => {
            const owner = users.find(u => u.id === item.ownerId);
            return (
              <div key={item.id} className="card" style={{ cursor: 'pointer' }}
                onClick={() => onItemClick(item)}>
                {/* Image Area */}
                <div style={{
                  background: 'var(--bg-card)', padding: '32px', textAlign: 'center',
                  position: 'relative',
                }}>
                  <div style={{
                    fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>
                    {item.category}
                  </div>
                  {/* Status Badge */}
                  <span className={`pill ${item.status === 'available' ? 'pill-green' : 'pill-muted'}`}
                    style={{
                      position: 'absolute', top: '12px', right: '12px',
                      fontSize: '0.65rem',
                    }}>
                    <span className={`status-dot ${item.status === 'available' ? 'green' : 'gray'}`}></span>
                    {item.status === 'available' ? 'Available' : 'Rented'}
                  </span>
                  {/* Type Badge */}
                  <span className="pill pill-orange" style={{
                    position: 'absolute', top: '12px', left: '12px',
                    fontSize: '0.65rem',
                  }}>
                    {item.type}
                  </span>
                </div>

                {/* Details */}
                <div style={{ padding: '18px 20px 20px' }}>
                  <h3 style={{ fontSize: 'var(--fs-small)', fontWeight: 700, marginBottom: '8px', lineHeight: 1.3 }}>
                    {item.title}
                  </h3>
                  <div style={{
                    fontSize: 'var(--fs-xs)', color: 'var(--accent)', fontWeight: 600,
                    marginBottom: '12px', background: 'var(--accent-light)',
                    padding: '6px 10px', borderRadius: 'var(--r-sm)',
                  }}>
                    {item.terms.split('·')[0].trim()}
                  </div>

                  {/* Owner Row */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div className="avatar" style={{ width: 26, height: 26, fontSize: '0.65rem' }}>
                        {owner?.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>{owner?.name}</div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                          <MapPin size={10} style={{ display: 'inline', verticalAlign: '-1px' }} /> {owner?.hostel}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={12} color="var(--accent)" fill="var(--accent)" />
                      <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600 }}>{item.rating}</span>
                    </div>
                  </div>

                  {/* Chat Button */}
                  <button className="btn btn-outline btn-sm" onClick={(e) => {
                    e.stopPropagation();
                    onChat(item);
                  }}
                    style={{ width: '100%', marginTop: '14px', justifyContent: 'center', fontSize: 'var(--fs-xs)' }}>
                    <MessageCircle size={13} /> Chat with Owner
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)',
          }}>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>No items found</p>
            <p style={{ fontSize: 'var(--fs-small)' }}>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </section>
  );
}
