import { useState, useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import AuthNavbar from './components/Navbar/AuthNavbar';
import AuthFooter from './components/Footer/AuthFooter';
import './AuthLayout.css';

export default function AuthLayout() {
  const [theme,     setTheme]     = useState('dark');
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 64) setNavHidden(true);
      else if (y < lastY.current)      setNavHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="auth-root" data-theme={theme} data-nav-hidden={navHidden ? 'true' : 'false'}>
      <AuthNavbar theme={theme} toggleTheme={toggleTheme} />
      <div className="auth-content">
        <Outlet />
      </div>
      {/* Footer sits below the 3-column grid — sidebars scroll away naturally */}
      <AuthFooter />
    </div>
  );
}
