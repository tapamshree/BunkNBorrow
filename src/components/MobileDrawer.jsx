import { 
  X, Home, Compass, ShoppingBag, Users2, Package, Clock, History, 
  HelpCircle, Settings, Star, ChevronRight, ShieldCheck, Flame, 
  ExternalLink, LogOut, Bookmark, User
} from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { communities } from '../data/mockData';

export default function MobileDrawer({ isOpen, onClose, onNavigate, activePage }) {
  const { currentUser, joinedCommunities } = useSession();

  const handleNav = (target, options = {}) => {
    onNavigate(target, options);
    onClose();
  };

  const myCommunitiesList = communities.filter(c => joinedCommunities.has(c.id));

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`reddit-drawer-backdrop ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <aside className={`reddit-drawer ${isOpen ? 'open' : ''}`} aria-label="Navigation Drawer">
        {/* Header / User snippet */}
        <div className="reddit-drawer-header">
          <div className="reddit-drawer-user" onClick={() => handleNav('profile')}>
            <div className="avatar" style={{ width: 42, height: 42, fontSize: '1rem' }}>
              {currentUser.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="reddit-drawer-username">{currentUser.name}</div>
              <div className="reddit-drawer-userhandle">
                <ShieldCheck size={12} color="var(--success)" style={{ display: 'inline', verticalAlign: '-1px' }} />
                <span> {currentUser.hostel} · {currentUser.college}</span>
              </div>
            </div>
            <div className="reddit-drawer-trust-pill">
              <Star size={11} color="var(--accent)" fill="var(--accent)" />
              <span>{currentUser.rating}</span>
            </div>
          </div>
          <button className="reddit-drawer-close" onClick={onClose} title="Close menu">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="reddit-drawer-scroll">
          {/* Section: Feeds */}
          <div className="reddit-drawer-section">
            <div className="reddit-drawer-section-title">Feeds</div>
            
            <button 
              className={`reddit-drawer-item ${activePage === 'home' ? 'active' : ''}`}
              onClick={() => handleNav('home')}
            >
              <span className="reddit-drawer-icon"><Home size={18} /></span>
              <span className="reddit-drawer-label">Home</span>
            </button>

            <button 
              className={`reddit-drawer-item ${activePage === 'communities' ? 'active' : ''}`}
              onClick={() => handleNav('communities')}
            >
              <span className="reddit-drawer-icon"><Users2 size={18} /></span>
              <span className="reddit-drawer-label">Communities Feed</span>
            </button>

            <button 
              className={`reddit-drawer-item ${activePage === 'marketplace' ? 'active' : ''}`}
              onClick={() => handleNav('marketplace')}
            >
              <span className="reddit-drawer-icon"><ShoppingBag size={18} /></span>
              <span className="reddit-drawer-label">Marketplace</span>
            </button>
          </div>

          {/* Section: Your Communities */}
          <div className="reddit-drawer-section">
            <div className="reddit-drawer-section-header">
              <span className="reddit-drawer-section-title">Your Communities</span>
              <span className="reddit-drawer-badge">{myCommunitiesList.length}</span>
            </div>

            {myCommunitiesList.length === 0 ? (
              <div className="reddit-drawer-empty-text">No communities joined yet</div>
            ) : (
              myCommunitiesList.map(c => (
                <button
                  key={c.id}
                  className="reddit-drawer-item"
                  onClick={() => handleNav('communities', { community: c })}
                >
                  <div className="sidebar-community-avatar" style={{ width: 22, height: 22, fontSize: '0.6rem' }}>
                    {c.name.charAt(0)}
                  </div>
                  <span className="reddit-drawer-label" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {c.name}
                  </span>
                  <span className="reddit-drawer-meta">{c.members}</span>
                </button>
              ))
            )}

            <button
              className="reddit-drawer-item reddit-drawer-subaction"
              onClick={() => handleNav('communities', { view: 'explore' })}
            >
              <span className="reddit-drawer-icon"><Compass size={16} /></span>
              <span className="reddit-drawer-label">Explore More Clubs</span>
            </button>
          </div>

          {/* Section: Gear & Borrowing */}
          <div className="reddit-drawer-section">
            <div className="reddit-drawer-section-title">My Gear</div>

            <button 
              className="reddit-drawer-item"
              onClick={() => handleNav('marketplace', { view: 'listings' })}
            >
              <span className="reddit-drawer-icon"><Package size={17} /></span>
              <span className="reddit-drawer-label">My Listings</span>
            </button>

            <button 
              className="reddit-drawer-item"
              onClick={() => handleNav('marketplace', { view: 'borrowed' })}
            >
              <span className="reddit-drawer-icon"><Clock size={17} /></span>
              <span className="reddit-drawer-label">Currently Borrowing</span>
            </button>

            <button 
              className="reddit-drawer-item"
              onClick={() => handleNav('marketplace', { view: 'history' })}
            >
              <span className="reddit-drawer-icon"><History size={17} /></span>
              <span className="reddit-drawer-label">Borrow History</span>
            </button>
          </div>

          {/* Section: Other / Support */}
          <div className="reddit-drawer-section">
            <div className="reddit-drawer-section-title">Support & Settings</div>

            <button 
              className={`reddit-drawer-item ${activePage === 'help' ? 'active' : ''}`}
              onClick={() => handleNav('help')}
            >
              <span className="reddit-drawer-icon"><HelpCircle size={17} /></span>
              <span className="reddit-drawer-label">Help & FAQ</span>
            </button>

            <button 
              className={`reddit-drawer-item ${activePage === 'profile' ? 'active' : ''}`}
              onClick={() => handleNav('profile')}
            >
              <span className="reddit-drawer-icon"><User size={17} /></span>
              <span className="reddit-drawer-label">My Profile & Trust</span>
            </button>
          </div>
        </div>

        {/* Drawer Footer */}
        <div className="reddit-drawer-footer">
          <div className="reddit-drawer-version">
            <span>BunkNBorrow v1.2</span>
            <span className="status-dot green" style={{ marginLeft: 6 }}></span>
            <span>IIT Campus Ring</span>
          </div>
        </div>
      </aside>
    </>
  );
}
