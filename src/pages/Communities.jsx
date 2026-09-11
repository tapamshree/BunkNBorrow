import { useState, useEffect, useMemo } from 'react';
import {
  Home as HomeIcon, Users, Calendar, Compass, Search,
  Heart, MessageCircle, MessageSquare, Share2, ExternalLink, Flag, Hash,
  Plus, MapPin, Clock, ArrowLeft, Send, Sparkles, Flame, Users2,
  PanelLeftClose, PanelLeftOpen, Bookmark,
} from 'lucide-react';
import { communities, communityPosts, communityEvents, users } from '../data/mockData';
import { useSession } from '../context/SessionContext';

const platformInfo = {
  whatsapp: { label: 'WhatsApp', color: '#25D366' },
  discord: { label: 'Discord', color: '#5865F2' },
  telegram: { label: 'Telegram', color: '#0088CC' },
};

export default function Communities({ onNavigate, initialCommunity, initialView }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarView, setSidebarView] = useState('home');
  const [selectedCommunity, setSelectedCommunity] = useState(initialCommunity || null);
  const [dashboardTab, setDashboardTab] = useState('feed');
  const [mainSection, setMainSection] = useState('feed'); // feed | explore

  useEffect(() => {
    if (initialCommunity) {
      setSelectedCommunity(initialCommunity);
      setSidebarView('home');
    } else if (initialView) {
      if (initialView === 'explore') setMainSection('explore');
      setSidebarView(initialView);
      setSelectedCommunity(null);
    }
  }, [initialCommunity, initialView]);

  const { joinedCommunities } = useSession();

  const handleOpenDashboard = (community) => {
    setSelectedCommunity(community);
    setDashboardTab('feed');
  };

  const handleBackFromDashboard = () => setSelectedCommunity(null);

  return (
    <div className="community-layout" style={{ position: 'relative' }}>
      {/* Decorative background */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 500px 400px at 5% 50%, rgba(124,58,237,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 600px 400px at 90% 30%, rgba(255,106,61,0.03) 0%, transparent 70%)
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
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800 }}>Communities</h2>
          <button onClick={() => setSidebarOpen(false)} title="Collapse sidebar" style={{
            width: '28px', height: '28px', borderRadius: '8px', display: 'flex',
            alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)',
            background: 'var(--bg-card)', cursor: 'pointer', border: 'none',
            transition: 'all var(--duration-fast)',
          }}>
            <PanelLeftClose size={15} />
          </button>
        </div>

        <div className="sidebar-section-label">Navigate</div>
        <SidebarItem icon={<HomeIcon size={18} />} label="Home Feed" active={sidebarView === 'home' && !selectedCommunity} onClick={() => { setSidebarView('home'); setSelectedCommunity(null); }} />
        <SidebarItem icon={<Users size={18} />} label="My Communities" active={sidebarView === 'my' && !selectedCommunity} onClick={() => { setSidebarView('my'); setSelectedCommunity(null); }} />
        <SidebarItem icon={<Calendar size={18} />} label="Events" active={sidebarView === 'events' && !selectedCommunity} onClick={() => { setSidebarView('events'); setSelectedCommunity(null); }} />
        <SidebarItem icon={<Compass size={18} />} label="Explore" active={sidebarView === 'explore' && !selectedCommunity} onClick={() => { setSidebarView('explore'); setSelectedCommunity(null); }} />

        {joinedCommunities.size > 0 && (
          <>
            <div className="sidebar-section-label">Joined</div>
            {communities.filter(c => joinedCommunities.has(c.id)).map(c => (
              <button key={c.id}
                className={`sidebar-item ${selectedCommunity?.id === c.id ? 'active' : ''}`}
                onClick={() => handleOpenDashboard(c)}
              >
                <div className="sidebar-community-avatar">{c.name.charAt(0)}</div>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.name}</span>
              </button>
            ))}
          </>
        )}
      </aside>

      {/* ── Main Content ── */}
      <div className="community-main" style={{
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        maxWidth: sidebarOpen ? '680px' : '780px',
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

        {selectedCommunity ? (
          <CommunityDashboard
            community={selectedCommunity}
            tab={dashboardTab}
            onTabChange={setDashboardTab}
            onBack={handleBackFromDashboard}
            onNavigate={onNavigate}
          />
        ) : (
          <div>
            {/* Mobile Community Quick Switcher */}
            {joinedCommunities.size > 0 && (
              <div className="mobile-only mobile-community-strip">
                <button
                  className={`mobile-community-pill ${sidebarView === 'home' && !selectedCommunity ? 'active' : ''}`}
                  onClick={() => { setSelectedCommunity(null); setSidebarView('home'); }}
                >
                  <Sparkles size={13} />
                  <span>All Feed</span>
                </button>
                {communities.filter(c => joinedCommunities.has(c.id)).map(c => (
                  <button
                    key={c.id}
                    className="mobile-community-pill"
                    onClick={() => handleOpenDashboard(c)}
                  >
                    <div className="sidebar-community-avatar" style={{ width: 22, height: 22, fontSize: '0.6rem' }}>{c.name.charAt(0)}</div>
                    <span>{c.name}</span>
                  </button>
                ))}
              </div>
            )}

            {sidebarView === 'home' ? (
              <div>
                {/* MAIN VIEW: Feed / Explore toggle */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div className="page-tabs">
                    <button className={`page-tab ${mainSection === 'feed' ? 'active' : ''}`} onClick={() => setMainSection('feed')}>
                      <Flame size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Feed
                    </button>
                    <button className={`page-tab ${mainSection === 'explore' ? 'active' : ''}`} onClick={() => setMainSection('explore')}>
                      <Compass size={14} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 4 }} /> Explore
                    </button>
                  </div>
                </div>
                {mainSection === 'feed' ? (
                  <HomeFeed onOpenDashboard={handleOpenDashboard} onNavigate={onNavigate} />
                ) : (
                  <ExploreCommunities onOpenDashboard={handleOpenDashboard} />
                )}
              </div>
            ) : sidebarView === 'my' ? (
              <MyCommunities onOpenDashboard={handleOpenDashboard} />
            ) : sidebarView === 'events' ? (
              <AllEvents />
            ) : sidebarView === 'explore' ? (
              <ExploreCommunities onOpenDashboard={handleOpenDashboard} />
            ) : null}
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


/* ═══ HOME FEED ═══ */
function HomeFeed({ onOpenDashboard, onNavigate }) {
  const { joinedCommunities, posts } = useSession();

  const feedPosts = useMemo(() => {
    const joined = posts.filter(p => joinedCommunities.has(p.communityId));
    const recommended = posts.filter(p => !joinedCommunities.has(p.communityId));
    return [...joined, ...recommended];
  }, [posts, joinedCommunities]);

  return (
    <div>
      <CreatePostTrigger onClick={() => onNavigate('createPost')} />

      {feedPosts.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><MessageSquare size={36} color="var(--text-muted)" style={{ margin: '0 auto' }} /></div>
          <h3>No posts yet</h3>
          <p>Join some communities to see posts in your feed.</p>
        </div>
      ) : (
        feedPosts.map(post => (
          <PostCard key={post.id} post={post} onOpenDashboard={onOpenDashboard} />
        ))
      )}
    </div>
  );
}


/* ═══ MY COMMUNITIES ═══ */
function MyCommunities({ onOpenDashboard }) {
  const { joinedCommunities } = useSession();
  const myCommunities = communities.filter(c => joinedCommunities.has(c.id));

  return (
    <div>
      <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800, marginBottom: '20px' }}>My Communities</h2>
      {myCommunities.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Users2 size={36} color="var(--text-muted)" style={{ margin: '0 auto' }} /></div>
          <h3>No communities joined</h3>
          <p>Explore and join communities to see them here.</p>
        </div>
      ) : (
        <div className="explore-grid">
          {myCommunities.map(c => (
            <CommunityCard key={c.id} community={c} onOpen={onOpenDashboard} />
          ))}
        </div>
      )}
    </div>
  );
}


/* ═══ ALL EVENTS ═══ */
function AllEvents() {
  const { joinedCommunities } = useSession();
  const events = communityEvents
    .filter(e => joinedCommunities.has(e.communityId))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div>
      <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 800, marginBottom: '20px' }}>Upcoming Events</h2>
      {events.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon"><Calendar size={36} color="var(--text-muted)" style={{ margin: '0 auto' }} /></div>
          <h3>No upcoming events</h3>
          <p>Events from your joined communities will appear here.</p>
        </div>
      ) : (
        events.map(event => <EventCard key={event.id} event={event} />)
      )}
    </div>
  );
}


/* ═══ EXPLORE COMMUNITIES ═══ */
function ExploreCommunities({ onOpenDashboard }) {
  const [search, setSearch] = useState('');

  const filtered = communities.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.category.toLowerCase().includes(search.toLowerCase()) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div className="search-bar" style={{ maxWidth: '100%' }}>
          <Search size={16} color="var(--text-muted)" />
          <input placeholder="Search clubs, interests, activities..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="explore-grid">
        {filtered.map(c => <CommunityCard key={c.id} community={c} onOpen={onOpenDashboard} />)}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon"><Search size={36} color="var(--text-muted)" style={{ margin: '0 auto' }} /></div>
          <h3>No communities found</h3>
          <p>Try a different search term.</p>
        </div>
      )}
    </div>
  );
}


/* ═══ COMMUNITY DASHBOARD ═══ */
function CommunityDashboard({ community, tab, onTabChange, onBack, onNavigate }) {
  const { joinedCommunities, toggleJoinCommunity, posts } = useSession();
  const isJoined = joinedCommunities.has(community.id);
  const [reportedLinks, setReportedLinks] = useState({});

  const communityPosts_ = posts.filter(p => p.communityId === community.id);
  const communityEvents_ = communityEvents.filter(e => e.communityId === community.id);

  return (
    <div>
      <button onClick={onBack} style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        color: 'var(--text-muted)', fontSize: 'var(--fs-small)', fontWeight: 600,
        marginBottom: '16px', padding: '4px 0', background: 'none', border: 'none', cursor: 'pointer',
      }}>
        <ArrowLeft size={16} /> Back
      </button>

      <div className="community-dashboard-header" style={{ background: 'var(--surface)', borderRadius: 'var(--r-card)', overflow: 'hidden' }}>
        <div style={{
          height: '140px',
          background: community.image ? `url(${community.image}) center/cover no-repeat` : 'var(--bg-card)',
        }}></div>
        <div style={{ padding: '0 24px 24px', position: 'relative', marginTop: '-32px' }}>
          <div className="community-dashboard-avatar" style={{ margin: '0 auto 12px', border: '4px solid var(--surface)', width: '64px', height: '64px', borderRadius: '16px', background: 'var(--secondary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 800 }}>{community.name.charAt(0)}</div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '6px' }}>{community.name}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', marginBottom: '14px', maxWidth: '480px', margin: '0 auto 14px', lineHeight: 1.6 }}>
          {community.bio}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '16px' }}>
          <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{community.members}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Members</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{communityPosts_.length}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Posts</div></div>
          <div style={{ textAlign: 'center' }}><div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{communityEvents_.length}</div><div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>Events</div></div>
        </div>

        {/* Social Links */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '16px' }}>
          {Object.entries(community.links).map(([platform, url]) => {
            const p = platformInfo[platform];
            return (
              <a key={platform} href={url} target="_blank" rel="noopener noreferrer"
                className="btn btn-sm" style={{
                  background: p.color + '15', color: p.color, border: `1.5px solid ${p.color}30`,
                  fontWeight: 600, fontSize: '0.7rem', transition: 'all var(--duration-fast)',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = p.color; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = p.color + '15'; e.currentTarget.style.color = p.color; }}
              >
                {p.label} <ExternalLink size={10} />
              </a>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className={`btn ${isJoined ? 'btn-outline' : 'btn-primary'}`} onClick={() => toggleJoinCommunity(community.id)} style={{ fontSize: 'var(--fs-small)' }}>
            {isJoined ? '✓ Joined' : 'Join Community'}
          </button>
          {isJoined && (
            <button className="btn btn-primary btn-sm" onClick={() => onNavigate({ type: 'createPost', communityId: community.id })}>
              <Plus size={14} /> Create Post
            </button>
          )}
        </div>

        {reportedLinks[community.id] ? (
          <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--success)', fontWeight: 600, marginTop: '12px' }}>✓ Report submitted — we'll fix the link soon</div>
        ) : (
          <button onClick={() => setReportedLinks(prev => ({ ...prev, [community.id]: true }))} style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginTop: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', cursor: 'pointer' }}>
            <Flag size={11} /> Report dead link
          </button>
        )}
        </div>
      </div>

      <div className="page-tabs" style={{ margin: '20px auto', justifyContent: 'center' }}>
        <button className={`page-tab ${tab === 'feed' ? 'active' : ''}`} onClick={() => onTabChange('feed')}>Feed</button>
        <button className={`page-tab ${tab === 'events' ? 'active' : ''}`} onClick={() => onTabChange('events')}>Events</button>
      </div>

      {tab === 'feed' && (
        <div>
          {isJoined && <CreatePostTrigger onClick={() => onNavigate({ type: 'createPost', communityId: community.id })} />}
          {communityPosts_.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">📝</div><h3>No posts yet</h3><p>Be the first to post!</p></div>
          ) : communityPosts_.map(post => <PostCard key={post.id} post={post} hideCommunityBadge />)}
        </div>
      )}

      {tab === 'events' && (
        <div>
          {isJoined && (
            <button className="btn btn-primary btn-sm" style={{ marginBottom: '16px' }} onClick={() => onNavigate({ type: 'createEvent', communityId: community.id })}>
              <Plus size={14} /> Create Event
            </button>
          )}
          {communityEvents_.length === 0 ? (
            <div className="empty-state"><div className="empty-state-icon">📅</div><h3>No upcoming events</h3><p>No events scheduled yet.</p></div>
          ) : communityEvents_.map(event => <EventCard key={event.id} event={event} />)}
        </div>
      )}
    </div>
  );
}


/* ═══ COMMUNITY CARD ═══ */
function CommunityCard({ community, onOpen }) {
  const { joinedCommunities, toggleJoinCommunity } = useSession();
  const isJoined = joinedCommunities.has(community.id);

  return (
    <div className="card" style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }} onClick={() => onOpen(community)}>
      <div style={{
        height: '120px',
        background: community.image ? `url(${community.image}) center/cover no-repeat` : 'var(--bg-card)',
        borderRadius: 'calc(var(--r-card) - 2px) calc(var(--r-card) - 2px) 0 0',
      }}></div>
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <span className="pill pill-secondary"><Hash size={12} /> {community.category}</span>
          <span className="pill pill-green" style={{ fontSize: '0.65rem' }}>{community.activity}</span>
        </div>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{community.name}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', lineHeight: 1.6, marginBottom: '14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
        {community.description}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
          <Users size={13} /> {community.members} students
        </div>
        <button className={isJoined ? 'post-join-btn joined' : 'post-join-btn'} onClick={(e) => { e.stopPropagation(); toggleJoinCommunity(community.id); }}>
          {isJoined ? '✓ Joined' : 'Join'}
        </button>
      </div>
      </div>
    </div>
  );
}


/* ═══ POST CARD ═══ */
function PostCard({ post, onOpenDashboard, hideCommunityBadge }) {
  const { joinedCommunities, toggleJoinCommunity, likedPosts, toggleLikePost, savedPosts, toggleSavePost, addComment } = useSession();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [shareConfirm, setShareConfirm] = useState(false);

  const author = users.find(u => u.id === post.authorId);
  const community = communities.find(c => c.id === post.communityId);
  const isLiked = likedPosts.has(post.id);
  const isJoined = joinedCommunities.has(post.communityId);
  const isSaved = savedPosts ? savedPosts.has(post.id) : false;

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = () => { setShareConfirm(true); setTimeout(() => setShareConfirm(false), 2000); };

  return (
    <div className="post-card">
      {!hideCommunityBadge && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
          <button className="post-community-badge" onClick={() => onOpenDashboard?.(community)}>
            <Hash size={11} /> {community?.name}
          </button>
          <button className={isJoined ? 'post-join-btn joined' : 'post-join-btn'} onClick={() => toggleJoinCommunity(post.communityId)}>
            {isJoined ? '✓ Joined' : 'Join'}
          </button>
        </div>
      )}

      <div className="post-header">
        <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>{author?.initials}</div>
        <div>
          <div style={{ fontSize: 'var(--fs-small)', fontWeight: 700 }}>{author?.name}</div>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{post.time}</div>
        </div>
      </div>

      <div className="post-body">{post.text}</div>

      <div className="post-actions">
        <button className={`post-action-btn ${isLiked ? 'liked' : ''}`} onClick={() => toggleLikePost(post.id)}>
          <Heart size={15} fill={isLiked ? '#ef4444' : 'none'} /> {post.likes}
        </button>
        <button className="post-action-btn" onClick={() => setShowComments(!showComments)}>
          <MessageCircle size={15} /> {post.commentCount}
        </button>
        <button className="post-action-btn" onClick={handleShare}>
          <Share2 size={15} /> {shareConfirm ? 'Copied!' : 'Share'}
        </button>
        <button className={`post-action-btn ${isSaved ? 'liked' : ''}`} onClick={() => toggleSavePost && toggleSavePost(post.id)} style={{ marginLeft: 'auto' }}>
          <Bookmark size={15} fill={isSaved ? 'var(--text-muted)' : 'none'} /> {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      {showComments && (
        <div className="comment-section">
          {post.comments.map(comment => {
            const commentAuthor = users.find(u => u.id === comment.authorId);
            return (
              <div key={comment.id}>
                <div className="comment-item">
                  <div className="avatar" style={{ width: 26, height: 26, fontSize: '0.6rem' }}>{commentAuthor?.initials}</div>
                  <div className="comment-body">
                    <span className="comment-author">{commentAuthor?.name}</span>
                    <div className="comment-text">{comment.text}</div>
                    <div className="comment-meta"><span>{comment.time}</span>{comment.likes > 0 && <span>♥ {comment.likes}</span>}</div>
                  </div>
                </div>
                {comment.replies?.map(reply => {
                  const replyAuthor = users.find(u => u.id === reply.authorId);
                  return (
                    <div key={reply.id} className="comment-reply">
                      <div className="comment-item">
                        <div className="avatar" style={{ width: 22, height: 22, fontSize: '0.55rem' }}>{replyAuthor?.initials}</div>
                        <div className="comment-body">
                          <span className="comment-author">{replyAuthor?.name}</span>
                          <div className="comment-text">{reply.text}</div>
                          <div className="comment-meta"><span>{reply.time}</span></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div className="comment-input-row">
            <input placeholder="Write a comment..." value={commentText} onChange={e => setCommentText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleComment()} />
            <button className="btn btn-primary btn-sm" onClick={handleComment}><Send size={12} /></button>
          </div>
        </div>
      )}
    </div>
  );
}


/* ═══ EVENT CARD ═══ */
function EventCard({ event }) {
  const { registeredEvents, registerEvent } = useSession();
  const isRegistered = registeredEvents.has(event.id);
  const community = communities.find(c => c.id === event.communityId);
  const organizer = users.find(u => u.id === event.organizer);

  const dateObj = new Date(event.date);
  const month = dateObj.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = dateObj.getDate();
  const capacityPct = Math.min((event.registrations / event.maxCapacity) * 100, 100);

  return (
    <div className="event-card">
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
        <div className="event-date-badge">
          <span className="month">{month}</span>
          <span className="day">{day}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '4px' }}>
            <span className="pill pill-secondary" style={{ fontSize: '0.6rem', padding: '3px 10px' }}>{community?.name}</span>
          </div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{event.title}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)', marginBottom: '10px', lineHeight: 1.6 }}>{event.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: 'var(--fs-xs)', color: 'var(--text-muted)', marginBottom: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {event.time}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin size={12} /> {event.location}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={12} /> {event.registrations}/{event.maxCapacity}</span>
          </div>
          <div className="event-capacity-bar"><div className="event-capacity-fill" style={{ width: `${capacityPct}%` }}></div></div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>by {organizer?.name}</div>
            <button className={`event-register-btn ${isRegistered ? 'registered' : ''}`} onClick={() => !isRegistered && registerEvent(event.id)} disabled={isRegistered}>
              {isRegistered ? '✓ Registered' : 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ═══ CREATE POST TRIGGER ═══ */
function CreatePostTrigger({ onClick }) {
  const { currentUser } = useSession();
  return (
    <div className="create-post-trigger" onClick={onClick}>
      <div className="avatar" style={{ width: 32, height: 32, fontSize: '0.7rem' }}>{currentUser.initials}</div>
      <input placeholder="Share something with the community..." readOnly />
    </div>
  );
}
