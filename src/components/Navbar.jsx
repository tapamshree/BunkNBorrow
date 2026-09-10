import { useState, useEffect, useRef } from 'react';
import { Bell, User, HelpCircle, ShoppingBag, Users2, Sparkles } from 'lucide-react';
import { useSession } from '../context/SessionContext';

export default function Navbar({ activePage, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const { notifs, markAllNotifsRead, currentUser } = useSession();
  const notifRef = useRef(null);

  const unreadCount = notifs.filter(n => !n.read).length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotifToggle = () => {
    setNotifOpen(!notifOpen);
    if (!notifOpen) markAllNotifsRead();
  };

  const notifIcons = { like: '❤️', comment: '💬', event: '📅', join: '👋', listing: '📦' };

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
        padding: '0 8px 0 12px',
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

        {/* ── Funky Nav Tabs ── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          background: 'var(--bg-card)', borderRadius: 'var(--r-pill)',
          padding: '4px', flexShrink: 0,
        }}>
          <button onClick={() => onNavigate('marketplace')} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', borderRadius: 'var(--r-pill)',
            fontSize: 'var(--fs-xs)', fontWeight: 700, letterSpacing: '0.01em',
            color: activePage === 'marketplace' ? '#fff' : 'var(--text-muted)',
            background: activePage === 'marketplace'
              ? 'linear-gradient(135deg, var(--accent), #E8572A)'
              : 'transparent',
            border: 'none', cursor: 'pointer',
            transition: 'all var(--duration-md) var(--ease-smooth)',
            boxShadow: activePage === 'marketplace' ? '0 2px 10px rgba(255,106,61,0.3)' : 'none',
            transform: activePage === 'marketplace' ? 'scale(1.02)' : 'scale(1)',
          }}>
            <ShoppingBag size={14} /> Marketplace
          </button>
          <button onClick={() => onNavigate('communities')} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 18px', borderRadius: 'var(--r-pill)',
            fontSize: 'var(--fs-xs)', fontWeight: 700, letterSpacing: '0.01em',
            color: activePage === 'communities' ? '#fff' : 'var(--text-muted)',
            background: activePage === 'communities'
              ? 'linear-gradient(135deg, var(--purple), #5B21B6)'
              : 'transparent',
            border: 'none', cursor: 'pointer',
            transition: 'all var(--duration-md) var(--ease-smooth)',
            boxShadow: activePage === 'communities' ? '0 2px 10px rgba(124,58,237,0.3)' : 'none',
            transform: activePage === 'communities' ? 'scale(1.02)' : 'scale(1)',
          }}>
            <Users2 size={14} /> Communities
          </button>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}>
          {/* Help */}
          <button
            onClick={() => onNavigate('help')}
            title="Help & FAQ"
            style={{
              width: '36px', height: '36px', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: activePage === 'help' ? 'var(--accent-light)' : 'transparent',
              color: activePage === 'help' ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'all var(--duration-fast)', cursor: 'pointer',
            }}
          >
            <HelpCircle size={17} />
          </button>

          {/* Notifications Bell */}
          <div ref={notifRef} style={{ position: 'relative' }}>
            <button
              onClick={handleNotifToggle}
              title="Notifications"
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: notifOpen ? 'var(--accent-light)' : 'transparent',
                color: notifOpen ? 'var(--accent)' : 'var(--text-muted)',
                transition: 'all var(--duration-fast)', cursor: 'pointer',
                position: 'relative',
              }}
            >
              <Bell size={17} />
              {unreadCount > 0 && (
                <span style={{
                  position: 'absolute', top: '3px', right: '3px',
                  width: '15px', height: '15px', borderRadius: '50%',
                  background: 'var(--accent)', color: '#fff',
                  fontSize: '0.55rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 1px 4px rgba(255,106,61,0.4)',
                  animation: 'pulse 2s infinite',
                }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {notifOpen && (
              <div className="notification-dropdown">
                <div style={{
                  padding: '14px 18px 10px',
                  fontSize: 'var(--fs-small)', fontWeight: 700,
                  borderBottom: '1px solid #ece9e3',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span>Notifications</span>
                  <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 500, color: 'var(--text-muted)' }}>
                    {unreadCount} new
                  </span>
                </div>
                {notifs.length === 0 ? (
                  <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 'var(--fs-small)' }}>
                    No notifications yet
                  </div>
                ) : (
                  notifs.map(n => (
                    <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                      {!n.read && <div className="notification-dot"></div>}
                      <span style={{ fontSize: '1rem' }}>{notifIcons[n.type] || '🔔'}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 500, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                          {n.text}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {n.time}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Avatar */}
          <button
            onClick={() => onNavigate('profile')}
            title="Profile"
            style={{
              cursor: 'pointer', background: 'none',
              border: activePage === 'profile' ? '2px solid var(--accent)' : '2px solid transparent',
              borderRadius: '50%', padding: '1px',
              transition: 'border-color var(--duration-fast)',
            }}
          >
            <div className="avatar" style={{ width: '32px', height: '32px', fontSize: '0.7rem' }}>
              {currentUser.initials}
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
