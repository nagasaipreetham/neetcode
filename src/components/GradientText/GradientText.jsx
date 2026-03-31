import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B19EEF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true,
  style = {}
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);
  const animationDuration = animationSpeed * 1000;

  useAnimationFrame(time => {
    if (isPaused) { lastTimeRef.current = null; return; }
    if (lastTimeRef.current === null) { lastTimeRef.current = time; return; }
    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;
      progress.set(cycleTime < animationDuration
        ? (cycleTime / animationDuration) * 100
        : 100 - ((cycleTime - animationDuration) / animationDuration) * 100
      );
    } else {
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, progress, yoyo]);

  const gradientAngle =
    direction === 'vertical' ? 'to bottom' :
    direction === 'diagonal' ? 'to bottom right' : 'to right';

  const bgSize =
    direction === 'vertical' ? '100% 300%' :
    direction === 'diagonal' ? '300% 300%' : '300% 100%';

  const backgroundPosition = useTransform(progress, p =>
    direction === 'vertical' ? `50% ${p}%` : `${p}% 50%`
  );

  const gradientColors = [...colors, colors[0]].join(', ');
  const gradientStyle = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize: bgSize,
    backgroundRepeat: 'repeat'
  };

  const handleMouseEnter = useCallback(() => { if (pauseOnHover) setIsPaused(true); }, [pauseOnHover]);
  const handleMouseLeave = useCallback(() => { if (pauseOnHover) setIsPaused(false); }, [pauseOnHover]);

  return (
    <motion.div
      className={className}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 500,
        overflow: 'hidden',
        cursor: 'default',
        ...(showBorder ? { padding: '4px 8px', borderRadius: '1.25rem' } : {}),
        ...style
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            borderRadius: 'inherit',
            ...gradientStyle,
            backgroundPosition
          }}
        >
          <div style={{
            position: 'absolute',
            background: '#000',
            borderRadius: 'inherit',
            zIndex: -1,
            width: 'calc(100% - 2px)',
            height: 'calc(100% - 2px)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }} />
        </motion.div>
      )}
      <motion.span
        style={{
          position: 'relative',
          zIndex: 2,
          color: 'transparent',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          ...gradientStyle,
          backgroundPosition
        }}
      >
        {children}
      </motion.span>
    </motion.div>
  );
}
