import { Link } from 'react-router-dom';


function ArrowRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-link {
          font-size: 14px;
          color: #6B6560;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 999px;
          transition: background 0.15s, color 0.15s;
        }
        .nav-link:hover {
          background: rgba(26,23,20,0.06);
          color: #1A1714;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: #1A1714;
          color: #F7F4EF;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-primary:hover { background: #2E2A26; }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: #fff;
          color: #1A1714;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid #E2DDD8;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-secondary:hover { border-color: #C5BEB8; background: #FDFCFB; }

        .btn-amber {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 28px;
          background: #E8B86D;
          color: #1A1714;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.15s;
          font-family: 'DM Sans', sans-serif;
        }
        .btn-amber:hover { background: #DDA85A; }

        .stat-card {
          background: #fff;
          border: 1px solid #E2DDD8;
          border-radius: 16px;
          padding: 24px;
          transition: border-color 0.15s;
        }
        .stat-card:hover { border-color: #C5BEB8; }

        .feature-card {
          background: #fff;
          border: 1px solid #E2DDD8;
          border-radius: 20px;
          padding: 28px;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .feature-card:hover {
          border-color: #C5BEB8;
          box-shadow: 0 4px 24px rgba(26,23,20,0.06);
        }

        .preview-panel {
          background: #1A1714;
          border-radius: 28px;
          padding: 36px;
          position: relative;
          overflow: hidden;
        }
        .preview-panel::before {
          content: '';
          position: absolute;
          top: -80px; right: -80px;
          width: 260px; height: 260px;
          border-radius: 50%;
          border: 1px solid rgba(247,244,239,0.07);
          pointer-events: none;
        }
        .preview-panel::after {
          content: '';
          position: absolute;
          bottom: -60px; left: -60px;
          width: 200px; height: 200px;
          border-radius: 50%;
          border: 1px solid rgba(247,244,239,0.05);
          pointer-events: none;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#F7F4EF', fontFamily: "'DM Sans', sans-serif", color: '#1A1714' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>

          {/* ── Header ─────────────────────────────────────── */}
          <header
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 16,
              padding: '20px 0',
              borderBottom: '1px solid #E2DDD8',
            }}
          >
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div>
                <p style={{ fontSize: 11, color: '#9C948C', letterSpacing: '0.04em' }}>Mentorship platform</p>
              </div>
            </div>

            {/* Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
              {['Home', 'Services', 'Sessions', 'Contact'].map((item) => (
                <Link key={item} to={`#${item.toLowerCase()}`} className="nav-link">
                  {item}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/login" className="btn-secondary">Sign in</Link>
              <Link to="/signup" className="btn-primary">Get Started <ArrowRight /></Link>
            </div>
          </header>

          {/* ── Hero ───────────────────────────────────────── */}
          <main style={{ padding: '72px 0 80px', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 64, alignItems: 'center' }}>

            {/* Left copy */}
            <section>
              <p
                style={{
                  fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
                  color: '#B09070', textTransform: 'uppercase', marginBottom: 20,
                }}
              >
                Empower your mentorship journey
              </p>

              <h1
                style={{
                  fontFamily: "'Fraunces', serif", fontWeight: 300,
                  fontSize: 54, lineHeight: 1.08, color: '#1A1714',
                  marginBottom: 24, maxWidth: 520,
                }}
              >
                Your path for excellence starts{' '}
                <em style={{ fontStyle: 'italic', color: '#E8B86D' }}>here.</em>
              </h1>

              <p style={{ fontSize: 16, lineHeight: 1.75, color: '#6B6560', maxWidth: 480, marginBottom: 36 }}>
                Build trust, guide talent, and grow your mentor network with a modern dashboard designed for mentors and mentees.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 56 }}>
                <Link to="/login" className="btn-amber">Sign in</Link>
                <Link to="/signup" className="btn-secondary">Create account <ArrowRight /></Link>
              </div>

              {/* Stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div className="stat-card">
                  <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', color: '#B09070', textTransform: 'uppercase', marginBottom: 14 }}>
                    Active mentors
                  </p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 300, color: '#1A1714', lineHeight: 1 }}>
                    124
                  </p>
                </div>
                <div className="stat-card">
                  <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', color: '#B09070', textTransform: 'uppercase', marginBottom: 14 }}>
                    Projects launched
                  </p>
                  <p style={{ fontFamily: "'Fraunces', serif", fontSize: 36, fontWeight: 300, color: '#1A1714', lineHeight: 1 }}>
                    84
                  </p>
                </div>
              </div>
            </section>

            {/* Right — Dashboard preview */}
            <section className="preview-panel">
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Panel header */}
                <div
                  style={{
                    background: 'rgba(247,244,239,0.06)', border: '1px solid rgba(247,244,239,0.1)',
                    borderRadius: 16, padding: '20px 24px', marginBottom: 20,
                  }}
                >
                  <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.14em', color: '#E8B86D', textTransform: 'uppercase', marginBottom: 8 }}>
                    Dashboard preview
                  </p>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 22, color: '#F7F4EF', lineHeight: 1.3 }}>
                    At-risk student spotlight
                  </h2>
                </div>

                {/* Metric rows */}
                {[
                  { label: 'Average attendance', value: '88%', sub: '+2.4% this week' },
                  { label: 'Interventions logged', value: '156', sub: '12 pending review' },
                  { label: 'Satisfaction score', value: '94%', sub: 'Based on 340 responses' },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      background: 'rgba(247,244,239,0.04)',
                      border: '1px solid rgba(247,244,239,0.08)',
                      borderRadius: 14, padding: '16px 20px',
                      marginBottom: 10,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <p style={{ fontSize: 12, color: 'rgba(247,244,239,0.45)', marginBottom: 4 }}>{m.label}</p>
                      <p style={{ fontSize: 11, color: 'rgba(232,184,109,0.7)' }}>{m.sub}</p>
                    </div>
                    <p style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 300, color: '#F7F4EF' }}>
                      {m.value}
                    </p>
                  </div>
                ))}

                {/* CTA inside panel */}
                <Link
                  to="/login"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    marginTop: 20, padding: '12px 20px',
                    background: '#E8B86D', borderRadius: 12,
                    fontSize: 13, fontWeight: 500, color: '#1A1714',
                    textDecoration: 'none', transition: 'background 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#DDA85A')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#E8B86D')}
                >
                  View full dashboard <ArrowRight />
                </Link>
              </div>
            </section>
          </main>

          {/* ── Feature strip ──────────────────────────────── */}
          <section style={{ borderTop: '1px solid #E2DDD8', paddingTop: 64, paddingBottom: 80 }}>
            <p
              style={{
                fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
                color: '#B09070', textTransform: 'uppercase', marginBottom: 16, textAlign: 'center',
              }}
            >
              Why us??
            </p>
            <h2
              style={{
                fontFamily: "'Fraunces', serif", fontWeight: 300,
                fontSize: 36, color: '#1A1714', textAlign: 'center',
                marginBottom: 48, lineHeight: 1.2,
              }}
            >
              Everything you need to <em style={{ fontStyle: 'italic', color: '#E8B86D' }}>grow.</em>
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {[
                {
                  icon: '◎',
                  title: 'Structured sessions',
                  desc: 'Plan and track every mentoring session with built-in agendas, notes, and follow-ups.',
                },
                {
                  icon: '◈',
                  title: 'Progress tracking',
                  desc: 'Visualise growth over time with dashboards that surface what matters most.',
                },
                {
                  icon: '◇',
                  title: 'Smart matching',
                  desc: 'Pair mentors and mentees based on skills, goals, and availability — automatically.',
                },
              ].map((f) => (
                <div key={f.title} className="feature-card">
                  <div
                    style={{
                      width: 40, height: 40, background: '#F7F4EF', border: '1px solid #E2DDD8',
                      borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, marginBottom: 20, color: '#B09070',
                    }}
                  >
                    {f.icon}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 500, color: '#1A1714', marginBottom: 10 }}>{f.title}</h3>
                  <p style={{ fontSize: 14, color: '#7A736C', lineHeight: 1.65 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Footer ─────────────────────────────────────── */}
          <footer
            style={{
              borderTop: '1px solid #E2DDD8', padding: '24px 0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: 12,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 24, height: 24, background: '#E8B86D', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 2L10.5 6.5H13.5L11 9.5L12 13.5L8 11.5L4 13.5L5 9.5L2.5 6.5H5.5L8 2Z" fill="#1A1714" /></svg>
              </div>
              <span style={{ fontSize: 13, color: '#9C948C' }}>© 2025 Mentora. All rights reserved.</span>
            </div>
            <div style={{ display: 'flex', gap: 20 }}>
              {['Privacy', 'Terms', 'Contact'].map((item) => (
                <a key={item} href="#" style={{ fontSize: 13, color: '#9C948C', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'color 0.15s, border-color 0.15s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#1A1714'; e.currentTarget.style.borderColor = '#C5BEB8'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#9C948C'; e.currentTarget.style.borderColor = 'transparent'; }}
                >
                  {item}
                </a>
              ))}
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}

export default LandingPage;