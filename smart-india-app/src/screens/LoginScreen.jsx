import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const userTypes = [
  { id: 'emergency', icon: '🚨', name: 'Emergency\nResponder', desc: 'Fire / Police / Medical', color: '#FF3B5C', border: 'rgba(255,59,92,0.5)', bg: 'rgba(255,59,92,0.08)' },
  { id: 'ngo', icon: '🤝', name: 'NGO\nWorker', desc: 'Coordination Hub', color: '#7B5EA7', border: 'rgba(123,94,167,0.5)', bg: 'rgba(123,94,167,0.08)' },
  { id: 'rural', icon: '🌾', name: 'Rural\nUser', desc: 'Village / Gram Panchayat', color: '#00A651', border: 'rgba(0,166,81,0.5)', bg: 'rgba(0,166,81,0.08)' },
  { id: 'logistics', icon: '📦', name: 'Logistics\nManager', desc: 'Supply Chain Ops', color: '#FF9933', border: 'rgba(255,153,51,0.5)', bg: 'rgba(255,153,51,0.08)' },
]

export default function LoginScreen() {
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!selected) return
    setLoading(true)
    setTimeout(() => navigate('/dashboard'), 1200)
  }

  return (
    <div className="login-page">
      {/* Background decoration */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(ellipse at top, rgba(255,153,51,0.06) 0%, transparent 60%)',
        pointerEvents: 'none'
      }} />

      <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="login-header animate-fade-up">
          <div style={{
            width: 60, height: 60, borderRadius: 18, background: 'var(--gradient-saffron)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 28, margin: '0 auto 16px', boxShadow: 'var(--shadow-saffron)'
          }}>🇮🇳</div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Aap kaun hain? Please select your role</p>
        </div>

        {/* User Type Grid */}
        <div className="user-type-grid" style={{ animationDelay: '0.1s' }}>
          {userTypes.map((u, i) => (
            <div
              key={u.id}
              id={`user-type-${u.id}`}
              className={`user-type-card animate-fade-up ${selected === u.id ? 'selected' : ''}`}
              style={{
                borderColor: selected === u.id ? u.color : 'var(--border-glass)',
                background: selected === u.id ? u.bg : 'var(--bg-card)',
                animationDelay: `${0.1 + i * 0.07}s`,
                boxShadow: selected === u.id ? `0 0 20px ${u.color}33` : 'none'
              }}
              onClick={() => setSelected(u.id)}
            >
              <div className="user-type-icon">{u.icon}</div>
              <div className="user-type-name" style={{ whiteSpace: 'pre-line', color: selected === u.id ? u.color : 'var(--text-primary)' }}>
                {u.name}
              </div>
              <div className="user-type-desc">{u.desc}</div>
              {selected === u.id && (
                <div style={{
                  width: 20, height: 20, borderRadius: '50%', background: u.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, color: 'white', marginTop: 2
                }}>✓</div>
              )}
            </div>
          ))}
        </div>

        {/* OTP Section */}
        <div className="glass-card animate-fade-up" style={{ padding: 20, marginBottom: 20, animationDelay: '0.3s' }}>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 10, fontWeight: 600 }}>
            🔐 Aadhaar-based OTP Login
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              placeholder="Mobile Number / Aadhaar"
              style={{
                flex: 1, padding: '12px 14px', borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)',
                color: 'var(--text-primary)', fontSize: 14, outline: 'none', fontFamily: 'Inter, sans-serif'
              }}
            />
            <button className="btn btn-ghost" style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', fontSize: 13 }}>
              Send OTP
            </button>
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            {[...Array(6)].map((_, i) => (
              <input key={i} type="text" maxLength={1}
                style={{
                  width: 42, height: 44, textAlign: 'center', borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-glass)',
                  color: 'var(--text-primary)', fontSize: 18, fontWeight: 700, outline: 'none'
                }}
              />
            ))}
          </div>
        </div>

        {/* Login Button */}
        <button
          id="login-btn"
          className="btn btn-primary animate-fade-up"
          style={{
            width: '100%', padding: '16px', fontSize: 15, borderRadius: 'var(--radius-lg)',
            opacity: selected ? 1 : 0.5, animationDelay: '0.4s',
            cursor: selected ? 'pointer' : 'not-allowed'
          }}
          onClick={handleLogin}
          disabled={!selected}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              Logging in...
            </span>
          ) : (
            `Continue as ${selected ? userTypes.find(u => u.id === selected)?.name.replace('\n', ' ') : 'User'} →`
          )}
        </button>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-muted)', marginTop: 16 }}>
          DigiLocker verified · India Data Protection Act 2023 compliant
        </p>
      </div>
    </div>
  )
}
