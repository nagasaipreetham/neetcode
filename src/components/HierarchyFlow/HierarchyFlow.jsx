import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './HierarchyFlow.css';

/* ─── Data ──────────────────────────────────────────────────── */
const tiers = [
  [{ id: 'arrays', label: 'Arrays & Hashing', unlocked: true }],
  [
    { id: 'twopointers', label: 'Two Pointers', unlocked: true },
    { id: 'stack',       label: 'Stack',        unlocked: true },
  ],
  [
    { id: 'linkedlist',   label: 'Linked List',    unlocked: true },
    { id: 'sliding',      label: 'Sliding Window', unlocked: true },
    { id: 'binarysearch', label: 'Binary Search',  unlocked: true },
  ],
  [{ id: 'trees', label: 'Trees', unlocked: true }],
  [
    { id: 'tries',        label: 'Tries',              unlocked: true },
    { id: 'heap',         label: 'Heap / Priority Q',  unlocked: true },
    { id: 'backtracking', label: 'Backtracking',        unlocked: true },
  ],
];

const edges = [
  ['arrays', 'twopointers'], ['arrays', 'stack'],
  ['twopointers', 'linkedlist'], ['twopointers', 'sliding'],
  ['stack', 'binarysearch'],
  ['linkedlist', 'trees'], ['sliding', 'trees'], ['binarysearch', 'trees'],
  ['trees', 'tries'], ['trees', 'heap'], ['trees', 'backtracking'],
];

/* stagger delay for entrance animation */
const allIds = tiers.flat().map(n => n.id);
const entryDelay = id => allIds.indexOf(id) * 0.12;

export default function HierarchyFlow() {
  const wrapRef  = useRef(null);
  const nodeRefs = useRef({});            // id → DOM element
  const [positions, setPositions] = useState({}); // id → { bx, by, tx, ty }
  const [active, setActive]       = useState(null);

  /* ─── Position calculator ─── */
  const recalc = useCallback(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const wr = wrap.getBoundingClientRect();
    const next = {};
    Object.entries(nodeRefs.current).forEach(([id, el]) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      next[id] = {
        bx: r.left - wr.left + r.width / 2,
        by: r.bottom - wr.top,
        tx: r.left - wr.left + r.width / 2,
        ty: r.top - wr.top,
      };
    });
    setPositions(next);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(recalc, 80);
    const t2 = setTimeout(recalc, 500);
    const t3 = setTimeout(recalc, 1500);
    window.addEventListener('resize', recalc);
    return () => {
      clearTimeout(t1); clearTimeout(t2); clearTimeout(t3);
      window.removeEventListener('resize', recalc);
    };
  }, [recalc]);

  /* ─── SVG path builder ─── */
  const buildPath = (fromId, toId) => {
    const a = positions[fromId];
    const b = positions[toId];
    if (!a || !b) return null;
    const cy = a.by + (b.ty - a.by) * 0.5;
    return `M ${a.bx} ${a.by} C ${a.bx} ${cy}, ${b.tx} ${cy}, ${b.tx} ${b.ty}`;
  };

  /* ─── Click handler ─── */
  const handleClick = id => {
    setActive(prev => (prev === id ? null : id));
  };

  return (
    <div ref={wrapRef} className="hf-wrap">
      {/* ── SVG connector layer ── */}
      <svg className="hf-svg" aria-hidden="true">
        {edges.map(([from, to], i) => {
          const d = buildPath(from, to);
          if (!d) return null;
          const lit = active === from || active === to;
          return (
            <path
              key={i}
              d={d}
              className={`hf-line${lit ? ' hf-line--lit' : ''}`}
            />
          );
        })}
      </svg>

      {/* ── Tier rows ── */}
      {tiers.map((row, ti) => (
        <div key={ti} className="hf-tier">
          {row.map(node => {
            const isActive   = active === node.id;
            const isAdjacent = active && edges.some(
              ([f, t]) => (f === active && t === node.id) || (t === active && f === node.id)
            );

            return (
              <motion.button
                key={node.id}
                ref={el => { nodeRefs.current[node.id] = el; }}
                className={[
                  'hf-node',
                  node.unlocked  ? 'hf-node--unlocked'  : '',
                  isActive       ? 'hf-node--active'     : '',
                  isAdjacent     ? 'hf-node--adjacent'   : '',
                ].join(' ')}
                onClick={() => handleClick(node.id)}
                onAnimationComplete={recalc}
                initial={{ opacity: 0, y: -10, scale: 0.88 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.38, delay: entryDelay(node.id), ease: 'easeOut' }}
                whileHover={{ scale: 1.045, transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.97 }}
              >
                {/* lock icon for locked nodes */}
                {!node.unlocked && (
                  <span className="hf-lock" aria-hidden="true">🔒</span>
                )}
                <span className="hf-label">{node.label}</span>
                {/* active glow blob */}
                {isActive && <span className="hf-active-blob" />}
              </motion.button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
