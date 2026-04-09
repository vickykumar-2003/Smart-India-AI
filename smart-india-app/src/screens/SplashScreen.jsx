import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SplashScreen() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 3000)
    const interval = setInterval(() => setProgress(p => Math.min(p + 2, 100)), 50)
    return () => { clearTimeout(timer); clearInterval(interval) }
  }, [navigate])

  return (
    <div className="splash">
      <div className="splash-bg-glow" />

      {/* Particle dots */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          borderRadius: '50%',
          background: i % 3 === 0 ? '#FF9933' : i % 3 === 1 ? '#4CC9F0' : '#00A651',
          opacity: 0.4,
          top: Math.random() * 100 + '%',
          left: Math.random() * 100 + '%',
          animation: `float ${3 + i * 0.3}s ease-in-out infinite`,
          animationDelay: `${i * 0.2}s`
        }} />
      ))}

      <div className="splash-logo animate-float">🇮🇳</div>

      <h1 className="splash-title">
        <span className="splash-gradient-text">Smart India</span>
        <br />
        <span style={{ color: 'var(--text-primary)' }}>AI Assistant</span>
      </h1>

      <p className="splash-tagline">
        Emergency · Supply Chain · NGO Coordination · Rural Support
      </p>

      <div className="splash-modules">
        {[
          { label: '🚨 Emergency', color: '#FF3B5C', border: 'rgba(255,59,92,0.4)' },
          { label: '📦 Supply', color: '#FF9933', border: 'rgba(255,153,51,0.4)' },
          { label: '🤝 NGO', color: '#7B5EA7', border: 'rgba(123,94,167,0.4)' },
          { label: '🌾 Rural', color: '#00A651', border: 'rgba(0,166,81,0.4)' },
        ].map(m => (
          <div key={m.label} className="splash-module-chip"
            style={{ color: m.color, borderColor: m.border, background: m.border.replace('0.4', '0.1') }}>
            {m.label}
          </div>
        ))}
      </div>

      <div className="splash-loader">
        <div className="splash-loader-fill" />
      </div>

      <p className="splash-version">Ideathon 2025 · v1.0</p>

      <div style={{ marginTop: 40, display: 'flex', gap: 8, alignItems: 'center' }}>
        <div style={{ width: 24, height: 3, borderRadius: 2, background: '#FF9933' }} />
        <div style={{ width: 24, height: 3, borderRadius: 2, background: 'white' }} />
        <div style={{ width: 24, height: 3, borderRadius: 2, background: '#00A651' }} />
      </div>

      <p style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)', letterSpacing: 3, textTransform: 'uppercase' }}>
        Powered by AI4Bharat · LLaMA 3 · GPT-4
      </p>
    </div>
  )
}
