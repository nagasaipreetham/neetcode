import './Folder.css';

const darkenColor = (hex, percent) => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex;
  if (color.length === 3) color = color.split('').map(c => c + c).join('');
  const num = parseInt(color, 16);
  let r = Math.max(0, Math.min(255, Math.floor(((num >> 16) & 0xff) * (1 - percent))));
  let g = Math.max(0, Math.min(255, Math.floor(((num >> 8)  & 0xff) * (1 - percent))));
  let b = Math.max(0, Math.min(255, Math.floor((num         & 0xff) * (1 - percent))));
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
};

/**
 * Animated folder icon.
 *
 * Props:
 *   color   — folder colour (default indigo)
 *   size    — scale multiplier (default 1)
 *   isOpen  — controlled open/closed state
 *   onClick — click handler (optional; parent controls state)
 */
const Folder = ({ color = '#5227FF', size = 1, isOpen = false, onClick, className = '' }) => {
  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor('#ffffff', 0.1);
  const paper2 = darkenColor('#ffffff', 0.05);
  const paper3 = '#ffffff';

  const folderStyle = {
    '--folder-color': color,
    '--folder-back-color': folderBackColor,
    '--paper-1': paper1,
    '--paper-2': paper2,
    '--paper-3': paper3,
  };

  const folderClassName = `folder ${isOpen ? 'open' : ''}`.trim();
  const scaleStyle = { transform: `scale(${size})`, transformOrigin: 'top left' };

  return (
    <div style={scaleStyle} className={className} onClick={onClick}>
      <div className={folderClassName} style={folderStyle}>
        <div className="folder__back">
          <div className="paper paper-1" />
          <div className="paper paper-2" />
          <div className="paper paper-3" />
          <div className="folder__front" />
          <div className="folder__front right" />
        </div>
      </div>
    </div>
  );
};

export default Folder;
