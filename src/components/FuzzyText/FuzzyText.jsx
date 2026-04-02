import React, { useEffect, useRef } from 'react';

const FuzzyText = ({
  children,
  fontSize = 'clamp(2rem, 10vw, 10rem)',
  fontWeight = 900,
  fontFamily = 'inherit',
  color = '#fff',
  enableHover = true,
  baseIntensity = 0.18,
  hoverIntensity = 0.5,
  fuzzRange = 30,
  fps = 60,
  direction = 'horizontal',
  transitionDuration = 0,
  clickEffect = false,
  glitchMode = false,
  glitchInterval = 2000,
  glitchDuration = 200,
  gradient = null,
  letterSpacing = 0,
  className = ''
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationFrameId;
    let isCancelled = false;
    let glitchTimeoutId;
    let glitchEndTimeoutId;
    let clickTimeoutId;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const init = async () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const computedFontFamily = fontFamily === 'inherit'
        ? window.getComputedStyle(canvas).fontFamily || 'sans-serif'
        : fontFamily;
      const fontSizeStr = typeof fontSize === 'number' ? `${fontSize}px` : fontSize;
      const fontString = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;

      try { await document.fonts.load(fontString); } catch { await document.fonts.ready; }
      if (isCancelled) return;

      let numericFontSize;
      if (typeof fontSize === 'number') {
        numericFontSize = fontSize;
      } else {
        const temp = document.createElement('span');
        temp.style.fontSize = fontSize;
        document.body.appendChild(temp);
        numericFontSize = parseFloat(window.getComputedStyle(temp).fontSize);
        document.body.removeChild(temp);
      }

      const text = React.Children.toArray(children).join('');
      const offscreen = document.createElement('canvas');
      const offCtx = offscreen.getContext('2d');
      if (!offCtx) return;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      let totalWidth = 0;
      if (letterSpacing !== 0) {
        for (const char of text) totalWidth += offCtx.measureText(char).width + letterSpacing;
        totalWidth -= letterSpacing;
      } else {
        totalWidth = offCtx.measureText(text).width;
      }

      const metrics = offCtx.measureText(text);
      const actualLeft = metrics.actualBoundingBoxLeft ?? 0;
      const actualRight = letterSpacing !== 0 ? totalWidth : (metrics.actualBoundingBoxRight ?? metrics.width);
      const actualAscent = metrics.actualBoundingBoxAscent ?? numericFontSize;
      const actualDescent = metrics.actualBoundingBoxDescent ?? numericFontSize * 0.2;
      const textBoundingWidth = Math.ceil(letterSpacing !== 0 ? totalWidth : actualLeft + actualRight);
      const tightHeight = Math.ceil(actualAscent + actualDescent);
      const extraWidthBuffer = 10;
      const offscreenWidth = textBoundingWidth + extraWidthBuffer;

      offscreen.width = offscreenWidth;
      offscreen.height = tightHeight;
      const xOffset = extraWidthBuffer / 2;

      offCtx.font = `${fontWeight} ${fontSizeStr} ${computedFontFamily}`;
      offCtx.textBaseline = 'alphabetic';

      if (gradient && Array.isArray(gradient) && gradient.length >= 2) {
        const grad = offCtx.createLinearGradient(0, 0, offscreenWidth, 0);
        gradient.forEach((c, i) => grad.addColorStop(i / (gradient.length - 1), c));
        offCtx.fillStyle = grad;
      } else {
        offCtx.fillStyle = color;
      }

      if (letterSpacing !== 0) {
        let xPos = xOffset;
        for (const char of text) {
          offCtx.fillText(char, xPos, actualAscent);
          xPos += offCtx.measureText(char).width + letterSpacing;
        }
      } else {
        offCtx.fillText(text, xOffset - actualLeft, actualAscent);
      }

      const horizontalMargin = fuzzRange + 20;
      const verticalMargin = direction === 'vertical' || direction === 'both' ? fuzzRange + 10 : 0;
      canvas.width = offscreenWidth + horizontalMargin * 2;
      canvas.height = tightHeight + verticalMargin * 2;
      ctx.translate(horizontalMargin, verticalMargin);

      const interactiveLeft = horizontalMargin + xOffset;
      const interactiveTop = verticalMargin;
      const interactiveRight = interactiveLeft + textBoundingWidth;
      const interactiveBottom = interactiveTop + tightHeight;

      let isHovering = false, isClicking = false, isGlitching = false;
      let currentIntensity = baseIntensity, targetIntensity = baseIntensity;
      let lastFrameTime = 0;
      const frameDuration = 1000 / fps;

      const startGlitchLoop = () => {
        if (!glitchMode || isCancelled) return;
        glitchTimeoutId = setTimeout(() => {
          if (isCancelled) return;
          isGlitching = true;
          glitchEndTimeoutId = setTimeout(() => { isGlitching = false; startGlitchLoop(); }, glitchDuration);
        }, glitchInterval);
      };
      if (glitchMode) startGlitchLoop();

      const run = timestamp => {
        if (isCancelled) return;
        if (timestamp - lastFrameTime < frameDuration) { animationFrameId = requestAnimationFrame(run); return; }
        lastFrameTime = timestamp;
        ctx.clearRect(-fuzzRange - 20, -fuzzRange - 10, offscreenWidth + 2 * (fuzzRange + 20), tightHeight + 2 * (fuzzRange + 10));

        if (isClicking || isGlitching) targetIntensity = 1;
        else if (isHovering) targetIntensity = hoverIntensity;
        else targetIntensity = baseIntensity;

        if (transitionDuration > 0) {
          const step = 1 / (transitionDuration / frameDuration);
          currentIntensity = currentIntensity < targetIntensity
            ? Math.min(currentIntensity + step, targetIntensity)
            : Math.max(currentIntensity - step, targetIntensity);
        } else {
          currentIntensity = targetIntensity;
        }

        for (let j = 0; j < tightHeight; j++) {
          let dx = 0, dy = 0;
          if (direction === 'horizontal' || direction === 'both') dx = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange);
          if (direction === 'vertical' || direction === 'both') dy = Math.floor(currentIntensity * (Math.random() - 0.5) * fuzzRange * 0.5);
          ctx.drawImage(offscreen, 0, j, offscreenWidth, 1, dx, j + dy, offscreenWidth, 1);
        }
        animationFrameId = requestAnimationFrame(run);
      };
      animationFrameId = requestAnimationFrame(run);

      const isInside = (x, y) => x >= interactiveLeft && x <= interactiveRight && y >= interactiveTop && y <= interactiveBottom;
      const onMove = e => { if (!enableHover) return; const r = canvas.getBoundingClientRect(); isHovering = isInside(e.clientX - r.left, e.clientY - r.top); };
      const onLeave = () => { isHovering = false; };
      const onClick = () => { if (!clickEffect) return; isClicking = true; clearTimeout(clickTimeoutId); clickTimeoutId = setTimeout(() => { isClicking = false; }, 150); };
      const onTouchMove = e => { if (!enableHover) return; e.preventDefault(); const r = canvas.getBoundingClientRect(); const t = e.touches[0]; isHovering = isInside(t.clientX - r.left, t.clientY - r.top); };
      const onTouchEnd = () => { isHovering = false; };

      if (enableHover) { canvas.addEventListener('mousemove', onMove); canvas.addEventListener('mouseleave', onLeave); canvas.addEventListener('touchmove', onTouchMove, { passive: false }); canvas.addEventListener('touchend', onTouchEnd); }
      if (clickEffect) canvas.addEventListener('click', onClick);

      canvas._fuzzyCleanup = () => {
        cancelAnimationFrame(animationFrameId);
        clearTimeout(glitchTimeoutId); clearTimeout(glitchEndTimeoutId); clearTimeout(clickTimeoutId);
        if (enableHover) { canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mouseleave', onLeave); canvas.removeEventListener('touchmove', onTouchMove); canvas.removeEventListener('touchend', onTouchEnd); }
        if (clickEffect) canvas.removeEventListener('click', onClick);
      };
    };

    init();
    return () => {
      isCancelled = true;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(glitchTimeoutId); clearTimeout(glitchEndTimeoutId); clearTimeout(clickTimeoutId);
      if (canvas._fuzzyCleanup) canvas._fuzzyCleanup();
    };
  }, [children, fontSize, fontWeight, fontFamily, color, enableHover, baseIntensity, hoverIntensity, fuzzRange, fps, direction, transitionDuration, clickEffect, glitchMode, glitchInterval, glitchDuration, gradient, letterSpacing]);

  return <canvas ref={canvasRef} className={className} />;
};

export default FuzzyText;
