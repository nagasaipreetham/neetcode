import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Bell, User } from 'lucide-react';
import neetcodeLogo from '../../../assets/neetcode-io-logo.png';
import './AuthNavbar.css';

export default function AuthNavbar({ theme, toggleTheme }) {
  const { pathname } = useLocation();
  const isPractice = pathname.startsWith('/practice');
  const isCourse   = pathname.startsWith('/courses');

  return (
    <nav className="auth-navbar">
      <div className="auth-navbar-left">
        <Link to="/" className="auth-nav-logo-link">
          <img src={neetcodeLogo} className="auth-nav-logo" alt="NeetCode" />
        </Link>
        <div className="auth-nav-links">
          <Link to="/courses?tab=courses" className={`auth-btn ${!isPractice && !isCourse ? '' : ''}`}>
            Course
          </Link>
          <Link to="/practice" className={`auth-btn ${isPractice ? 'active' : ''}`}>
            Practice
          </Link>
          <a href="https://neetcode.io/roadmap" target="_blank" rel="noreferrer" className="auth-btn">
            Roadmap
          </a>
        </div>
      </div>

      <div className="auth-navbar-right">
        <button className="auth-icon-btn" onClick={toggleTheme} aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button className="auth-icon-btn" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <Link to="/pro">
          <button className="auth-pro-btn">Go Pro</button>
        </Link>
        <button className="auth-icon-btn" aria-label="Profile">
          <User size={18} />
        </button>
      </div>
    </nav>
  );
}
