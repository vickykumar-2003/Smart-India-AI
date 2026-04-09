import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { Home, AlertCircle, Users, Activity, Package, User } from 'lucide-react'
import SplashScreen from './screens/SplashScreen'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'
import EmergencyScreen from './screens/EmergencyScreen'
import RuralSupportScreen from './screens/RuralSupportScreen'
import NGOHubScreen from './screens/NGOHubScreen'
import SupplyChainScreen from './screens/SupplyChainScreen'

function BottomNav() {
  const location = useLocation()
  const path = location.pathname

  // Hide nav on Splash and Login
  if (path === '/' || path === '/login') return null

  const items = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/emergency', icon: AlertCircle, label: 'SOS', color: '#FF3B5C' },
    { path: '/rural', icon: Activity, label: 'Rural' },
    { path: '/ngo', icon: Users, label: 'NGO' },
    { path: '/supply', icon: Package, label: 'Supply' },
  ]

  return (
    <nav className="bottom-nav">
      {items.map((item) => {
        const Icon = item.icon
        const isActive = path === item.path
        return (
          <Link 
            key={item.path} 
            to={item.path} 
            className={`nav-item ${isActive ? 'active' : ''}`}
            style={{ color: isActive ? (item.color || 'var(--accent-primary)') : 'var(--text-muted)' }}
          >
            <Icon size={20} />
            <span className="nav-label">{item.label}</span>
            {isActive && <div className="nav-dot" style={{ background: item.color || 'var(--accent-primary)' }} />}
          </Link>
        )
      })}
    </nav>
  )
}

function App() {
  return (
    <div className="mobile-container">
      <div className="app-content">
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
          <Route path="/emergency" element={<EmergencyScreen />} />
          <Route path="/rural" element={<RuralSupportScreen />} />
          <Route path="/ngo" element={<NGOHubScreen />} />
          <Route path="/supply" element={<SupplyChainScreen />} />
        </Routes>
      </div>
      <BottomNav />
    </div>
  )
}

export default App
