import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const modules = [
  { id: 'emergency', icon: '🚨', name: 'Emergency', stat: '3', sub: 'Active Alerts', color: '#FF3B5C', gradient: 'var(--gradient-emergency)', glow: 'rgba(255,59,92,0.2)', path: '/emergency' },
  { id: 'ngo', icon: '🤝', name: 'NGO Hub', stat: '47', sub: 'NGOs Active', color: '#7B5EA7', gradient: 'var(--gradient-purple)', glow: 'rgba(123,94,167,0.2)', path: '/ngo' },
  { id: 'rural', icon: '🌾', name: 'Rural Support', stat: '1.2K', sub: 'Queries Today', color: '#00A651', gradient: 'var(--gradient-green)', glow: 'rgba(0,166,81,0.2)', path: '/rural' },
  { id: 'supply', icon: '📦', name: 'Supply Chain', stat: '89%', sub: 'Delivery Rate', color: '#FF9933', gradient: 'var(--gradient-saffron)', glow: 'rgba(255,153,51,0.2)', path: '/supply' },
]

const liveAlerts = [
  '🚨 Bihar: Flood alert Level 3 — 14 NGOs notified — Relief trucks rerouted via AI',
  '⚠️ Uttarakhand: Landslide risk detected — 3 districts on watch',
  '📦 Oxygen supply mismatch detected — Auto-redirect initiated to Delhi NCR',
  '✅ PM-KISAN: 340 rural queries resolved today via Voice AI',
  '🤝 Ludhiana pilot: 5 NGOs now coordinating via unified dashboard',
]

const stats = [
  { num: '2.4M', label: 'Lives Impacted', color: '#FF9933' },
  { num: '47', label: 'NGOs Online', color: '#7B5EA7' },
  { num: '98%', label: 'AI Accuracy', color: '#4CC9F0' },
  { num: '<2min', label: 'Response Time', color: '#00A651' },
]

const recentActivity = [
  { icon: '🚨', title: 'Flood alert routed', desc: 'Bihar Flood — 6 NGOs notified', time: '2 min ago', color: '#FF3B5C' },
  { icon: '🌾', title: 'Rural query resolved', desc: 'PM-KISAN eligibility — UP farmer', time: '5 min ago', color: '#00A651' },
  { icon: '📦', title: 'Supply rerouted', desc: 'Oxygen from Patna → Varanasi', time: '12 min ago', color: '#FF9933' },
  { icon: '🤝', title: 'Resource matched', desc: 'Food surplus — NGO Sahyog', time: '18 min ago', color: '#7B5EA7' },
]

export default function DashboardScreen() {
  const [tickerIdx, setTickerIdx] = useState(0)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="page">
      {/* Greeting */}
      <div className="page-header animate-fade-up">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 4 }}>
              {time.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })} · Namaste 🙏
            </p>
            <h1 className="page-title">Command Center</h1>
            <p className="page-subtitle">Smart India AI Platform — Live</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--radius-full)', background: 'rgba(0,166,81,0.1)', border: '1px solid rgba(0,166,81,0.3)' }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A651', animation: 'pulse-dot 1.5s infinite' }} />
              <span style={{ fontSize: 11, color: '#00A651', fontWeight: 600 }}>LIVE</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Alert Ticker */}
      <div className="ticker-wrap animate-fade-up" style={{ animationDelay: '0.05s' }}>
        <span className="ticker-inner">
          {liveAlerts.join('   ·   ')}
        </span>
      </div>

      {/* Module Cards */}
      <div className="module-grid animate-fade-up" style={{ animationDelay: '0.1s' }}>
        {modules.map((m, i) => (
          <Link
            key={m.id}
            id={`module-${m.id}`}
            to={m.path}
            className="module-card"
            style={{
              borderColor: `${m.color}33`,
              boxShadow: `0 4px 20px ${m.glow}`,
              animationDelay: `${0.1 + i * 0.05}s`
            }}
          >
            <div className="module-card-icon" style={{ background: `${m.color}20` }}>
              {m.icon}
            </div>
            <div>
              <div className="module-card-stat" style={{ color: m.color }}>{m.stat}</div>
              <div className="module-card-sub">{m.sub}</div>
            </div>
            <div className="module-card-name">{m.name}</div>
          </Link>
        ))}
      </div>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 20 }}
        className="animate-fade-up">
        {stats.map(s => (
          <div key={s.label} className="stat-chip">
            <div className="stat-number" style={{ color: s.color, fontSize: 16 }}>{s.num}</div>
            <div className="stat-label" style={{ fontSize: 9 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Active Alert Banner */}
      <div className="alert-banner animate-fade-up" style={{ animationDelay: '0.2s' }}>
        <div className="alert-banner-icon">🚨</div>
        <div className="alert-banner-text">
          <div className="alert-banner-title">⚡ Active Alert — Bihar Flood Level 3</div>
          <div className="alert-banner-msg">AI routing 14 NGOs · Trucks rerouted · Village alerts sent in Hindi</div>
        </div>
        <Link to="/emergency" className="btn btn-danger" style={{ padding: '8px 12px', fontSize: 12 }}>View</Link>
      </div>

      {/* Recent Activity */}
      <div className="animate-fade-up" style={{ animationDelay: '0.25s' }}>
        <p className="section-title">Recent Activity</p>
        {recentActivity.map((a, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px',
            background: 'var(--bg-card)', border: '1px solid var(--border-glass)',
            borderRadius: 'var(--radius-md)', marginBottom: 8,
            borderLeft: `3px solid ${a.color}`
          }}>
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{a.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{a.desc}</div>
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{a.time}</div>
          </div>
        ))}
      </div>

      {/* AI Status */}
      <div className="ai-response animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="ai-badge">
          <div className="ai-dot" />
          AI Engine Status
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {[
            { name: 'LLaMA 3 Core', status: 'Active', ok: true },
            { name: 'GPT-4 Emergency', status: 'Standby', ok: true },
            { name: 'IndicBERT Rural', status: 'Active', ok: true },
            { name: 'Prophet Supply', status: 'Training', ok: false },
          ].map(ai => (
            <div key={ai.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: ai.ok ? '#00A651' : '#FF9933', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 11, color: 'var(--text-primary)' }}>{ai.name}</div>
                <div style={{ fontSize: 10, color: ai.ok ? '#00A651' : '#FF9933' }}>{ai.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
