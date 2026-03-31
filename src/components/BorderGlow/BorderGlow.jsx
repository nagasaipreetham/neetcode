import { useRef, useCallback } from 'react';
import './BorderGlow.css';

function parseHSL(str) {
  const m = str.match(/([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?/);
  if (!m) return { h: 40, s: 80, l: 80 };
  return { h: parseFloat(m[1]), s: parseFloat(m[2]), l: parseFloat(m[3]) };
}

function buildGlowVars(glowColor, intensity) {
  const { h, s, l } = parseHSL(glowColor);
  const base = `${h}deg ${s}% ${l}%`;
  return {
    '--glow-color':    `hsl(${base} / ${Math.min(100 * intensity, 100)}%)`,
    '--glow-color-50': `hsl(${base} / ${Math.min(50  * intensity, 100)}%)`,
    '--glow-color-40': `hsl(${base} / ${Math.min(40  * intensity, 100)}%)`,
    '--glow-color-30': `hsl(${base} / ${Math.min(30  * intensity, 100)}%)`,
    '--glow-color-20': `hsl(${base} / ${Math.min(20  * intensity, 100)}%)`,
  };
}

function buildGradientVars(colors) {
  const c = (i) => colors[Math.min(i, colors.length - 1)];
  return {
    '--gradient-one':   `radial-gradient(at 80% 20%, ${c(0)} 0px, transparent 60%)`,
    '--gradient-two':   `radial-gradient(at 20% 80%, ${c(1)} 0px, transparent 60%)`,
    '--gradient-three': `radial-gradient(at 50% 50%, ${c(2)} 0px, transparent 60%)`,
    '--gradient-base':  `linear-gradient(${c(0)} 0 100%)`,
  };
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 0,
  glowColor = '40 80 80',
  backgroundColor = 'rgba(0,0,0,0.4)',
  borderRadius = 16,
  glowRadius = 63,
  glowIntensity = 1,
  coneSpread = 25,
  colors = ['#c084fc', '#f472b6', '#38bdf8'],
}) {
  const cardRef = useRef(null);

  const getCenterOfElement = useCallback((el) => {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const getEdgeProximity = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx, dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }, [getCenterOfElement]);

  const getCursorAngle = useCallback((el, x, y) => {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx, dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    let deg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    return deg;
  }, [getCenterOfElement]);

  const handlePointerMove = useCallback((e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--edge-proximity', (getEdgeProximity(card, x, y) * 100).toFixed(3));
    card.style.setProperty('--cursor-angle', `${getCursorAngle(card, x, y).toFixed(3)}deg`);
  }, [getEdgeProximity, getCursorAngle]);

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card ${className}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        ...buildGlowVars(glowColor, glowIntensity),
        ...buildGradientVars(colors),
      }}
    >
      <span className="edge-light" />
      <div className="border-glow-inner">
        {children}
      </div>
    </div>
  );
}
