import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { path: '/dashboard', icon: '🏠', label: 'Home' },
  { path: '/emergency', icon: '🚨', label: 'Emergency' },
  { path: '/rural', icon: '🌾', label: 'Rural' },
  { path: '/ngo', icon: '🤝', label: 'NGO Hub' },
  { path: '/supply', icon: '📦', label: 'Supply' },
]

export default function Navbar() {
  const location = useLocation()
  const hide = ['/', '/login'].includes(location.pathname)
  if (hide) return null

  return (
    <>
      {/* Top Bar */}
      <div className="navbar">
        <NavLink to="/dashboard" className="navbar-brand">
          <div className="navbar-logo">🇮🇳</div>
          <div>
            <div className="navbar-title">Smart India AI</div>
            <div className="navbar-subtitle">Ideathon 2025</div>
          </div>
        </NavLink>
        <div className="navbar-right">
          <div className="alert-dot" title="Active Alert" />
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,153,51,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
            border: '1px solid rgba(255,153,51,0.3)', cursor: 'pointer'
          }}>👤</div>
        </div>
      </div>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            id={`nav-${item.label.toLowerCase().replace(/\s+/g,'-')}`}
            className={({ isActive }) => `bottom-nav-item${isActive ? ' active' : ''}`}
          >
            {({ isActive }) => (
              <>
                <div className="nav-icon-wrap">
                  <span style={{ fontSize: isActive ? 20 : 18, transition: 'font-size 0.2s' }}>{item.icon}</span>
                </div>
                <span className="nav-label">{item.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
