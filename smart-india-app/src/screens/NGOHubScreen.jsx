import { useState } from 'react'

const ngos = [
  { name: 'Sahyog Foundation', location: 'Ludhiana, Punjab', volunteers: 124, status: 'Active', focus: 'Food & Shelter', color: '#7B5EA7' },
  { name: 'Prayas Welfare', location: 'Patna, Bihar', volunteers: 89, status: 'Active', focus: 'Disaster Relief', color: '#FF9933' },
  { name: 'Jan Seva Trust', location: 'Jaipur, Rajasthan', volunteers: 56, status: 'Standby', focus: 'Medical Aid', color: '#4CC9F0' },
  { name: 'Grameen Vikas', location: 'Kanpur, UP', volunteers: 203, status: 'Active', focus: 'Rural Development', color: '#00A651' },
]

const resources = [
  { icon: '🍱', name: 'Food Packets', available: 2400, needed: 3200, unit: 'packets', ngo: 'Sahyog Foundation', color: '#FF9933' },
  { icon: '🧴', name: 'Hygiene Kits', available: 890, needed: 1200, unit: 'kits', ngo: 'Prayas Welfare', color: '#4CC9F0' },
  { icon: '🏕️', name: 'Tents / Shelters', available: 145, needed: 200, unit: 'units', ngo: 'Jan Seva Trust', color: '#7B5EA7' },
  { icon: '💊', name: 'Medicine Kits', available: 560, needed: 800, unit: 'boxes', ngo: 'Grameen Vikas', color: '#00A651' },
]

const volunteers = [
  { name: 'Ravi Kumar', skill: 'Medical', location: '2.1 km away', status: 'Available' },
  { name: 'Priya Sharma', skill: 'Logistics', location: '3.4 km away', status: 'En Route' },
  { name: 'Amit Singh', skill: 'Communication', location: '1.8 km away', status: 'Available' },
  { name: 'Sunita Devi', skill: 'Food Dist.', location: '4.2 km away', status: 'Available' },
]

export default function NGOHubScreen() {
  const [activeTab, setActiveTab] = useState('resources')

  const tabs = [
    { id: 'resources', label: '📦 Resources' },
    { id: 'ngos', label: '🏢 NGOs' },
    { id: 'volunteers', label: '👥 Volunteers' },
  ]

  return (
    <div className="page">
      <div className="page-header animate-fade-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>🤝</span>
          <h1 className="page-title" style={{ color: '#7B5EA7' }}>NGO Coordination Hub</h1>
        </div>
        <p className="page-subtitle">Unified dashboard · Resource sharing · Volunteer matching</p>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }} className="animate-fade-up">
        {[
          { num: '47', label: 'NGOs Online', color: '#7B5EA7' },
          { num: '472', label: 'Volunteers', color: '#FF9933' },
          { num: '0', label: 'Duplications', color: '#00A651' },
        ].map(s => (
          <div key={s.label} className="stat-chip">
            <div className="stat-number" style={{ color: s.color }}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* AI Match Alert */}
      <div className="ai-response animate-fade-up" style={{ marginBottom: 20, animationDelay: '0.05s' }}>
        <div className="ai-badge"><div className="ai-dot" />Claude AI — Auto-Match Alert</div>
        <div className="ai-text">
          🔗 <strong>Resource Match Found!</strong> Sahyog Foundation ke paas 800 extra food packets hain — Prayas Welfare ko 600 chahiye. Auto-transfer request bheja ja sakta hai.
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          <button id="approve-transfer-btn" className="btn btn-primary" style={{ flex: 1, padding: '8px', fontSize: 12 }}>✅ Approve Transfer</button>
          <button className="btn btn-ghost" style={{ flex: 1, padding: '8px', fontSize: 12 }}>📋 Review</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', padding: 4 }} className="animate-fade-up">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            flex: 1, padding: '8px 6px', borderRadius: 'var(--radius-sm)', fontSize: 11, fontWeight: 600,
            border: 'none', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
            background: activeTab === tab.id ? 'rgba(123,94,167,0.3)' : 'transparent',
            color: activeTab === tab.id ? '#7B5EA7' : 'var(--text-muted)',
            boxShadow: activeTab === tab.id ? '0 0 12px rgba(123,94,167,0.2)' : 'none'
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Resources Tab */}
      {activeTab === 'resources' && (
        <div className="animate-scale">
          <p className="section-title">Resource Inventory</p>
          {resources.map((r, i) => (
            <div key={i} className="resource-card">
              <span style={{ fontSize: 26 }}>{r.icon}</span>
              <div className="resource-bar" style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.name}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{r.available}/{r.needed}</span>
                </div>
                <div className="progress-bar-wrap">
                  <div className="progress-bar-fill" style={{ width: `${(r.available / r.needed) * 100}%`, background: r.color }} />
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Via {r.ngo}</div>
              </div>
              <button style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', fontSize: 11, fontWeight: 600, background: `${r.color}20`, border: `1px solid ${r.color}40`, color: r.color, cursor: 'pointer' }}>
                Share
              </button>
            </div>
          ))}

          {/* Map */}
          <p className="section-title" style={{ marginTop: 16 }}>Resource Distribution Map</p>
          <div className="map-container" style={{ height: 160, borderColor: 'rgba(123,94,167,0.3)' }}>
            <div className="map-grid" />
            {[['30%','40%','🏢','#7B5EA7'], ['55%','25%','🤝','#FF9933'], ['70%','60%','📦','#4CC9F0'], ['20%','65%','💊','#00A651']].map(([t,l,ic,c], i) => (
              <div key={i} style={{ position: 'absolute', top: t, left: l, fontSize: 18, filter: `drop-shadow(0 0 6px ${c})` }}>{ic}</div>
            ))}
            <div style={{ background: 'rgba(5,8,19,0.8)', padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: 11, color: '#7B5EA7', fontWeight: 600 }}>
              47 NGOs · 3 States
            </div>
          </div>
        </div>
      )}

      {/* NGOs Tab */}
      {activeTab === 'ngos' && (
        <div className="animate-scale">
          {ngos.map((n, i) => (
            <div key={i} className="glass-card" style={{ padding: 16, marginBottom: 10, borderLeft: `3px solid ${n.color}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>{n.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>📍 {n.location}</div>
                </div>
                <span className={`badge ${n.status === 'Active' ? 'badge-success' : 'badge-warning'}`}>{n.status}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>Focus: <strong style={{ color: n.color }}>{n.focus}</strong></span>
                <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>👥 {n.volunteers} volunteers</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Volunteers Tab */}
      {activeTab === 'volunteers' && (
        <div className="animate-scale">
          {volunteers.map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14, background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-md)', marginBottom: 10 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(123,94,167,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>👤</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{v.name}</div>
                <div style={{ fontSize: 11, color: '#7B5EA7' }}>{v.skill} · {v.location}</div>
              </div>
              <span className={`badge ${v.status === 'Available' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: 10 }}>{v.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
