import { Link } from 'react-router-dom';
import viteLogo from '../../assets/vite.svg';
import StarBorder from '../StarBorder/StarBorder';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-glass">
        <div className="navbar-left">
          <Link to="/"><img src={viteLogo} className="logo" alt="NeetCode" /></Link>
          <ul className="nav-links">
            <li><Link to="/courses?tab=courses" className="nav-link">courses</Link></li>
            <li><a href="https://neetcode.io/practice/practice/neetcode250" target="_blank" rel="noreferrer" className="nav-link">practice</a></li>
            <li><a href="https://neetcode.io/roadmap" target="_blank" rel="noreferrer" className="nav-link">roadmap</a></li>
          </ul>
        </div>
        <div className="navbar-right">
          <StarBorder as="button" className="navbar-btn" color="#ff00ff" speed="5s">Go Pro</StarBorder>
          <StarBorder as="button" className="navbar-btn" color="#153be2ff" speed="5s">Sign In</StarBorder>
        </div>
      </div>
    </nav>
  );
}
