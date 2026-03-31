import viteLogo from '../../assets/vite.svg';
import StarBorder from '../StarBorder/StarBorder';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar-glass">
        <div className="navbar-left">
          <img src={viteLogo} className="logo" alt="Vite logo" />
          <ul className="nav-links">
            <li><a href="#" className="nav-link">courses</a></li>
            <li><a href="#" className="nav-link">practice</a></li>
            <li><a href="#" className="nav-link">roadmap</a></li>
          </ul>
        </div>
        
        <div className="navbar-right">
          <StarBorder
            as="button"
            className="navbar-btn"
            color="#ff00ff"
            speed="5s"
          >
            Go Pro
          </StarBorder>
          <StarBorder
            as="button"
            className="navbar-btn"
            color="#153be2ff"
            speed="5s"
          >
            Sign In
          </StarBorder>
        </div>
      </div>
    </nav>
  );
}
