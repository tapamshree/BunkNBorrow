import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle, BookOpen } from 'lucide-react';
import { faqItems } from '../data/mockData';

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState('');

  const filteredFaq = faqItems.filter(item =>
    item.q.toLowerCase().includes(search.toLowerCase()) ||
    item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section style={{ padding: '48px 20px 80px' }}>
      <div className="container" style={{ maxWidth: '740px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '56px', height: '56px', borderRadius: '16px',
            background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <HelpCircle size={28} color="var(--accent)" />
          </div>
          <h1 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, marginBottom: '8px' }}>
            Help & FAQ
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Everything you need to know about BunkNBorrow. Can't find what you're looking for? Reach out to us.
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: '32px' }}>
          <div className="search-bar" style={{ maxWidth: '100%' }}>
            <Search size={16} color="var(--text-muted)" />
            <input placeholder="Search for a question..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Quick Links */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px', marginBottom: '36px',
        }}>
          <QuickLink icon={<BookOpen size={18} />} title="Getting Started" subtitle="Campus, profile, first steps" />
          <QuickLink icon={<MessageCircle size={18} />} title="Communities" subtitle="Join, post, events, social links" />
          <QuickLink icon={<HelpCircle size={18} />} title="Marketplace" subtitle="Listings, ratings, chat" />
        </div>

        {/* FAQ Accordion */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px' }}>
            Frequently Asked Questions
            <span style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 'var(--fs-small)', marginLeft: '8px' }}>
              ({filteredFaq.length})
            </span>
          </h2>

          {filteredFaq.map((item, i) => {
            const globalIndex = faqItems.indexOf(item);
            return (
              <div key={globalIndex} style={{ borderBottom: '1px solid #e8e5df' }}>
                <button onClick={() => setOpenIndex(openIndex === globalIndex ? null : globalIndex)} style={{
                  width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '18px 0', fontSize: '0.95rem', fontWeight: 600,
                  color: openIndex === globalIndex ? 'var(--accent)' : 'var(--text-primary)',
                  textAlign: 'left',
                  background: 'none', border: 'none', cursor: 'pointer',
                  transition: 'color var(--duration-fast)',
                }}>
                  {item.q}
                  {openIndex === globalIndex
                    ? <ChevronUp size={18} color="var(--accent)" />
                    : <ChevronDown size={18} color="var(--text-muted)" />
                  }
                </button>
                <div style={{
                  maxHeight: openIndex === globalIndex ? '300px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height var(--duration-slow) var(--ease-smooth)',
                }}>
                  <p style={{
                    color: 'var(--text-muted)', fontSize: 'var(--fs-small)', lineHeight: 1.7,
                    paddingBottom: '20px',
                  }}>
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}

          {filteredFaq.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🔍</div>
              <h3>No matching questions</h3>
              <p>Try a different search term or browse all questions.</p>
            </div>
          )}
        </div>

        {/* Contact */}
        <div style={{
          marginTop: '48px', textAlign: 'center', background: 'var(--surface)',
          borderRadius: 'var(--r-card)', padding: '32px', boxShadow: 'var(--shadow-soft)',
        }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
            Still have questions?
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 'var(--fs-small)', marginBottom: '16px' }}>
            We're here to help. Reach out to our support team.
          </p>
          <button className="btn btn-primary">
            <MessageCircle size={15} /> Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}


function QuickLink({ icon, title, subtitle }) {
  return (
    <div style={{
      background: 'var(--surface)', borderRadius: 'var(--r-nested)',
      padding: '18px', boxShadow: 'var(--shadow-soft)',
      display: 'flex', alignItems: 'center', gap: '14px',
      cursor: 'pointer', transition: 'box-shadow var(--duration-fast)',
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
    onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-soft)'}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: '12px',
        background: 'var(--accent-light)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--accent)', flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: 'var(--fs-small)' }}>{title}</div>
        <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{subtitle}</div>
      </div>
    </div>
  );
}
