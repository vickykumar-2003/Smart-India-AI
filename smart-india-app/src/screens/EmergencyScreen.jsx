import { useState, useRef, useEffect } from 'react'

const responders = [
  { icon: '🚒', type: 'Fire Brigade', name: 'Station 4 — Muzaffarpur', dist: '1.2 km', eta: '4 min', status: 'En Route', color: '#FF3B5C', phone: '101' },
  { icon: '🚑', type: 'Ambulance', name: 'PMCH Emergency Unit', dist: '2.4 km', eta: '7 min', status: 'Available', color: '#00A651', phone: '108' },
  { icon: '🚓', type: 'Police', name: 'Muzaffarpur Chowk', dist: '0.8 km', eta: '3 min', status: 'Dispatched', color: '#4CC9F0', phone: '100' },
  { icon: '🏥', type: 'Hospital', name: 'SKMCH — 120 beds free', dist: '3.1 km', eta: '10 min', status: 'Ready', color: '#7B5EA7', phone: '0621-2222200' },
  { icon: '🤝', type: 'NGO', name: 'Sahyog Foundation', dist: '4.5 km', eta: '15 min', status: 'Notified', color: '#FF9933', phone: '9876543210' },
]

const aiSteps = [
  { text: 'Disaster type: Flood — Level 3', done: true },
  { text: 'Affected radius: ~12 km estimated', done: true },
  { text: '14 NGOs auto-notified via SMS + App', done: true },
  { text: 'Optimal relief route via OSRM computed', done: true },
  { text: 'Village alerts sent in Hindi — 508 households', done: true },
  { text: 'NDMA coordination request — pending', done: false },
]

export default function EmergencyScreen() {
  const [sosActive, setSosActive] = useState(false)
  const [sosOverlay, setSosOverlay] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [alertDismissed, setAlertDismissed] = useState(false)
  const [pressProgress, setPressProgress] = useState(0)
  const holdTimerRef = useRef(null)
  const progressRef = useRef(null)
  const countdownRef = useRef(null)

  // Reset on unmount
  useEffect(() => () => {
    clearTimeout(holdTimerRef.current)
    clearInterval(progressRef.current)
    clearInterval(countdownRef.current)
  }, [])

  const startPress = () => {
    setPressProgress(0)
    let prog = 0
    progressRef.current = setInterval(() => {
      prog += 2
      setPressProgress(prog)
      if (prog >= 100) {
        clearInterval(progressRef.current)
        triggerSOS()
      }
    }, 30)
  }

  const cancelPress = () => {
    clearInterval(progressRef.current)
    setPressProgress(0)
  }

  const triggerSOS = () => {
    setSosActive(true)
    setSosOverlay(true)
    setCountdown(5)
    let c = 5
    countdownRef.current = setInterval(() => {
      c -= 1
      setCountdown(c)
      if (c <= 0) {
        clearInterval(countdownRef.current)
      }
    }, 1000)
  }

  const dismissOverlay = () => {
    setSosOverlay(false)
  }

  const cancelSOS = () => {
    clearInterval(countdownRef.current)
    setSosActive(false)
    setSosOverlay(false)
    setPressProgress(0)
  }

  return (
    <div className="page">

      {/* SOS ACTIVATED OVERLAY */}
      {sosOverlay && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 999,
          background: 'rgba(5,8,19,0.97)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: 24, animation: 'fadeIn 0.3s ease'
        }}>
          <div style={{ fontSize: 60, marginBottom: 20, animation: 'pulse-dot 1s infinite' }}>🚨</div>

          <div style={{
            fontSize: 28, fontWeight: 900, color: '#FF3B5C', marginBottom: 8,
            fontFamily: "'Space Grotesk', sans-serif", letterSpacing: 2
          }}>EMERGENCY SENT!</div>

          <div style={{ fontSize: 15, color: 'var(--text-secondary)', textAlign: 'center', marginBottom: 30, lineHeight: 1.6 }}>
            Aapki location detect ho gayi hai.<br />Nearest responders ko alert kar diya gaya hai.
          </div>

          {/* Live ping circles */}
          <div style={{ position: 'relative', width: 120, height: 120, marginBottom: 30 }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{
                position: 'absolute', inset: `${i * -20}px`, borderRadius: '50%',
                border: '2px solid #FF3B5C', opacity: 0,
                animation: `pulse-ring 2s ease-out ${i * 0.5}s infinite`
              }} />
            ))}
            <div style={{
              width: 120, height: 120, borderRadius: '50%',
              background: 'var(--gradient-emergency)', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-emergency)'
            }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: 4 }}>SOS</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>ACTIVE</div>
            </div>
          </div>

          {/* Countdown */}
          {countdown > 0 && (
            <div style={{ marginBottom: 20, textAlign: 'center' }}>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 6 }}>Cancel karne ke liye:</div>
              <div style={{ fontSize: 40, fontWeight: 900, color: '#FF9933', fontFamily: "'Space Grotesk', sans-serif" }}>{countdown}s</div>
            </div>
          )}

          {/* Responders being notified */}
          <div style={{ width: '100%', maxWidth: 360, marginBottom: 24 }}>
            {responders.slice(0, 3).map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
                background: 'rgba(255,59,92,0.08)', borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(255,59,92,0.2)', marginBottom: 8,
                animation: `fadeInUp 0.4s ease ${i * 0.15}s both`
              }}>
                <span style={{ fontSize: 22 }}>{r.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.type}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>ETA: {r.eta} · {r.dist}</div>
                </div>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00A651', animation: 'pulse-dot 1.5s infinite' }} />
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 12, width: '100%', maxWidth: 360 }}>
            <button onClick={cancelSOS} style={{
              flex: 1, padding: '14px', borderRadius: 'var(--radius-lg)', fontSize: 14, fontWeight: 700,
              background: 'rgba(255,255,255,0.08)', border: '1px solid var(--border-glass)',
              color: 'var(--text-primary)', cursor: 'pointer', fontFamily: 'Inter, sans-serif'
            }}>
              ✕ Cancel SOS
            </button>
            <button onClick={dismissOverlay} style={{
              flex: 2, padding: '14px', borderRadius: 'var(--radius-lg)', fontSize: 14, fontWeight: 700,
              background: 'var(--gradient-emergency)', border: 'none',
              color: 'white', cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              boxShadow: 'var(--shadow-emergency)'
            }}>
              ✅ Help Coming — Track
            </button>
          </div>
        </div>
      )}

      {/* PAGE CONTENT */}
      <div className="page-header animate-fade-up">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <span style={{ fontSize: 22 }}>🚨</span>
          <h1 className="page-title" style={{ color: '#FF3B5C' }}>Emergency Services</h1>
        </div>
        <p className="page-subtitle">Real-time disaster coordination · AI-powered response</p>
      </div>

      {/* Alert Banner */}
      {!alertDismissed && (
        <div className="animate-fade-up" style={{
          background: 'linear-gradient(135deg, rgba(255,59,92,0.15), rgba(255,107,53,0.1))',
          border: '1px solid rgba(255,59,92,0.4)', borderRadius: 'var(--radius-lg)',
          padding: 16, marginBottom: 20
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#FF3B5C', textTransform: 'uppercase', letterSpacing: 1 }}>
                ⚡ ACTIVE — BIHAR FLOOD ALERT
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
                District: Muzaffarpur · Level 3
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
                Flood waters rising · Evacuation recommended
              </div>
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <span className="badge badge-danger">🌊 Flood</span>
                <span className="badge badge-warning">Level 3</span>
                <span className="badge badge-info">14 NGOs Alerted</span>
              </div>
            </div>
            <button onClick={() => setAlertDismissed(true)}
              style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: 20, padding: 4, alignSelf: 'flex-start' }}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* SOS BUTTON — Press & Hold */}
      <div style={{ textAlign: 'center', marginBottom: 28 }} className="animate-fade-up">
        <p style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 16 }}>
          {sosActive ? '🔴 Emergency Active — Help is on the way' : '⬇️ Press & Hold SOS to activate emergency'}
        </p>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
          {sosActive && <div className="sos-ring-1" />}
          {sosActive && <div className="sos-ring-2" />}

          {/* Hold progress ring */}
          {pressProgress > 0 && pressProgress < 100 && (
            <svg style={{ position: 'absolute', inset: -6, width: 'calc(100% + 12px)', height: 'calc(100% + 12px)' }} viewBox="0 0 152 152">
              <circle cx="76" cy="76" r="72" fill="none" stroke="rgba(255,59,92,0.3)" strokeWidth="4" />
              <circle cx="76" cy="76" r="72" fill="none" stroke="#FF3B5C" strokeWidth="4"
                strokeDasharray={`${2 * Math.PI * 72}`}
                strokeDashoffset={`${2 * Math.PI * 72 * (1 - pressProgress / 100)}`}
                strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '76px 76px', transition: 'stroke-dashoffset 0.05s linear' }}
              />
            </svg>
          )}

          <button
            id="sos-btn"
            className={`sos-btn ${sosActive ? 'active' : ''}`}
            onMouseDown={startPress}
            onMouseUp={cancelPress}
            onMouseLeave={cancelPress}
            onTouchStart={(e) => { e.preventDefault(); startPress(); }}
            onTouchEnd={(e) => { e.preventDefault(); cancelPress(); }}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
          >
            <div className="sos-text">SOS</div>
            <div className="sos-sub">
              {pressProgress > 0 ? `${Math.round(pressProgress)}%` : sosActive ? 'ACTIVE' : 'Hold 3s'}
            </div>
          </button>
        </div>

        {sosActive && (
          <div style={{
            marginTop: 16, padding: '10px 20px', display: 'inline-block',
            background: 'rgba(255,59,92,0.1)', borderRadius: 'var(--radius-full)',
            border: '1px solid rgba(255,59,92,0.3)'
          }}>
            <span style={{ fontSize: 13, color: '#FF3B5C', fontWeight: 600 }}>
              🔴 Alert sent! Responders notified
            </span>
          </div>
        )}
      </div>

      {/* Map */}
      <div className="map-container animate-fade-up" style={{ marginBottom: 20, animationDelay: '0.1s' }}>
        <div className="map-grid" />
        <div style={{ position: 'absolute', top: '35%', left: '44%', color: '#FF3B5C', zIndex: 2 }}>
          <div style={{ width: 16, height: 16, borderRadius: '50% 50% 50% 0', transform: 'rotate(-45deg)', background: '#FF3B5C', position: 'relative' }}>
            <div className="map-ping" style={{ borderColor: '#FF3B5C' }} />
          </div>
        </div>
        <span style={{ position: 'absolute', top: '22%', left: '28%', fontSize: 18 }}>🚒</span>
        <span style={{ position: 'absolute', top: '58%', left: '54%', fontSize: 18 }}>🚑</span>
        <span style={{ position: 'absolute', top: '43%', left: '64%', fontSize: 18 }}>🏥</span>
        <span style={{ position: 'absolute', top: '68%', left: '22%', fontSize: 18 }}>🤝</span>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <path d="M 125 52 Q 180 80 198 80" stroke="#FF9933" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.7" />
          <path d="M 238 115 Q 215 100 198 80" stroke="#4CC9F0" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.7" />
        </svg>
        <div style={{ background: 'rgba(5,8,19,0.85)', padding: '5px 12px', borderRadius: 'var(--radius-full)', fontSize: 12, fontWeight: 600, color: '#FF3B5C', zIndex: 2 }}>
          📍 Muzaffarpur, Bihar
        </div>
      </div>

      {/* AI Analysis */}
      <div className="ai-response animate-fade-up" style={{ marginBottom: 20, animationDelay: '0.15s' }}>
        <div className="ai-badge"><div className="ai-dot" />AI Situation Analysis — GPT-4</div>
        {aiSteps.map((s, i) => (
          <div key={i} style={{ fontSize: 12, color: s.done ? 'var(--text-primary)' : 'var(--text-muted)', padding: '4px 0', display: 'flex', gap: 8 }}>
            <span>{s.done ? '✅' : '⏳'}</span> {s.text}
          </div>
        ))}
        <div style={{ marginTop: 12, padding: '10px 12px', background: 'rgba(255,59,92,0.08)', borderRadius: 'var(--radius-sm)', fontSize: 12, color: '#FF3B5C', fontWeight: 600, lineHeight: 1.5 }}>
          ⚠️ Human Decision Required: Initiate full evacuation of Wards 3, 7, 12?
        </div>
        <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
          <button id="approve-evacuation" className="btn btn-danger" style={{ flex: 1, padding: '10px', fontSize: 13 }}>✅ Approve</button>
          <button className="btn btn-ghost" style={{ flex: 1, padding: '10px', fontSize: 13 }}>❌ Override</button>
        </div>
      </div>

      {/* Responders */}
      <p className="section-title animate-fade-up">Nearest Responders</p>
      {responders.map((r, i) => (
        <div key={i} className="responder-card animate-fade-up" style={{ animationDelay: `${0.2 + i * 0.05}s` }}>
          <div className="responder-icon" style={{ background: `${r.color}18` }}>{r.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{r.type}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>{r.name}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>ETA: {r.eta}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: r.color }}>{r.dist}</div>
            <span className={`badge ${r.status === 'En Route' || r.status === 'Dispatched' ? 'badge-warning' : r.status === 'Available' || r.status === 'Ready' ? 'badge-success' : 'badge-info'}`} style={{ fontSize: 10 }}>
              {r.status}
            </span>
            <a href={`tel:${r.phone}`} style={{
              fontSize: 11, color: r.color, fontWeight: 600, textDecoration: 'none',
              padding: '4px 10px', borderRadius: 'var(--radius-full)',
              background: `${r.color}15`, border: `1px solid ${r.color}40`
            }}>📞 Call</a>
          </div>
        </div>
      ))}
    </div>
  )
}
