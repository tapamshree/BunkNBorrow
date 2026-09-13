import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { heroChips, stats, marqueeFeatures } from '../data/mockData';

export default function Home({ onNavigate }) {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{
        position: 'fixed',
        top: -20, left: -20, right: -20, bottom: -20,
        backgroundImage: 'url(/medlar-b.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.25,
        filter: 'blur(4px)',
        zIndex: -1,
        pointerEvents: 'none'
      }} />
      <HeroSection onNavigate={onNavigate} />
      <SecondHeadline />
      <BentoGrid />
      <MarqueeStrip />
      <StatsCounter />
      <ContrastSection />
      <Footer />
    </div>
  );
}

/* ═══ HERO ═══ */
function HeroSection({ onNavigate }) {
  return (
    <section style={{ textAlign: 'center', padding: '100px 20px 40px', position: 'relative' }}>
      <div className="container">
        {/* Badge */}
        <div className="pill pill-white" style={{ marginBottom: '28px', fontSize: 'var(--fs-xs)', fontWeight: 600 }}>
          Backed by 40+ Student Clubs
        </div>

        <h1 style={{
          fontFamily: 'var(--font-logo)', color: '#334155',
          fontSize: 'var(--fs-hero)', fontWeight: 700, lineHeight: 'var(--lh-heading)',
          letterSpacing: '-0.02em', marginBottom: '16px', maxWidth: '1000px', margin: '0 auto 16px',
        }}>
          Borrow stuff from students & join student communities
        </h1>

        {/* Subheading */}
        <h2 style={{
          fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-primary)',
          marginBottom: '20px', letterSpacing: '-0.01em',
        }}>
          Borrow gear. Find your gang.
        </h2>

        {/* Subtext */}
        <p style={{
          color: 'var(--text-muted)', fontSize: '1.15rem', lineHeight: 1.6,
          maxWidth: '540px', margin: '0 auto 32px',
        }}>
          Rent cameras, tents, projectors & lab gear from students in your hostel,
          and join communities built around campus life. Zero platform cut.
        </p>

        {/* CTA */}
        <div className="hero-cta-group" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={() => onNavigate('communities')} style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
            Explore Communities <ArrowRight size={16} />
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('marketplace')}>
            Browse Gear
          </button>
        </div>
      </div>

      {/* Chip Cloud — static, no float animation */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px',
        maxWidth: '700px', margin: '36px auto 0', padding: '0 16px',
      }}>
        {heroChips.map((chip, i) => (
          <span key={i} className="pill" style={{
            background: chip.color, color: chip.textColor,
            transform: `rotate(${chip.rotate}deg)`,
            fontSize: 'var(--fs-xs)', fontWeight: 600,
          }}>
            {chip.label}
          </span>
        ))}
      </div>
    </section>
  );
}


/* ═══ SECOND HEADLINE (hand-drawn circle) ═══ */
function SecondHeadline() {
  return (
    <section className="section-pad" style={{ textAlign: 'center', padding: '48px 16px 36px' }}>
      <div className="container">
        <h2 className="section-headline" style={{ marginBottom: '16px' }}>
          Students sharing with students.{' '}
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <span style={{ position: 'relative', zIndex: 1 }}>Zero platform cut.</span>
            <svg viewBox="0 0 220 60" style={{
              position: 'absolute', top: '-12px', left: '-12px', width: 'calc(100% + 24px)', height: 'calc(100% + 24px)',
              zIndex: 0, overflow: 'visible', pointerEvents: 'none',
            }}>
              <ellipse cx="110" cy="30" rx="106" ry="26"
                fill="none" stroke="var(--accent)" strokeWidth="2.5"
                strokeDasharray="4 3" strokeLinecap="round"
                style={{ opacity: 0.7 }}
              />
            </svg>
          </span>
        </h2>
        <p className="section-subtext" style={{ margin: '0 auto 28px', textAlign: 'center' }}>
          All negotiation happens directly between students. We don't take a cut,
          hold deposits, or get in the way. Just discover, chat, and exchange.
        </p>
        <button className="btn btn-primary">
          Start Browsing <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}


/* ═══ BENTO GRID ═══ */
function BentoGrid() {
  const cards = [
    {
      title: 'Direct Chat Negotiation',
      sub: 'No awkward forms. Just message the owner.',
      mockup: (
        <div style={{ background: '#fff', borderRadius: 'var(--r-nested)', padding: '14px', boxShadow: 'var(--shadow-soft)' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
            <div className="avatar" style={{ width: 28, height: 28, fontSize: '0.7rem' }}>MS</div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600 }}>Maya Sen <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· 2:30 PM</span></div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hey! Is the Sony A6400 available this weekend?</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, textAlign: 'right' }}>Aarav P <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· 2:32 PM</span></div>
              <div style={{
                fontSize: '0.8rem', background: 'var(--accent)', color: '#fff',
                padding: '8px 12px', borderRadius: '14px 14px 4px 14px', display: 'inline-block',
              }}>Yes! ₹900 for the whole weekend</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Save vs Buying New',
      sub: 'Rent for a fraction of the purchase price',
      mockup: (
        <div style={{ background: '#fff', borderRadius: 'var(--r-nested)', padding: '14px', boxShadow: 'var(--shadow-soft)' }}>
          {[
            { item: 'Sony A6400', rent: '₹500/day', buy: '₹65,000', saved: '99%' },
            { item: 'Quechua Tent', rent: '₹300/night', buy: '₹4,500', saved: '93%' },
            { item: 'TI-84 Plus', rent: '₹50/day', buy: '₹12,000', saved: '99%' },
          ].map((r, i) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '8px 0', borderBottom: i < 2 ? '1px solid #f0ece6' : 'none',
              fontSize: '0.78rem',
            }}>
              <span style={{ fontWeight: 600 }}>{r.item}</span>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>{r.rent}</span>
              <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through', fontSize: '0.7rem' }}>{r.buy}</span>
              <span className="pill pill-green" style={{ padding: '2px 8px', fontSize: '0.65rem' }}>{r.saved} saved</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Verified Student Identity',
      sub: 'College email sign-in only — no strangers',
      mockup: (
        <div style={{
          background: 'var(--success-light)', borderRadius: 'var(--r-nested)',
          padding: '16px', display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%', background: 'var(--success)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Check size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#16a34a' }}>Identity Verified</div>
            <div style={{ fontSize: '0.75rem', color: '#4ade80' }}>aarav@iitb.ac.in, IIT Bombay, Hostel 12</div>
          </div>
        </div>
      ),
    },
    {
      title: '5-Minute Hostel Pickup',
      sub: 'No delivery needed. Grab it from next door.',
      mockup: (
        <div style={{ background: '#fff', borderRadius: 'var(--r-nested)', padding: '14px', boxShadow: 'var(--shadow-soft)' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Hostel 3', 'Hostel 5', 'Hostel 10', 'Hostel 12', 'Hostel 14'].map((h, i) => (
              <span key={i} className="pill pill-muted" style={{ fontSize: '0.7rem' }}>
                {h}
              </span>
            ))}
          </div>
          <div style={{
            marginTop: '10px', background: 'var(--accent-light)', borderRadius: 'var(--r-md)',
            padding: '10px 12px', fontSize: '0.78rem', fontWeight: 600, color: 'var(--accent)',
          }}>
            Avg. pickup distance: 3 min walk
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="section-pad" style={{ padding: '24px 20px 60px' }}>
      <div className="container">
        <h2 className="section-headline" style={{ textAlign: 'center', marginBottom: '12px' }}>
          See what students run on BunkNBorrow
        </h2>
        <p className="section-subtext" style={{ textAlign: 'center', margin: '0 auto 36px' }}>
          Real features, real interactions, built for campus life.
        </p>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
          gap: '16px',
        }}>
          {cards.map((card, i) => (
            <div key={i} className="card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>{card.title}</h3>
              <p style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)', marginBottom: '16px' }}>{card.sub}</p>
              {card.mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══ MARQUEE STRIP ═══ */
function MarqueeStrip() {
  const doubled = [...marqueeFeatures, ...marqueeFeatures];

  return (
    <section style={{ padding: '40px 0', overflow: 'hidden' }}>
      <h2 className="section-headline" style={{ textAlign: 'center', marginBottom: '28px', padding: '0 20px' }}>
        Oh yeah, and all this too
      </h2>
      <div style={{ overflow: 'hidden', position: 'relative' }}>
        <div style={{
          display: 'flex', gap: '16px', width: 'max-content',
          animation: 'marquee 40s linear infinite',
        }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {doubled.map((f, i) => (
            <div key={i} style={{
              background: 'var(--bg-card)', borderRadius: '20px', padding: '20px 24px',
              minWidth: '220px', flexShrink: 0,
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px',
              }}>
                <span className={`status-dot ${f.status === 'Live' ? 'green' : 'orange'}`}></span>
                <span style={{ fontSize: 'var(--fs-xs)', fontWeight: 600, color: f.status === 'Live' ? 'var(--success)' : 'var(--accent)' }}>
                  {f.status}
                </span>
              </div>
              <div style={{ fontWeight: 700, fontSize: 'var(--fs-small)', marginBottom: '4px' }}>{f.title}</div>
              <div style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ═══ STATS COUNTER ═══ */
function StatsCounter() {
  return (
    <section className="section-pad" style={{ padding: '48px 20px' }}>
      <div className="container" style={{
        display: 'flex', justifyContent: 'center', gap: '48px', flexWrap: 'wrap',
      }}>
        {stats.map((stat, i) => (
          <StaticStat key={i} stat={stat} />
        ))}
      </div>
    </section>
  );
}

function StaticStat({ stat }) {
  const display = stat.format === 'compact'
    ? `${stat.prefix || ''}${(stat.value / 100000).toFixed(1)}L${stat.suffix || ''}`
    : `${stat.prefix || ''}${stat.value.toLocaleString('en-IN')}${stat.suffix || ''}`;

  return (
    <div style={{ textAlign: 'center', minWidth: '120px' }}>
      <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
        {display}
      </div>
      <div style={{ fontSize: 'var(--fs-small)', color: 'var(--text-muted)', fontWeight: 500 }}>
        {stat.label}
      </div>
    </div>
  );
}



/* ═══ TWO-COLUMN CONTRAST ═══ */
function ContrastSection() {
  const tags = ['Storefront', 'Discovery', 'Ratings', 'Chat', 'Cross-Linking', 'Community Hub', 'Search', 'Filters'];
  return (
    <section className="section-pad" style={{ padding: '48px 20px' }}>
      <div className="container" style={{
        display: 'flex', gap: '48px', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center',
      }}>
        <div style={{ flex: '1 1 280px', maxWidth: '400px' }}>
          <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, lineHeight: 'var(--lh-heading)' }}>
            You study and create.
          </h2>
        </div>
        <div style={{ flex: '1 1 280px', maxWidth: '400px' }}>
          <h2 style={{ fontSize: 'var(--fs-h2)', fontWeight: 800, lineHeight: 'var(--lh-heading)', marginBottom: '16px' }}>
            We connect the gear.
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map((tag, i) => (
              <span key={i} className="pill pill-muted" style={{ fontWeight: 600 }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


/* ═══ FOOTER ═══ */
function Footer() {
  const cols = [
    { title: 'Product', links: ['Marketplace', 'Communities', 'How It Works', 'Pricing'] },
    { title: 'Community', links: ['Student Clubs', 'Campus Partners', 'Blog', 'Discord'] },
    { title: 'Social', links: ['Twitter / X', 'Instagram', 'LinkedIn', 'Telegram'] },
  ];

  return (
    <footer style={{
      background: 'var(--text-primary)', color: '#fff', padding: '60px 20px 32px',
      borderRadius: '32px 32px 0 0', marginTop: '20px',
    }}>
      <div className="container">
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '40px', marginBottom: '48px',
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-logo)', fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px',
            }}>
              Bunk<span style={{ color: 'var(--accent)' }}>N</span>Borrow
            </div>
            <p style={{ color: '#999', fontSize: 'var(--fs-small)', lineHeight: 1.6 }}>
              The campus gear sharing platform that connects students who have stuff
              with students who need stuff.
            </p>
          </div>
          {cols.map((col, i) => (
            <div key={i}>
              <div style={{ fontSize: 'var(--fs-xs)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#777', marginBottom: '14px' }}>
                {col.title}
              </div>
              {col.links.map((link, j) => (
                <div key={j} style={{
                  fontSize: 'var(--fs-small)', color: '#bbb', padding: '5px 0', cursor: 'pointer',
                  transition: 'color 150ms',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = '#bbb'}
                >
                  {link}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{
          borderTop: '1px solid #333', paddingTop: '20px',
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
          fontSize: 'var(--fs-xs)', color: '#666',
        }}>
          <span>© 2026 BunkNBorrow. All rights reserved.</span>
          <span>By students, for students, from students.</span>
        </div>
      </div>
    </footer>
  );
}
