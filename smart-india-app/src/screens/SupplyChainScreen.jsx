import { useState } from 'react'

const deliveries = [
  { id: 'DEL-001', item: 'Oxygen Cylinders', from: 'Patna Warehouse', to: 'Varanasi Hospital', status: 'En Route', progress: 65, eta: '45 min', driver: 'Ramesh Kumar', color: '#4CC9F0' },
  { id: 'DEL-002', item: 'Food Packets (2400)', from: 'Ludhiana Hub', to: 'Muzaffarpur Camp', status: 'Loading', progress: 20, eta: '3.5 hrs', driver: 'Suresh Singh', color: '#FF9933' },
  { id: 'DEL-003', item: 'Medicine Kits', from: 'Delhi Depot', to: 'Gorakhpur PHC', status: 'Delivered', progress: 100, eta: 'Done', driver: 'Anil Verma', color: '#00A651' },
]

const inventory = [
  { name: 'Oxygen Cylinders', qty: 340, capacity: 500, color: '#4CC9F0', warn: false },
  { name: 'Food Packets', qty: 2400, capacity: 5000, color: '#FF9933', warn: false },
  { name: 'Medicine Kits', qty: 90, capacity: 800, color: '#FF3B5C', warn: true },
  { name: 'Water Cans', qty: 1200, capacity: 2000, color: '#7B5EA7', warn: false },
  { name: 'Tents', qty: 145, capacity: 200, color: '#00A651', warn: false },
]

const routeSteps = [
  { step: '1', label: 'Origin: Patna Warehouse', sub: 'Departed 10:30 AM', done: true, color: '#4CC9F0' },
  { step: '2', label: 'Checkpoint: Ara District', sub: 'Passed 11:45 AM', done: true, color: '#4CC9F0' },
  { step: '★', label: 'Current: NH31 Highway', sub: '65% of route complete', done: false, color: '#FF9933' },
  { step: '3', label: 'Destination: Varanasi Hospital', sub: 'ETA: 45 minutes', done: false, color: '#00A651' },
]

export default function SupplyChainScreen() {
  const [selected, setSelected] = useState(0)

  return (
    <div className="page">
      <div className="page-header animate-fade-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>📦</span>
          <h1 className="page-title" style={{ color: '#FF9933' }}>Supply Chain</h1>
        </div>
        <p className="page-subtitle">AI demand forecasting · Real-time tracking · Route optimization</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }} className="animate-fade-up">
        {[
          { num: '12', label: 'Active Deliveries', color: '#FF9933' },
          { num: '89%', label: 'On-Time Rate', color: '#00A651' },
          { num: '3', label: 'Low Stock Alerts', color: '#FF3B5C' },
        ].map(s => (
          <div key={s.label} className="stat-chip">
            <div className="stat-number" style={{ color: s.color }}>{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* AI Alert */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255,153,51,0.1), rgba(255,59,92,0.08))',
        border: '1px solid rgba(255,153,51,0.3)', borderRadius: 'var(--radius-md)',
        padding: 14, marginBottom: 20, display: 'flex', alignItems: 'flex-start', gap: 12
      }} className="animate-fade-up">
        <span style={{ fontSize: 22, flexShrink: 0 }}>⚠️</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#FF9933', marginBottom: 4 }}>AI DEMAND FORECAST — Prophet Model</div>
          <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.5 }}>
            Medicine kits ki demand Gorakhpur mein next 48 hrs mein 3x hogi — flood aftermath. <strong style={{ color: '#FF3B5C' }}>Immediate restock needed.</strong>
          </div>
        </div>
        <button id="restock-btn" className="btn btn-primary" style={{ padding: '8px 12px', fontSize: 12, whiteSpace: 'nowrap' }}>Restock</button>
      </div>

      {/* Active Deliveries */}
      <p className="section-title animate-fade-up">Active Deliveries</p>
      {deliveries.map((d, i) => (
        <div key={i} onClick={() => setSelected(i)} style={{
          padding: 16, background: 'var(--bg-card)', border: `1px solid ${selected === i ? d.color + '60' : 'var(--border-glass)'}`,
          borderRadius: 'var(--radius-lg)', marginBottom: 10, cursor: 'pointer', transition: 'all 0.2s',
          boxShadow: selected === i ? `0 0 20px ${d.color}20` : 'none'
        }} className="animate-fade-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{d.item}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
                {d.from} → {d.to}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span className={`badge ${d.status === 'Delivered' ? 'badge-success' : d.status === 'En Route' ? 'badge-info' : 'badge-warning'}`} style={{ fontSize: 10 }}>
                {d.status}
              </span>
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>ETA: {d.eta}</div>
            </div>
          </div>
          <div className="progress-bar-wrap">
            <div className="progress-bar-fill" style={{ width: `${d.progress}%`, background: d.color }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>🚛 {d.driver}</span>
            <span style={{ fontSize: 11, color: d.color, fontWeight: 600 }}>{d.progress}%</span>
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>ID: {d.id}</div>
        </div>
      ))}

      {/* Route Tracker */}
      <p className="section-title animate-fade-up">Route Timeline — {deliveries[selected].id}</p>
      <div style={{ padding: 16, background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', marginBottom: 20 }} className="animate-fade-up">
        {routeSteps.map((r, i) => (
          <div key={i} className="route-step">
            <div className="route-dot" style={{ background: r.done ? `${r.color}30` : 'var(--bg-card)', border: `2px solid ${r.color}`, color: r.color, fontWeight: 700, fontSize: r.step === '★' ? 16 : 12 }}>
              {r.step === '★' ? '★' : r.done ? '✓' : r.step}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: r.done ? 'var(--text-secondary)' : 'var(--text-primary)' }}>{r.label}</div>
              <div style={{ fontSize: 11, color: r.step === '★' ? r.color : 'var(--text-muted)', marginTop: 2 }}>{r.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory */}
      <p className="section-title animate-fade-up">Warehouse Inventory</p>
      <div style={{ padding: 16, background: 'var(--bg-card)', border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)' }} className="animate-fade-up">
        {inventory.map((item, i) => (
          <div key={i} className="inventory-item">
            <div className="inventory-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="inventory-name">{item.name}</span>
                {item.warn && <span className="badge badge-danger" style={{ fontSize: 9 }}>LOW</span>}
              </div>
              <span className="inventory-qty" style={{ color: item.warn ? '#FF3B5C' : item.color }}>
                {item.qty}/{item.capacity}
              </span>
            </div>
            <div className="progress-bar-wrap">
              <div className="progress-bar-fill" style={{ width: `${(item.qty / item.capacity) * 100}%`, background: item.warn ? '#FF3B5C' : item.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
