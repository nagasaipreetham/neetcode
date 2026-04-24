import { useState, useEffect, useRef, createContext, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AuthNavbar from './components/Navbar/AuthNavbar';
import AuthFooter from './components/Footer/AuthFooter';
import './AuthLayout.css';

// Create theme context
export const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeContext.Provider');
  }
  return context;
};

export default function AuthLayout() {
  const location = useLocation();
  const [theme, setTheme] = useState('dark');
  const [navHidden, setNavHidden] = useState(false);
  const lastY = useRef(0);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  // Check if we're on the problem solve page
  const isProblemSolvePage = location.pathname.startsWith('/problems/');

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (y > lastY.current && y > 64) setNavHidden(true);
      else if (y < lastY.current) setNavHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="auth-root" data-theme={theme} data-nav-hidden={navHidden ? 'true' : 'false'}>
        {!isProblemSolvePage && <AuthNavbar theme={theme} toggleTheme={toggleTheme} />}
        <div className="auth-content">
          <Outlet />
        </div>
        {!isProblemSolvePage && <AuthFooter />}
      </div>
    </ThemeContext.Provider>
  );
}
