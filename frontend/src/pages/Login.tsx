import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';
import { useAuthStore } from '../store/authStore';
import type { User } from '../types';

const mentorDemo = {
  email: 'mentor@demo.com',
  password: 'Mentor123!',
  token: 'demo-mentor-token',
  user: {
    _id: 'demo-mentor',
    name: 'Demo Mentor',
    email: 'mentor@demo.com',
    role: 'MENTOR',
    organization: 'demo-org',
  } as User,
};

const studentDemo = {
  email: 'student@demo.com',
  password: 'Student123!',
  token: 'demo-student-token',
  user: {
    _id: 'demo-student',
    name: 'Demo Student',
    email: 'student@demo.com',
    role: 'MENTEE',
    organization: 'demo-org',
  } as User,
};

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.77h5.39a4.6 4.6 0 01-2 3.02v2.5h3.23c1.89-1.74 2.98-4.3 2.98-7.3z" fill="#4285F4" />
      <path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.23-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.81-1.76-5.6-4.12H1.07v2.58A9.99 9.99 0 0010 20z" fill="#34A853" />
      <path d="M4.4 11.9a5.95 5.95 0 010-3.8V5.52H1.07a10 10 0 000 8.96l3.33-2.58z" fill="#FBBC05" />
      <path d="M10 3.98c1.47 0 2.79.5 3.83 1.5l2.86-2.86A9.97 9.97 0 0010 0a9.99 9.99 0 00-8.93 5.52L4.4 8.1C5.19 5.74 7.4 3.98 10 3.98z" fill="#EA4335" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2L10.5 6.5H13.5L11 9.5L12 13.5L8 11.5L4 13.5L5 9.5L2.5 6.5H5.5L8 2Z" fill="#1A1714" />
    </svg>
  );
}

function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoSuccess, setDemoSuccess] = useState<string | null>(null);

  const handleLogin = async (loginEmail: string, loginPassword: string) => {
    setError('');
    setLoading(true);
    try {
      const data = await login({ email: loginEmail, password: loginPassword });
      setAuth(data.token, data.user);
      const rolePath = data.user.role === 'MENTOR' ? '/app/mentor/dashboard' : '/app/mentee/dashboard';
      navigate(rolePath);
    } catch (err) {
      if (axios.isAxiosError(err) && err.code === 'ECONNREFUSED') {
        setError('Backend unavailable. Start the backend with `cd backend && npm run dev`.');
      } else {
        setError('Unable to login. Check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  const loginOfflineDemo = (demoAccount: typeof mentorDemo) => {
    setError('');
    setLoading(false);
    setEmail(demoAccount.email);
    setPassword(demoAccount.password);
    setDemoSuccess(demoAccount.user.role === 'MENTOR' ? 'mentor' : 'student');
    setAuth(demoAccount.token, demoAccount.user);
    const rolePath = demoAccount.user.role === 'MENTOR' ? '/app/mentor/dashboard' : '/app/mentee/dashboard';
    setTimeout(() => navigate(rolePath), 600);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const matchedDemo = [mentorDemo, studentDemo].find(
      (account) => account.email === email && account.password === password
    );
    if (matchedDemo) {
      loginOfflineDemo(matchedDemo);
      return;
    }
    await handleLogin(email, password);
  };

  const handleMentorLogin = () => loginOfflineDemo(mentorDemo);
  const handleStudentLogin = () => loginOfflineDemo(studentDemo);
  const handleGoogleLogin = () =>
    setError('Google login is not available in demo mode. Use one of the demo options or enter your credentials.');

  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400&family=DM+Sans:wght@300;400;500&display=swap');
      `}</style>

      <div
        className="min-h-screen grid lg:grid-cols-[1.1fr_0.9fr]"
        style={{ background: '#F7F4EF', fontFamily: "'DM Sans', sans-serif", color: '#1A1714' }}
      >
        {/* ── Left panel ─────────────────────────────────────── */}
        <div
          className="relative flex flex-col justify-between overflow-hidden px-14 py-14"
          style={{ background: '#1A1714' }}
        >
          {/* Decorative circles */}
          <div
            className="pointer-events-none absolute"
            style={{
              top: -120, right: -80,
              width: 380, height: 380,
              borderRadius: '50%',
              border: '1px solid rgba(247,244,239,0.07)',
            }}
          />
          <div
            className="pointer-events-none absolute"
            style={{
              bottom: 60, left: -100,
              width: 300, height: 300,
              borderRadius: '50%',
              border: '1px solid rgba(247,244,239,0.05)',
            }}
          />

          

          {/* Copy */}
          <div className="relative z-10 pt-20 ">
            <p
              style={{
                fontSize: 11, fontWeight: 500, letterSpacing: '0.18em',
                color: '#E8B86D', textTransform: 'uppercase', marginBottom: 24,
              }}
            >
              Mentoring platform
            </p>
            <h1
              style={{
                fontFamily: "'Fraunces', serif", fontWeight: 300,
                fontSize: 44, lineHeight: 1.12, color: '#F7F4EF', marginBottom: 20,
              }}
            >
              Growth happens<br />through{' '}
              <em style={{ fontStyle: 'italic', color: '#E8B86D' }}>real</em>
              <br />connection.
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(247,244,239,0.5)', lineHeight: 1.7, maxWidth: 320 }}>
              A structured space where mentors and mentees build meaningful, lasting working relationships.
            </p>
          </div>

          {/* Stats */}
          <div className="flex gap-8 relative z-10">
            {[
              { num: '2.4k', label: 'Active pairs' },
              { num: '94%', label: 'Satisfaction' },
              { num: '180+', label: 'Organizations' },
            ].map((s) => (
              <div key={s.label} style={{ borderTop: '1px solid rgba(247,244,239,0.12)', paddingTop: 16 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 300, color: '#F7F4EF', lineHeight: 1, marginBottom: 4 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: 11, color: 'rgba(247,244,239,0.4)', letterSpacing: '0.08em' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right panel ────────────────────────────────────── */}
        <div
          className="flex flex-col justify-center px-14 py-14"
          style={{ background: '#F7F4EF' }}
        >
          <div style={{ maxWidth: 360, width: '100%' }}>

            {/* Header */}
            <div style={{ marginBottom: 36 }}>
              <p style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', color: '#B09070', textTransform: 'uppercase', marginBottom: 10 }}>
                Welcome back
              </p>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 300, color: '#1A1714', lineHeight: 1.2 }}>
                Sign in to your account
              </h2>
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                padding: '13px 18px', background: '#fff',
                border: '1px solid #E2DDD8', borderRadius: 12,
                cursor: 'pointer', fontSize: 14, fontWeight: 400, color: '#1A1714',
                marginBottom: 16, transition: 'border-color 0.15s',
                fontFamily: "'DM Sans', sans-serif",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#C5BEB8')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#E2DDD8')}
            >
              <GoogleIcon />
              <span style={{ flex: 1, textAlign: 'center', marginRight: 18 }}>Continue with Google</span>
            </button>

            {/* Divider */}
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                margin: '20px 0', color: '#C5BEB8', fontSize: 12, letterSpacing: '0.06em',
              }}
            >
              <div style={{ flex: 1, height: 1, background: '#E2DDD8' }} />
              or try a demo account
              <div style={{ flex: 1, height: 1, background: '#E2DDD8' }} />
            </div>

            {/* Demo buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
              <button
                type="button"
                onClick={handleMentorLogin}
                disabled={loading}
                style={{
                  padding: '12px 16px', borderRadius: 12,
                  background: demoSuccess === 'mentor' ? '#E8F7EE' : '#fff',
                  color: '#1A1714',
                  border: `1px solid ${demoSuccess === 'mentor' ? '#86EFAC' : '#E2DDD8'}`,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                  textAlign: 'left', transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  display: 'flex', flexDirection: 'column', gap: 2,
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#000';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = demoSuccess === 'mentor' ? '#E8F7EE' : '#fff';
                  e.currentTarget.style.color = '#1A1714';
                }}
              >
                <span>{demoSuccess === 'mentor' ? 'Signed in ✓' : 'Demo Mentor'}</span>
                <span style={{ fontSize: 11, opacity: 0.5, fontWeight: 400, letterSpacing: '0.05em' }}>
                  {demoSuccess === 'mentor' ? 'Redirecting…' : 'Mentor role'}
                </span>
              </button>

              <button
                type="button"
                onClick={handleStudentLogin}
                disabled={loading}
                style={{
                  padding: '12px 16px', borderRadius: 12,
                  background: demoSuccess === 'student' ? '#E8F7EE' : '#fff',
                  color: '#1A1714',
                  border: `1px solid ${demoSuccess === 'student' ? '#86EFAC' : '#E2DDD8'}`,
                  cursor: 'pointer',
                  fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500,
                  textAlign: 'left', transition: 'background 0.2s, border-color 0.2s, color 0.2s',
                  display: 'flex', flexDirection: 'column', gap: 2,
                  opacity: loading ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = '#000';
                    e.currentTarget.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = demoSuccess === 'student' ? '#E8F7EE' : '#fff';
                  e.currentTarget.style.color = '#1A1714';
                }}
              >
                <span>{demoSuccess === 'student' ? 'Signed in ✓' : 'Demo Mentee'}</span>
                <span style={{ fontSize: 11, opacity: 0.5, fontWeight: 400, letterSpacing: '0.05em' }}>
                  {demoSuccess === 'student' ? 'Redirecting…' : 'Mentee role'}
                </span>
              </button>
            </div>

            {/* Divider */}
            <div
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                margin: '20px 0', color: '#C5BEB8', fontSize: 12, letterSpacing: '0.06em',
              }}
            >
              <div style={{ flex: 1, height: 1, background: '#E2DDD8' }} />
              or sign in with email
              <div style={{ flex: 1, height: 1, background: '#E2DDD8' }} />
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  fontSize: 12, color: '#B91C1C',
                  padding: '10px 14px', background: '#FEF2F2',
                  border: '1px solid #FECACA', borderRadius: 10, marginBottom: 14,
                  lineHeight: 1.5,
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom: 14 }}>
                <label
                  style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#7A736C', marginBottom: 6, letterSpacing: '0.04em' }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: '#fff', border: '1px solid #E2DDD8',
                    borderRadius: 12, fontSize: 14, color: '#1A1714',
                    outline: 'none', fontFamily: "'DM Sans', sans-serif",
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#1A1714')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#E2DDD8')}
                />
              </div>

              {/* Password */}
              <div style={{ marginBottom: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <label style={{ fontSize: 12, fontWeight: 500, color: '#7A736C', letterSpacing: '0.04em' }}>
                    Password
                  </label>
                  <a
                    href="#"
                    style={{ fontSize: 12, color: '#B09070', textDecoration: 'none', borderBottom: '1px solid #DDD5C8' }}
                  >
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%', padding: '12px 16px',
                    background: '#fff', border: '1px solid #E2DDD8',
                    borderRadius: 12, fontSize: 14, color: '#1A1714',
                    outline: 'none', fontFamily: "'DM Sans', sans-serif",
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = '#1A1714')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = '#E2DDD8')}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '14px',
                  background: '#E8B86D', border: 'none', borderRadius: 12,
                  fontSize: 14, fontWeight: 500, color: '#1A1714',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: '0.01em', marginTop: 16,
                  opacity: loading ? 0.7 : 1,
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#DDA85A'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#E8B86D'; }}
              >
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>

            {/* Footer */}
            <p style={{ textAlign: 'center', marginTop: 22, fontSize: 13, color: '#9C948C' }}>
              New here?{' '}
              <Link
                to="/signup"
                style={{
                  color: '#1A1714', fontWeight: 500, textDecoration: 'none',
                  borderBottom: '1px solid #C5BEB8',
                }}
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;