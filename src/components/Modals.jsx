import { useState } from 'react';
import { MessageCircle, MapPin, Star, Bookmark, X, Image, Calendar, Clock, Users } from 'lucide-react';
import { users, communities } from '../data/mockData';
import { useSession } from '../context/SessionContext';

/* ─── Item Detail Modal ─── */
export function ItemDetailModal({ item, onClose, onChat }) {
  const owner = users.find(u => u.id === item.ownerId);
  const related = communities.filter(c => c.relatedCategories.includes(item.category));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '560px' }}>
        {/* Header */}
        <div style={{
          background: 'var(--bg-card)', padding: '48px 32px 32px', textAlign: 'center',
          position: 'relative',
        }}>
          <button onClick={onClose} style={{
            position: 'absolute', top: '16px', right: '16px',
            background: 'var(--surface)', borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: 'var(--shadow-soft)',
          }}>
            <X size={16} />
          </button>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '16px' }}>{item.category}</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span className="pill pill-orange">{item.type}</span>
            <span className={`pill ${item.status === 'available' ? 'pill-green' : 'pill-muted'}`}>
              <span className={`status-dot ${item.status === 'available' ? 'green' : 'gray'}`}></span>
              {item.status === 'available' ? 'Available' : 'Rented Out'}
            </span>
          </div>
        </div>

        <div style={{ padding: '24px 32px 32px' }}>
          <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 700, marginBottom: '8px' }}>{item.title}</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', marginBottom: '20px', lineHeight: 1.6 }}>
            {item.description}
          </p>

          {/* Terms Card */}
          <div style={{
            background: 'var(--bg-card)', borderRadius: 'var(--r-nested)', padding: '16px',
            marginBottom: '20px', fontSize: 'var(--fs-small)', color: 'var(--text-primary)',
            lineHeight: 1.7, fontWeight: 500,
          }}>
            {item.terms}
          </div>

          {/* Owner Card */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px',
            padding: '14px 16px', borderRadius: 'var(--r-nested)', background: 'var(--bg-card)',
          }}>
            <div className="avatar">{owner?.initials}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 'var(--fs-small)' }}>{owner?.name}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-xs)' }}>
                <MapPin size={11} style={{ display: 'inline', verticalAlign: '-1px' }} /> {owner?.hostel} · {owner?.rating} ({owner?.reviews} reviews)
              </div>
            </div>
            <span className="pill pill-green" style={{ fontSize: '0.65rem' }}>Verified</span>
          </div>

          {/* Related Community */}
          {related.length > 0 && (
            <div style={{
              background: 'var(--purple-light)', borderRadius: 'var(--r-nested)', padding: '14px 16px',
              marginBottom: '24px',
            }}>
              <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: 'var(--purple)', marginBottom: '6px' }}>
                Related Community
              </div>
              <div style={{ fontSize: 'var(--fs-small)', fontWeight: 600 }}>
                {related[0].name}
              </div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
                {related[0].members} members · {related[0].activity}
              </div>
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => onChat(item)}>
              <MessageCircle size={16} /> Message Owner
            </button>
            <button className="btn btn-outline" style={{ padding: '0.65rem' }}>
              <Bookmark size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


/* ─── Listing Create Modal ─── */
export function ListingCreateModal({ onClose }) {
  const { addListing } = useSession();
  const [form, setForm] = useState({
    title: '', category: 'electronics', type: 'Rent', terms: '', description: '', image: '📦',
  });

  const emojiMap = { cameras: '📷', camping: '⛺', electronics: '🔌', sports: '🏸', books: '📚', audio: '🎧', lab: '🔬' };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.terms) return;
    addListing({ ...form, image: emojiMap[form.category] || '📦' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{ padding: '28px 32px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 700 }}>Post a New Item</h2>
          <button onClick={onClose} style={{
            background: 'var(--bg-card)', borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '16px 32px 32px' }}>
          {/* Title */}
          <label style={labelStyle}>Item Title</label>
          <input style={inputStyle} placeholder="e.g. Sony Alpha A6400 — Body + Kit Lens"
            value={form.title} onChange={e => setForm({...form, title: e.target.value})} />

          {/* Category + Type Row */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Category</label>
              <select style={inputStyle} value={form.category}
                onChange={e => setForm({...form, category: e.target.value})}>
                <option value="cameras">📷 Cameras</option>
                <option value="camping">⛺ Camping</option>
                <option value="electronics">🔌 Electronics</option>
                <option value="sports">🏸 Sports</option>
                <option value="books">📚 Books</option>
                <option value="audio">🎧 Audio</option>
                <option value="lab">🔬 Lab Gear</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Listing Type</label>
              <select style={inputStyle} value={form.type}
                onChange={e => setForm({...form, type: e.target.value})}>
                <option>Rent</option>
                <option>Sell</option>
                <option>Rent + Sell</option>
              </select>
            </div>
          </div>

          {/* Terms */}
          <label style={labelStyle}>Your Terms (price, deposit, pickup)</label>
          <textarea style={{...inputStyle, height: '80px', resize: 'vertical'}}
            placeholder="e.g. ₹500/day · ₹1,200 deposit · Aadhar ID needed · Hostel 12 lobby"
            value={form.terms} onChange={e => setForm({...form, terms: e.target.value})} />

          {/* Description */}
          <label style={labelStyle}>Description</label>
          <textarea style={{...inputStyle, height: '80px', resize: 'vertical'}}
            placeholder="Tell people about the item's condition, what's included, etc."
            value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

          <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '8px', justifyContent: 'center' }}>
            Publish Listing →
          </button>
        </form>
      </div>
    </div>
  );
}


/* ─── Chat Modal ─── */
export function ChatModal({ item, onClose }) {
  const owner = users.find(u => u.id === item.ownerId);
  const [messages, setMessages] = useState([
    { from: 'you', text: `Hi! Is the ${item.title} still available?`, time: 'Just now' },
  ]);
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { from: 'you', text: input, time: 'Just now' }]);
    setInput('');
    // Fake auto-reply
    setTimeout(() => {
      setMessages(prev => [...prev, {
        from: 'owner',
        text: `Yes it's available! ${item.terms.split('·')[0].trim()}. When do you need it?`,
        time: 'Just now',
      }]);
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{
        maxWidth: '480px', display: 'flex', flexDirection: 'column', height: '70vh',
      }}>
        {/* Chat Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #eee',
          display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div className="avatar">{owner?.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 'var(--fs-small)' }}>{owner?.name}</div>
            <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>
              {item.title}
            </div>
          </div>
          <button onClick={onClose} style={{
            background: 'var(--bg-card)', borderRadius: '50%', width: '28px', height: '28px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={14} /></button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px',
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.from === 'you' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
            }}>
              <div style={{
                background: msg.from === 'you' ? 'var(--accent)' : 'var(--bg-card)',
                color: msg.from === 'you' ? '#fff' : 'var(--text-primary)',
                padding: '10px 16px',
                borderRadius: '18px',
                borderBottomRightRadius: msg.from === 'you' ? '4px' : '18px',
                borderBottomLeftRadius: msg.from === 'you' ? '18px' : '4px',
                fontSize: 'var(--fs-small)', lineHeight: 1.5,
              }}>
                {msg.text}
              </div>
              <div style={{
                fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px',
                textAlign: msg.from === 'you' ? 'right' : 'left',
              }}>{msg.time}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 16px', borderTop: '1px solid #eee',
          display: 'flex', gap: '8px',
        }}>
          <input style={{
            flex: 1, border: '1.5px solid #e8e5df', borderRadius: 'var(--r-pill)',
            padding: '10px 16px', fontSize: 'var(--fs-small)', outline: 'none',
            background: 'var(--bg-card)',
          }}
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
          />
          <button className="btn btn-primary btn-sm" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
}


/* ─── Create Post Modal ─── */
export function CreatePostModal({ communityId, onClose }) {
  const { addPost, joinedCommunities } = useSession();
  const [text, setText] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState(communityId || '');

  const joinedList = communities.filter(c => joinedCommunities.has(c.id));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || !selectedCommunity) return;
    addPost(selectedCommunity, text);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{ padding: '28px 32px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 700 }}>Create Post</h2>
          <button onClick={onClose} style={{
            background: 'var(--bg-card)', borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={16} /></button>
        </div>
        <form onSubmit={handleSubmit} style={{ padding: '16px 32px 32px' }}>
          {/* Community Selector */}
          <label style={labelStyle}>Community</label>
          <select style={inputStyle} value={selectedCommunity} onChange={e => setSelectedCommunity(e.target.value)}>
            <option value="" disabled>Select a community</option>
            {joinedList.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          {/* Post Text */}
          <label style={labelStyle}>What's on your mind?</label>
          <textarea
            style={{ ...inputStyle, height: '140px', resize: 'vertical' }}
            placeholder="Share an update, ask a question, or start a discussion..."
            value={text}
            onChange={e => setText(e.target.value)}
          />

          {/* Image Placeholder */}
          <button type="button" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '10px 16px', borderRadius: 'var(--r-md)',
            border: '1.5px dashed #d4d0c8', color: 'var(--text-muted)',
            fontSize: 'var(--fs-xs)', fontWeight: 600, marginTop: '12px',
            background: 'var(--bg-card)', cursor: 'pointer', width: '100%',
          }}>
            <Image size={16} /> Add Image (optional)
          </button>

          <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>
            Publish Post
          </button>
        </form>
      </div>
    </div>
  );
}


/* ─── Create Event Modal ─── */
export function CreateEventModal({ communityId, onClose }) {
  const { showToast } = useSession();
  const [form, setForm] = useState({
    title: '', description: '', date: '', time: '', location: '', capacity: '',
  });

  const community = communities.find(c => c.id === communityId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.date || !form.time) return;
    showToast('Event created!', 'success');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '520px' }}>
        <div style={{ padding: '28px 32px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 'var(--fs-h3)', fontWeight: 700 }}>Create Event</h2>
          <button onClick={onClose} style={{
            background: 'var(--bg-card)', borderRadius: '50%', width: '32px', height: '32px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><X size={16} /></button>
        </div>
        {community && (
          <div style={{ padding: '0 32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pill pill-purple" style={{ fontSize: '0.65rem' }}>{community.name}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ padding: '16px 32px 32px' }}>
          <label style={labelStyle}>Event Title</label>
          <input style={inputStyle} placeholder="e.g. Golden Hour Photo Walk"
            value={form.title} onChange={e => setForm({...form, title: e.target.value})} />

          <label style={labelStyle}>Description</label>
          <textarea style={{ ...inputStyle, height: '80px', resize: 'vertical' }}
            placeholder="What's the event about? Include details like cost, what to bring, etc."
            value={form.description} onChange={e => setForm({...form, description: e.target.value})} />

          <div style={{ display: 'flex', gap: '12px' }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><Calendar size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> Date</label>
              <input type="date" style={inputStyle}
                value={form.date} onChange={e => setForm({...form, date: e.target.value})} />
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}><Clock size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> Time</label>
              <input type="time" style={inputStyle}
                value={form.time} onChange={e => setForm({...form, time: e.target.value})} />
            </div>
          </div>

          <label style={labelStyle}>Location</label>
          <input style={inputStyle} placeholder="e.g. Tinkering Lab, KReSIT"
            value={form.location} onChange={e => setForm({...form, location: e.target.value})} />

          <label style={labelStyle}><Users size={12} style={{ display: 'inline', verticalAlign: '-1px' }} /> Max Capacity</label>
          <input type="number" style={inputStyle} placeholder="e.g. 30"
            value={form.capacity} onChange={e => setForm({...form, capacity: e.target.value})} />

          <button className="btn btn-primary" type="submit" style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}>
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}


/* ─── Shared Input Styles ─── */
const labelStyle = {
  display: 'block', fontSize: 'var(--fs-xs)', fontWeight: 600,
  color: 'var(--text-muted)', marginBottom: '6px', marginTop: '14px',
};

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 'var(--r-md)',
  border: '1.5px solid #e8e5df', fontSize: 'var(--fs-small)',
  outline: 'none', background: 'var(--bg-card)',
  transition: 'border-color var(--duration-fast)',
};
