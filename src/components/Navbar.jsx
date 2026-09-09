import { useState, useEffect, useRef } from 'react';
import { Search, Plus, ChevronDown, X } from 'lucide-react';

const searchCategories = [
  { label: 'Photography', category: 'cameras' },
  { label: 'Trekking & Camping', category: 'camping' },
  { label: 'Electronics & Gadgets', category: 'electronics' },
  { label: 'Sports Equipment', category: 'sports' },
  { label: 'Books & Stationery', category: 'books' },
  { label: 'Audio & Music', category: 'audio' },
  { label: 'Lab Gear', category: 'lab' },
];

export default function Navbar({ activePage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCategories = searchCategories.filter(c =>
    c.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      padding: '12px 20px 0',
    }}>
      <div style={{
        maxWidth: 'var(--max-width)', margin: '0 auto',
        background: scrolled ? 'rgba(255,255,255,0.92)' : 'var(--surface)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderRadius: 'var(--r-pill)',
        boxShadow: scrolled ? 'var(--shadow-md)' : 'var(--shadow-soft)',
        padding: '0 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '60px',
        transition: 'all var(--duration-md) var(--ease-smooth)',
        gap: '8px',
      }}>

        {/* Logo */}
        <button onClick={() => onNavigate('home')} style={{
          fontFamily: 'var(--font-logo)', fontSize: '1.4rem', fontWeight: 700,
          color: 'var(--text-primary)', padding: '0 8px', background: 'none', border: 'none',
          letterSpacing: '-0.01em', cursor: 'pointer', flexShrink: 0,
        }}>
          Bunk<span style={{ color: 'var(--accent)' }}>N</span>Borrow
        </button>

        {/* Search Bar */}
        <div ref={searchRef} style={{ position: 'relative', flex: '1 1 320px', maxWidth: '400px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'var(--bg-card)', border: searchOpen ? '1.5px solid var(--accent)' : '1.5px solid transparent',
            borderRadius: 'var(--r-pill)', padding: '0 14px', height: '38px',
            transition: 'border-color var(--duration-fast)',
          }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              placeholder="Search gear, categories..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              style={{
                border: 'none', outline: 'none', background: 'none', flex: 1,
                fontSize: 'var(--fs-small)', color: 'var(--text-primary)',
              }}
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(''); }} style={{
                background: 'none', border: 'none', cursor: 'pointer', padding: '2px',
                display: 'flex', alignItems: 'center',
              }}>
                <X size={14} color="var(--text-muted)" />
              </button>
            )}
          </div>

          {/* Search Dropdown — shows on click/focus */}
          {searchOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
              background: 'var(--surface)', borderRadius: 'var(--r-nested)',
              boxShadow: 'var(--shadow-md)', padding: '8px',
              animation: 'slideDown var(--duration-fast) var(--ease-smooth)',
              zIndex: 10,
            }}>
              <div style={{
                fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-muted)',
                padding: '6px 10px 8px', textTransform: 'uppercase', letterSpacing: '0.05em',
              }}>
                Browse by category
              </div>
              {filteredCategories.map((cat, i) => (
                <button key={i} onClick={() => {
                  onNavigate('marketplace');
                  setSearchOpen(false);
                  setSearchQuery('');
                }} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 12px', borderRadius: 'var(--r-md)',
                  fontSize: 'var(--fs-small)', fontWeight: 500,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  transition: 'background var(--duration-fast)',
                  color: 'var(--text-primary)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--lavender)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {cat.label}
                </button>
              ))}
              {filteredCategories.length === 0 && (
                <div style={{
                  padding: '12px', fontSize: 'var(--fs-small)', color: 'var(--text-muted)', textAlign: 'center',
                }}>
                  No matching categories
                </div>
              )}
            </div>
          )}
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          <button onClick={() => onNavigate('marketplace')} style={{
            padding: '0.5rem 1rem', borderRadius: 'var(--r-pill)',
            fontSize: 'var(--fs-small)', fontWeight: 600,
            color: activePage === 'marketplace' ? 'var(--accent)' : 'var(--text-muted)',
            background: activePage === 'marketplace' ? 'var(--accent-light)' : 'transparent',
            border: 'none', cursor: 'pointer',
            transition: 'all var(--duration-fast)',
          }}>
            Marketplace
          </button>
          <button onClick={() => onNavigate('communities')} style={{
            padding: '0.5rem 1rem', borderRadius: 'var(--r-pill)',
            fontSize: 'var(--fs-small)', fontWeight: 600,
            color: activePage === 'communities' ? 'var(--accent)' : 'var(--text-muted)',
            background: activePage === 'communities' ? 'var(--accent-light)' : 'transparent',
            border: 'none', cursor: 'pointer',
            transition: 'all var(--duration-fast)',
          }}>
            Communities
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <button className="btn btn-primary btn-sm" onClick={() => onNavigate('create')}
            style={{ fontSize: 'var(--fs-xs)' }}>
            <Plus size={14} /> Post Item
          </button>
        </div>
      </div>
    </nav>
  );
}
