import { Home, ShoppingBag, Users2, User } from 'lucide-react';

export default function BottomNav({ activePage, onNavigate }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'marketplace', label: 'Market', icon: ShoppingBag },
    { id: 'communities', label: 'Communities', icon: Users2 },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="mobile-bottom-nav-inner">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activePage === tab.id;
          return (
            <button
              key={tab.id}
              className={`mobile-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(tab.id)}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              </div>
              <span className="mobile-nav-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
