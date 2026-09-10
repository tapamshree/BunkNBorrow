import { useState, useEffect } from 'react';
import { 
  Search, MapPin, Star, MessageCircle, Plus, Compass, Package, Clock, History, 
  PanelLeftClose, PanelLeftOpen, Camera, Tent, Cpu, Dumbbell, BookOpen, Headphones, 
  FlaskConical, Sparkles 
} from 'lucide-react';
import { categories, users } from '../data/mockData';
import { useSession } from '../context/SessionContext';

const categoryIcons = {
  all: Sparkles,
  cameras: Camera,
  camping: Tent,
  electronics: Cpu,
  sports: Dumbbell,
  books: BookOpen,
  audio: Headphones,
  lab: FlaskConical,
};

export default function Marketplace({ onItemClick, onChat, onNavigate, initialView }) {
  const { allListings, currentUser } = useSession();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState(initialView || 'explore'); // explore | listings | borrowed | history

  useEffect(() => {
    if (initialView) {
      setSidebarView(initialView);
    }
  }, [initialView]);

  // Filter listings based on sidebar view
  let viewListings = allListings;
  if (sidebarView === 'listings') {
    viewListings = allListings.filter(l => l.ownerId === currentUser.id);
  } else if (sidebarView === 'borrowed') {
    // Mock: just showing a couple of rented items not owned by user
    viewListings = allListings.filter(l => l.status === 'rented' && l.ownerId !== currentUser.id).slice(0, 2);
  } else if (sidebarView === 'history') {
    // Mock: past exchanges
    viewListings = allListings.filter(l => l.ownerId !== currentUser.id).slice(2, 4);
  }

  // Then apply search and category filters
  const filtered = viewListings.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                        item.terms.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const getPageTitle = () => {
    switch (sidebarView) {
      case 'listings': return 'My Active Listings';
      case 'borrowed': return 'Currently Borrowed';
      case 'history': return 'Rental History';
      default: return 'Campus Marketplace';
    }
  };

  const getPageSubtitle = () => {
    switch (sidebarView) {
      case 'listings': return `Manage the ${filtered.length} items you've listed.`;
      case 'borrowed': return 'Items you are currently using from others.';
      case 'history': return 'Your past gear exchanges.';
      default: return `${filtered.length} items available on campus right now.`;
    }
  };

  return (
    <div className="community-layout" style={{ position: 'relative' }}>
      {/* Decorative background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 600px 400px at 10% 20%, rgba(255,106,61,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 500px 500px at 90% 10%, rgba(255,106,61,0.04) 0%, transparent 70%)
        `,
      }} />

      {/* ── Sidebar ── */}
      <aside className="community-sidebar" style={{
        width: sidebarOpen ? '260px' : '0px',
        minWidth: sidebarOpen ? '260px' : '0px',
        padding: sidebarOpen ? '24px 0' : '0',
        opacity: sidebarOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: '0 24px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Marketplace</h2>
          <button onClick={() => setSidebarOpen(false)} title="Collapse sidebar" style={{
            width: '28px', height: '28px', borderRadius: '8px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)',
            background: 'var(--bg-card)', cursor: 'pointer', border: 'none',
            transition: 'all var(--duration-fast)',
          }}>
            <PanelLeftClose size={15} />
          </button>
        </div>

        <div className="sidebar-section-label">Browse</div>
        <SidebarItem icon={<Compass size={18} />} label="Explore All" active={sidebarView === 'explore'} onClick={() => setSidebarView('explore')} />
        
        <div className="sidebar-section-label">My Gear</div>
        <SidebarItem icon={<Package size={18} />} label="My Listings" active={sidebarView === 'listings'} onClick={() => setSidebarView('listings')} />
        <SidebarItem icon={<Clock size={18} />} label="Currently Borrowing" active={sidebarView === 'borrowed'} onClick={() => setSidebarView('borrowed')} />
        <SidebarItem icon={<History size={18} />} label="History" active={sidebarView === 'history'} onClick={() => setSidebarView('history')} />
      </aside>

      {/* ── Main Content ── */}
      <div className="community-main" style={{
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        maxWidth: sidebarOpen ? '900px' : '1000px',
      }}>
        {/* Sidebar toggle (when collapsed, desktop only) */}
        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} title="Open sidebar" className="desktop-only" style={{
            position: 'fixed', left: '12px', top: '50%', transform: 'translateY(-50%)',
            width: '32px', height: '64px', borderRadius: '0 12px 12px 0',
            background: 'var(--surface)', boxShadow: 'var(--shadow-md)',
            alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-muted)', cursor: 'pointer', border: 'none',
            zIndex: 50, transition: 'all var(--duration-fast)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent-light)'; e.currentTarget.style.color = 'var(--accent)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <PanelLeftOpen size={16} />
          </button>
        )}

        {/* Mobile View Selector Pills */}
        <div className="mobile-only mobile-scroll-x" style={{ marginBottom: '20px', gap: '8px' }}>
          <button
            className={`pill ${sidebarView === 'explore' ? 'pill-orange' : 'pill-muted'}`}
            onClick={() => setSidebarView('explore')}
            style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          >
            <Compass size={14} /> Explore All
          </button>
          <button
            className={`pill ${sidebarView === 'listings' ? 'pill-orange' : 'pill-muted'}`}
            onClick={() => setSidebarView('listings')}
            style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          >
            <Package size={14} /> My Listings
          </button>
          <button
            className={`pill ${sidebarView === 'borrowed' ? 'pill-orange' : 'pill-muted'}`}
            onClick={() => setSidebarView('borrowed')}
            style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          >
            <Clock size={14} /> Borrowed
          </button>
          <button
            className={`pill ${sidebarView === 'history' ? 'pill-orange' : 'pill-muted'}`}
            onClick={() => setSidebarView('history')}
            style={{ padding: '8px 16px', border: 'none', cursor: 'pointer', flexShrink: 0 }}
          >
            <History size={14} /> History
          </button>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, marginBottom: '6px' }}>
              {getPageTitle()}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)' }}>
              {getPageSubtitle()}
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => onNavigate('create')} style={{ flexShrink: 0 }}>
            <Plus size={16} /> Post Item
          </button>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '20px' }}>
          <div className="search-bar" style={{ maxWidth: '100%' }}>
            <Search size={16} color="var(--text-muted)" />
            <input placeholder="Search cameras, tents, lab gear..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Category Pills (only show in Explore view) */}
        {sidebarView === 'explore' && (
          <div className="mobile-scroll-x" style={{ gap: '8px', marginBottom: '24px', flexWrap: 'nowrap' }}>
            {categories.map(cat => {
              const Icon = categoryIcons[cat.id] || Sparkles;
              return (
                <button key={cat.id} className={`pill ${activeCategory === cat.id ? 'pill-orange' : 'pill-muted'}`}
                  onClick={() => setActiveCategory(cat.id)}
                  style={{ 
                    cursor: 'pointer', transition: 'all var(--duration-fast)', border: 'none', 
                    flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px',
                    padding: '8px 14px',
                  }}
                >
                  <Icon size={14} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))',
          gap: '16px',
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

                  {/* Action Button */}
                  {sidebarView === 'listings' ? (
                     <button className="btn btn-outline btn-sm" onClick={(e) => {
                      e.stopPropagation();
                      // Edit logic could go here
                    }}
                      style={{ width: '100%', marginTop: '14px', justifyContent: 'center', fontSize: 'var(--fs-xs)' }}>
                      Edit Listing
                    </button>
                  ) : (
                    <button className="btn btn-outline btn-sm" onClick={(e) => {
                      e.stopPropagation();
                      onChat(item);
                    }}
                      style={{ width: '100%', marginTop: '14px', justifyContent: 'center', fontSize: 'var(--fs-xs)' }}>
                      <MessageCircle size={13} /> Chat with Owner
                    </button>
                  )}
                  
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state" style={{ marginTop: '40px' }}>
            <div className="empty-state-icon">📦</div>
            <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px', color: 'var(--text-primary)' }}>No items found</p>
            <p style={{ fontSize: 'var(--fs-small)' }}>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button className={`sidebar-item ${active ? 'active' : ''}`} onClick={onClick}>
      <span className="sidebar-icon">{icon}</span>
      {label}
    </button>
  );
}
