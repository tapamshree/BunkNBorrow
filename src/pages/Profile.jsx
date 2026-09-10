import { useState } from 'react';
import { Edit3, MapPin, Star, Package, Users, MessageCircle, Settings, Mail } from 'lucide-react';
import { useSession } from '../context/SessionContext';
import { communities } from '../data/mockData';

export default function Profile({ onNavigate }) {
  const { currentUser, allListings, joinedCommunities, posts } = useSession();
  const [activeTab, setActiveTab] = useState('posts');
  const [isEditing, setIsEditing] = useState(false);

  const userListings = allListings.filter(l => l.ownerId === currentUser.id);
  const userPosts = posts.filter(p => p.authorId === currentUser.id);
  const userCommunities = communities.filter(c => joinedCommunities.has(c.id));

  return (
    <section style={{ position: 'relative' }}>
      {/* Decorative background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 600px 400px at 50% 0%, rgba(255,106,61,0.06) 0%, transparent 70%),
          radial-gradient(ellipse 400px 300px at 80% 50%, rgba(124,58,237,0.04) 0%, transparent 70%)
        `,
      }} />

      {/* Settings button — top right */}
      <button onClick={() => {}} style={{
        position: 'absolute', top: '16px', right: '24px',
        width: '40px', height: '40px', borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--surface)', boxShadow: 'var(--shadow-soft)',
        color: 'var(--text-muted)', cursor: 'pointer', border: 'none',
        transition: 'all var(--duration-fast)', zIndex: 5,
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.boxShadow = 'var(--shadow-soft)'; }}
      >
        <Settings size={18} />
      </button>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="avatar avatar-xl" style={{ margin: '0 auto 16px' }}>
          {currentUser.initials}
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '4px' }}>
          {currentUser.name}
        </h1>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center',
          color: 'var(--text-muted)', fontSize: 'var(--fs-small)', marginBottom: '6px',
        }}>
          <MapPin size={14} /> {currentUser.hostel} · {currentUser.college}
        </div>
        <p style={{
          color: 'var(--text-muted)', fontSize: 'var(--fs-small)',
          maxWidth: '400px', margin: '0 auto 16px', lineHeight: 1.5,
        }}>
          {currentUser.bio}
        </p>

        {/* Stats Row — no rating/reviews, those go under Rentals */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginBottom: '20px' }}>
          <div className="profile-stat">
            <div className="value">{userPosts.length}</div>
            <div className="label">Posts</div>
          </div>
          <div className="profile-stat">
            <div className="value">{userListings.length}</div>
            <div className="label">Listings</div>
          </div>
          <div className="profile-stat">
            <div className="value">{userCommunities.length}</div>
            <div className="label">Communities</div>
          </div>
        </div>

        {/* Edit Profile */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn btn-outline btn-sm" onClick={() => setIsEditing(!isEditing)}>
            <Edit3 size={13} /> {isEditing ? 'Done' : 'Edit Profile'}
          </button>
        </div>

        {isEditing && (
          <div style={{
            maxWidth: '400px', margin: '20px auto 0',
            background: 'var(--surface)', borderRadius: 'var(--r-nested)',
            padding: '20px', boxShadow: 'var(--shadow-soft)',
          }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Name</label>
              <input defaultValue={currentUser.name} style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--r-md)', border: '1.5px solid #e8e5df', fontSize: 'var(--fs-small)', outline: 'none' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>Bio</label>
              <textarea defaultValue={currentUser.bio} rows={2} style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--r-md)', border: '1.5px solid #e8e5df', fontSize: 'var(--fs-small)', outline: 'none', resize: 'vertical' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
              <Mail size={12} /> {currentUser.email}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ padding: '0 20px' }}>
        <div className="container">
          <div className="page-tabs" style={{ margin: '24px auto' }}>
            <button className={`page-tab ${activeTab === 'posts' ? 'active' : ''}`} onClick={() => setActiveTab('posts')}>
              Posts ({userPosts.length})
            </button>
            <button className={`page-tab ${activeTab === 'rentals' ? 'active' : ''}`} onClick={() => setActiveTab('rentals')}>
              Rentals ({userListings.length})
            </button>
            <button className={`page-tab ${activeTab === 'communities' ? 'active' : ''}`} onClick={() => setActiveTab('communities')}>
              Communities ({userCommunities.length})
            </button>
          </div>

          {/* Posts Tab */}
          {activeTab === 'posts' && (
            <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '60px' }}>
              {userPosts.length === 0 ? (
                <div className="empty-state"><div className="empty-state-icon">📝</div><h3>No posts yet</h3><p>Your community posts will show up here.</p></div>
              ) : (
                userPosts.map(post => {
                  const community = communities.find(c => c.id === post.communityId);
                  return (
                    <div key={post.id} style={{
                      background: 'var(--surface)', borderRadius: 'var(--r-card)',
                      boxShadow: 'var(--shadow-soft)', padding: '20px 24px', marginBottom: '12px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span className="pill pill-purple" style={{ fontSize: '0.6rem', padding: '3px 10px' }}>{community?.name}</span>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{post.time}</span>
                      </div>
                      <p style={{ fontSize: 'var(--fs-small)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{post.text}</p>
                      <div style={{ display: 'flex', gap: '16px', marginTop: '10px', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                        <span>♥ {post.likes}</span><span>💬 {post.commentCount}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* Rentals Tab — now includes rating/reviews */}
          {activeTab === 'rentals' && (
            <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '60px' }}>
              {/* Rating & Reviews summary at top */}
              <div style={{
                background: 'var(--surface)', borderRadius: 'var(--r-card)',
                boxShadow: 'var(--shadow-soft)', padding: '20px 24px', marginBottom: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
                    <Star size={20} color="var(--accent)" fill="var(--accent)" />
                    <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{currentUser.rating}</span>
                  </div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>Trust Score</div>
                </div>
                <div style={{ width: '1px', height: '36px', background: '#ece9e3' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{currentUser.reviews}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>Reviews</div>
                </div>
                <div style={{ width: '1px', height: '36px', background: '#ece9e3' }}></div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{userListings.filter(l => l.status === 'available').length}</div>
                  <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', fontWeight: 500 }}>Active</div>
                </div>
              </div>

              {userListings.length === 0 ? (
                <div className="empty-state"><div className="empty-state-icon">📦</div><h3>No listings yet</h3><p>Items you list will appear here.</p></div>
              ) : (
                userListings.map(item => (
                  <div key={item.id} style={{
                    background: 'var(--surface)', borderRadius: 'var(--r-card)',
                    boxShadow: 'var(--shadow-soft)', padding: '20px 24px',
                    marginBottom: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  }}>
                    <div>
                      <h3 style={{ fontSize: 'var(--fs-small)', fontWeight: 700, marginBottom: '4px' }}>{item.title}</h3>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span className="pill pill-orange" style={{ fontSize: '0.6rem', padding: '2px 10px' }}>{item.type}</span>
                        <span className={`pill ${item.status === 'available' ? 'pill-green' : 'pill-muted'}`} style={{ fontSize: '0.6rem', padding: '2px 10px' }}>
                          {item.status === 'available' ? 'Available' : 'Rented'}
                        </span>
                      </div>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--accent)', fontWeight: 600, marginTop: '6px' }}>
                        {item.terms.split('·')[0].trim()}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={13} color="var(--accent)" fill="var(--accent)" />
                      <span style={{ fontWeight: 700, fontSize: 'var(--fs-small)' }}>{item.rating}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Communities Tab */}
          {activeTab === 'communities' && (
            <div style={{ maxWidth: '600px', margin: '0 auto', paddingBottom: '60px' }}>
              {userCommunities.length === 0 ? (
                <div className="empty-state"><div className="empty-state-icon">🏠</div><h3>No communities joined</h3><p>Communities you join will appear here.</p></div>
              ) : (
                userCommunities.map(c => (
                  <div key={c.id} style={{
                    background: 'var(--surface)', borderRadius: 'var(--r-card)',
                    boxShadow: 'var(--shadow-soft)', padding: '20px 24px',
                    marginBottom: '12px', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '16px',
                  }} onClick={() => onNavigate('communities')}>
                    <div className="sidebar-community-avatar" style={{ width: '40px', height: '40px', borderRadius: '12px', fontSize: '0.9rem' }}>
                      {c.name.charAt(0)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: 'var(--fs-small)', fontWeight: 700, marginBottom: '2px' }}>{c.name}</h3>
                      <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                        <Users size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {c.members} members · {c.activity}
                      </div>
                    </div>
                    <span className="pill pill-green" style={{ fontSize: '0.6rem' }}>Joined</span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
