import { motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import './HierarchyFlow.css';

const hierarchy = [
  { level: 0, nodes: ['Arrays & Hashing'] },
  { level: 1, nodes: ['Two Pointers', 'Stack'] },
  { level: 2, nodes: ['Linked List', 'Sliding Window', 'Binary Search'] },
  { level: 3, nodes: ['Trees'] },
  { level: 4, nodes: ['Tries', 'Heap / Priority Queue', 'Backtracking'] }
];

const connections = [
  { from: [0, 0], to: [1, 0] },
  { from: [0, 0], to: [1, 1] },
  { from: [1, 0], to: [2, 0] },
  { from: [1, 0], to: [2, 1] },
  { from: [1, 0], to: [2, 2] },
  { from: [2, 0], to: [3, 0] },
  { from: [2, 1], to: [3, 0] },
  { from: [2, 2], to: [3, 0] },
  { from: [3, 0], to: [4, 0] },
  { from: [3, 0], to: [4, 1] },
  { from: [3, 0], to: [4, 2] }
];

const ARROW_SIZE = 7; // arrowhead height in px

const getKey = (level, index) => `${level}-${index}`;
const allKeys = hierarchy.flatMap(l => l.nodes.map((_, i) => getKey(l.level, i)));
const getDelay = (key) => allKeys.indexOf(key) * 0.18;

export default function HierarchyFlow() {
  const [positions, setPositions] = useState({});
  const containerRef = useRef(null);
  const nodeRefs = useRef({});

  const recalc = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const cr = container.getBoundingClientRect();
    const next = {};
    Object.entries(nodeRefs.current).forEach(([key, el]) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next[key] = {
        bottomX: r.left - cr.left + r.width / 2,
        bottomY: r.bottom - cr.top,
        topX:    r.left - cr.left + r.width / 2,
        topY:    r.top - cr.top,
      };
    });
    setPositions(next);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(recalc, 80);
    const t2 = setTimeout(recalc, 600);
    const t3 = setTimeout(recalc, 1800);
    window.addEventListener('resize', recalc);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener('resize', recalc);
    };
  }, [recalc]);

  const buildPath = (fk, tk) => {
    const a = positions[fk];
    const b = positions[tk];
    if (!a || !b) return null;
    const sx = a.bottomX, sy = a.bottomY;
    const ex = b.topX;
    // Path ends exactly where arrowhead base starts
    const ey = b.topY - ARROW_SIZE;
    const cy = sy + (ey - sy) * 0.5;
    return `M ${sx} ${sy} C ${sx} ${cy}, ${ex} ${cy}, ${ex} ${ey}`;
  };

  // Arrowhead: base at topY - ARROW_SIZE, tip at topY
  const buildArrow = (tk) => {
    const b = positions[tk];
    if (!b) return null;
    const x = b.topX;
    const tip = b.topY;
    const base = tip - ARROW_SIZE;
    return `${x - 5},${base} ${x + 5},${base} ${x},${tip}`;
  };

  return (
    <div ref={containerRef} className="hierarchy-flow">
      <svg className="hierarchy-svg">
        {connections.map((conn, i) => {
          const fk   = getKey(conn.from[0], conn.from[1]);
          const tk   = getKey(conn.to[0],   conn.to[1]);
          const path = buildPath(fk, tk);
          const arr  = buildArrow(tk);
          const d    = Math.max(0, getDelay(tk) - 0.22);
          if (!path) return null;
          return (
            <g key={i}>
              <motion.path
                className="hierarchy-arrow"
                d={path}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: d, ease: 'easeInOut' }}
              />
              {arr && (
                <motion.polygon
                  className="hierarchy-arrow-head"
                  points={arr}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, delay: d + 0.38 }}
                />
              )}
            </g>
          );
        })}
      </svg>

      {hierarchy.map((levelData) => (
        <div key={levelData.level} className="hierarchy-level">
          {levelData.nodes.map((name, index) => {
            const key   = getKey(levelData.level, index);
            const delay = getDelay(key);
            return (
              <motion.div
                key={key}
                ref={el => { nodeRefs.current[key] = el; }}
                className="hierarchy-node"
                initial={{ opacity: 0, scale: 0.82, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.35, delay, ease: 'easeOut' }}
                onAnimationComplete={recalc}
              >
                <div className="h-node-btn">
                  <div className="h-node-glow" />
                  <span className="h-node-label">{name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
