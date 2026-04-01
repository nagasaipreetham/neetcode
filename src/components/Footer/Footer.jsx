import { Link } from 'react-router-dom';
import './Footer.css';

function YouTubeIcon() {
  return (
    <svg className="footer-social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="footer-social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="footer-social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <>
      <div className="footer-partition" />
      <footer className="footer">
        <div className="footer-inner">

          {/* ── Top row ── */}
          <div className="footer-top">

            {/* Links */}
            <div className="footer-col">
              <div className="footer-col-heading">Links</div>
              <div className="footer-links">
                <a href="https://neetcode.io/practice/practice/blind75" target="_blank" rel="noreferrer" className="footer-link">Blind 75</a>
                <a href="https://neetcode.io/practice/practice/neetcode150" target="_blank" rel="noreferrer" className="footer-link">NeetCode 150</a>
                <a href="https://neetcode.io/practice/practice/neetcode250" target="_blank" rel="noreferrer" className="footer-link">NeetCode 250</a>
                <a href="https://neetcode.io/courses/lessons/how-to-use-neetcode-effectively" target="_blank" rel="noreferrer" className="footer-link">How to use NeetCode Effectively</a>
              </div>
            </div>

            {/* Social */}
            <div className="footer-col">
              <div className="footer-col-heading">Social</div>
              <div className="footer-links">
                <a href="https://www.youtube.com/c/neetcode" target="_blank" rel="noreferrer" className="footer-social-link">
                  <YouTubeIcon />
                  YouTube
                </a>
                <a href="https://www.linkedin.com/in/navdeep-singh-3aaa14161/" target="_blank" rel="noreferrer" className="footer-social-link">
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <a href="https://x.com/neetcode1" target="_blank" rel="noreferrer" className="footer-social-link">
                  <XIcon />
                  X (Twitter)
                </a>
              </div>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <div className="footer-col-heading">Contact</div>
              <span className="footer-contact-email">support@neetcode.io</span>
            </div>

            {/* Legal */}
            <div className="footer-col">
              <div className="footer-col-heading">Legal</div>
              <div className="footer-links">
                <Link to="/privacy" className="footer-link footer-link--legal">Privacy Policy</Link>
                <Link to="/terms" className="footer-link footer-link--legal">Terms of Service</Link>
              </div>
            </div>

          </div>

          {/* ── Bottom row ── */}
          <div className="footer-bottom">
            <span className="footer-copyright">
              Copyright © 2026 neetcode.io All rights reserved.
            </span>
          </div>

        </div>
      </footer>
    </>
  );
}
