import { Link } from 'react-router-dom';
import FuzzyText from '../components/FuzzyText/FuzzyText';
import Navbar from '../components/Navbar/Navbar';
import './NotFound.css';

export default function NotFound() {
  return (
    <div className="notfound-page">
      <Navbar />
      <div className="notfound-content">
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          clickEffect
          color="#fff"
          fontSize="clamp(6rem, 20vw, 14rem)"
          fontWeight={900}
        >
          404
        </FuzzyText>
        <FuzzyText
          baseIntensity={0.2}
          hoverIntensity={0.5}
          enableHover
          clickEffect
          color="#fff"
          fontSize="clamp(4rem, 10vw, 1rem)"
          fontWeight={800}
        >
          Not Found
        </FuzzyText>
        <p className="notfound-msg">This page doesn't exist.</p>
        <Link to="/" className="notfound-link">← Back to Home</Link>
      </div>
    </div>
  );
}
