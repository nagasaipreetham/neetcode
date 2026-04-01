import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import viteLogo from '../../assets/vite.svg';
import StarBorder from '../StarBorder/StarBorder';
import './Navbar.css';

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const glassRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const tlRef = useRef(null);
  const signInRef = useRef(null);
  const signInBtnRef = useRef(null);

  // GSAP timeline for mobile expand
  useLayoutEffect(() => {
    const glass = glassRef.current;
    const menu = mobileMenuRef.current;
    if (!glass || !menu) return;
    gsap.set(glass, { borderRadius: '100px' });
    gsap.set(menu, { opacity: 0, y: -8, pointerEvents: 'none', display: 'none' });
    const tl = gsap.timeline({ paused: true });
    tl.to(glass, { borderRadius: '20px', duration: 0.25, ease: 'power2.out' })
      .set(menu, { display: 'flex' })
      .to(menu, { opacity: 1, y: 0, duration: 0.22, ease: 'power2.out', pointerEvents: 'auto' }, '-=0.1');
    tlRef.current = tl;
    return () => tl.kill();
  }, []);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!menuOpen) { tl.play(); setMenuOpen(true); }
    else {
      tl.reverse().then(() => gsap.set(mobileMenuRef.current, { display: 'none' }));
      setMenuOpen(false);
    }
  };

  // Close sign-in popup on outside click
  useEffect(() => {
    if (!signInOpen) return;
    const handler = (e) => {
      if (
        signInRef.current && !signInRef.current.contains(e.target) &&
        signInBtnRef.current && !signInBtnRef.current.contains(e.target)
      ) {
        setSignInOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [signInOpen]);

  return (
    <nav className="navbar-container">
      <div ref={glassRef} className="navbar-glass">

        {/* Top bar */}
        <div className="navbar-top-bar">
          <div className="navbar-left">
            <Link to="/"><img src={viteLogo} className="logo" alt="NeetCode" /></Link>
            {/* Hamburger — right of logo, mobile only */}
            <button className="navbar-hamburger" onClick={toggleMenu} aria-label="Toggle menu">
              <span className={`hamburger-line${menuOpen ? ' hamburger-line--top-open' : ''}`} />
              <span className={`hamburger-line${menuOpen ? ' hamburger-line--bot-open' : ''}`} />
            </button>
            <ul className="nav-links">
              <li><Link to="/courses?tab=courses" className="nav-link">courses</Link></li>
              <li><a href="https://neetcode.io/practice/practice/neetcode250" target="_blank" rel="noreferrer" className="nav-link">practice</a></li>
              <li><a href="https://neetcode.io/roadmap" target="_blank" rel="noreferrer" className="nav-link">roadmap</a></li>
            </ul>
          </div>

          <div className="navbar-right">
            <Link to="/pro">
              <StarBorder as="button" className="navbar-btn" color="#ff00ff" speed="5s">Go Pro</StarBorder>
            </Link>

            {/* Sign In with popup */}
            <div className="signin-wrap">
              <div ref={signInBtnRef} onClick={() => setSignInOpen(v => !v)}>
                <StarBorder as="button" className="navbar-btn" color="#153be2ff" speed="5s">Sign In</StarBorder>
              </div>
              {signInOpen && (
                <div ref={signInRef} className="signin-popup">
                  <p className="signin-popup-label">Sign In with</p>
                  <button className="signin-option">
                    <GoogleIcon /> Google
                  </button>
                  <button className="signin-option">
                    <GitHubIcon /> GitHub
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile expanded menu — single row, clipped to glass */}
        <div className="navbar-mobile-clip">
          <div ref={mobileMenuRef} className="navbar-mobile-menu">
            <Link to="/courses?tab=courses" className="nav-link mobile-nav-link" onClick={toggleMenu}>courses</Link>
            <a href="https://neetcode.io/practice/practice/neetcode250" target="_blank" rel="noreferrer" className="nav-link mobile-nav-link" onClick={toggleMenu}>practice</a>
            <a href="https://neetcode.io/roadmap" target="_blank" rel="noreferrer" className="nav-link mobile-nav-link" onClick={toggleMenu}>roadmap</a>
          </div>
        </div>

      </div>
    </nav>
  );
}
