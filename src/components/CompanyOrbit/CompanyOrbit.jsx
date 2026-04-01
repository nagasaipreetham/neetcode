import { useEffect, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import googleLogo from '../../assets/google.png';
import metaLogo from '../../assets/meta.png';
import amazonLogo from '../../assets/amazon.png';
import microsoftLogo from '../../assets/microsoft.png';
import netflixLogo from '../../assets/netflix.png';
import chatgptLogo from '../../assets/chatgpt.png';
import claudeLogo from '../../assets/claude.png';
import './CompanyOrbit.css';

const companies = [
  { name: 'Google', logo: googleLogo, link: 'https://neetcode.io/practice/company/Googlem' },
  { name: 'Meta', logo: metaLogo, link: 'https://neetcode.io/practice/company/Meta' },
  { name: 'Amazon', logo: amazonLogo, link: 'https://neetcode.io/practice/company/Amazon' },
  { name: 'Microsoft', logo: microsoftLogo, link: 'https://neetcode.io/practice/company/Microsoft' },
  { name: 'Netflix', logo: netflixLogo, link: 'https://neetcode.io/practice/company/Netflix' },
  { name: 'ChatGPT', logo: chatgptLogo, link: 'https://neetcode.io/practice/company/OpenAI' },
  { name: 'Claude', logo: claudeLogo, link: 'https://neetcode.io/practice/company/Anthropic' }
];

const RADIUS = 260; // orbit radius in px
const AUTO_SPEED = 0.15; // degrees per frame

export default function CompanyOrbit() {
  const containerRef = useRef(null);
  const rotation = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartRotation = useRef(0);
  const velocityRef = useRef(AUTO_SPEED);

  // Auto-rotate
  useAnimationFrame(() => {
    if (isDragging) return;
    rotation.set(rotation.get() + velocityRef.current);
  });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartRotation.current = rotation.get();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStartX.current;
    // Convert horizontal drag to rotation (1px = 0.3 degrees)
    const rotationDelta = delta * 0.3;
    rotation.set(dragStartRotation.current + rotationDelta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    dragStartX.current = e.touches[0].clientX;
    dragStartRotation.current = rotation.get();
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStartX.current;
    const rotationDelta = delta * 0.3;
    rotation.set(dragStartRotation.current + rotationDelta);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging]);

  return (
    <section className="company-orbit-section">
      <h2 className="orbit-heading">
        Trusted by engineers who landed offers at top companies
      </h2>

      <div
        ref={containerRef}
        className="orbit-container"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <motion.div
          className="orbit-ring"
          style={{
            rotateY: rotation
          }}
        >
          {companies.map((company, index) => {
            // Distribute 7 items evenly around 360 degrees
            const angle = (360 / companies.length) * index;
            const angleRad = (angle * Math.PI) / 180;
            const x = Math.sin(angleRad) * RADIUS;
            const z = Math.cos(angleRad) * RADIUS;

            return (
              <div
                key={company.name}
                className="company-logo-item"
                style={{
                  transform: `translate3d(${x}px, 0, ${z}px) rotateY(${angle}deg)`
                }}
              >
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="company-logo-btn"
                >
                  <img src={company.logo} alt={company.name} />
                </a>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
