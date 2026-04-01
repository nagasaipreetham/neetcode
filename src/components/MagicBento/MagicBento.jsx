import { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import videoCameraIcon from '../../assets/video-camera.svg';
import codeIcon from '../../assets/code.svg';
import penIcon from '../../assets/pen.svg';
import computerIcon from '../../assets/computer-coding.svg';
import botIcon from '../../assets/bot.svg';
import magicIcon from '../../assets/magic.svg';
import buildingIcon from '../../assets/building.svg';
import cloudIcon from '../../assets/cloud.svg';
import './MagicBento.css';

const cardData = [
  { icon: videoCameraIcon, label: '200+ Videos',       title: 'Video Courses',            description: 'Learn from hours of in-depth video content covering data structures, algorithms, system design, and more. Each concept is explained clearly with visual animations and real coding examples.' },
  { icon: codeIcon,        label: '300+ Problems',     title: 'Practice Problems',        description: 'Solve curated problems directly in your browser with our built-in code editor. Get instant feedback, run test cases, and track your progress as you work through the NeetCode 150 and beyond.' },
  { icon: penIcon,         label: 'Detailed Articles', title: 'Written Guides',           description: 'Comprehensive articles that break down each topic with diagrams, code snippets, and step-by-step explanations. Perfect for review or when you prefer reading over watching.' },
  { icon: computerIcon,    label: '8 Languages',       title: 'Code Solutions',           description: 'View optimized solutions in 8 programming languages side by side. Understand the nuances of each language and pick the one that fits your interview.' },
  { icon: botIcon,         label: 'NeetBot',           title: 'NeetBot Assistant',        description: 'Chat directly with NeetBot while solving problems to ask questions, get feedback and generate visual walkthroughs when you want to see your approach step-by-step.' },
  { icon: magicIcon,       label: 'AI Powered',        title: 'AI Hints & Debug',         description: 'Stuck on a problem? Get intelligent hints that guide you toward the solution without giving it away. Debug your code with AI analysis that explains what went wrong.' },
  { icon: buildingIcon,    label: '100+ Companies',    title: 'Company Tagged Problems',  description: 'Know which companies ask which questions. Filter problems by company tags to focus your prep on the exact questions asked at your target companies.' },
  { icon: cloudIcon,       label: 'Cross-Device',      title: 'Cloud Sync',               description: 'Your code is automatically saved to the cloud. Switch between devices and pick up right where you left off. Never lose your progress again.' },
];

function BentoCard({ data, glowColor, disableAnimations }) {
  const cardRef = useRef(null);
  const spotlightRef = useRef(null);
  const particlesRef = useRef([]);

  const spawnParticles = useCallback(() => {
    const card = cardRef.current;
    if (!card || disableAnimations) return;
    const { width, height } = card.getBoundingClientRect();
    for (let i = 0; i < 12; i++) {
      setTimeout(() => {
        if (!cardRef.current) return;
        const p = document.createElement('div');
        p.className = 'bento-particle';
        p.style.cssText = `left:${Math.random()*width}px;top:${Math.random()*height}px;background:rgba(${glowColor},1);box-shadow:0 0 6px rgba(${glowColor},0.6);`;
        card.appendChild(p);
        particlesRef.current.push(p);
        gsap.fromTo(p, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(p, { x: (Math.random()-0.5)*80, y: (Math.random()-0.5)*80, rotation: Math.random()*360, duration: 2+Math.random()*2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(p, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, i * 80);
    }
  }, [glowColor, disableAnimations]);

  const clearParticles = useCallback(() => {
    particlesRef.current.forEach(p => {
      gsap.to(p, { scale: 0, opacity: 0, duration: 0.25, onComplete: () => p.remove() });
    });
    particlesRef.current = [];
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--glow-x', `${x}%`);
      card.style.setProperty('--glow-y', `${y}%`);
      card.style.setProperty('--glow-intensity', '1');
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(400px circle at ${x}% ${y}%, rgba(${glowColor},0.1) 0%, transparent 70%)`;
        spotlightRef.current.style.opacity = '1';
      }
      // tilt
      if (!disableAnimations) {
        const cx = rect.width / 2, cy = rect.height / 2;
        const rx = ((e.clientY - rect.top) - cy) / cy * -8;
        const ry = ((e.clientX - rect.left) - cx) / cx * 8;
        gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.15, ease: 'power2.out', transformPerspective: 800 });
      }
    };

    const onEnter = () => spawnParticles();

    const onLeave = () => {
      card.style.setProperty('--glow-intensity', '0');
      if (spotlightRef.current) spotlightRef.current.style.opacity = '0';
      clearParticles();
      if (!disableAnimations) {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.4, ease: 'power2.out' });
      }
    };

    const onClick = e => {
      if (disableAnimations) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxD = Math.max(Math.hypot(x,y), Math.hypot(x-rect.width,y), Math.hypot(x,y-rect.height), Math.hypot(x-rect.width,y-rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${maxD*2}px;height:${maxD*2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.35) 0%,rgba(${glowColor},0.15) 30%,transparent 70%);left:${x-maxD}px;top:${y-maxD}px;pointer-events:none;z-index:1000;`;
      card.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseenter', onEnter);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('click', onClick);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseenter', onEnter);
      card.removeEventListener('mouseleave', onLeave);
      card.removeEventListener('click', onClick);
    };
  }, [spawnParticles, clearParticles, glowColor, disableAnimations]);

  return (
    <div ref={cardRef} className="bento-card">
      <div ref={spotlightRef} className="bento-card-spotlight" />
      <div className="bento-card-content">
        <div className="bento-card-header">
          <div className="bento-card-icon-box">
            <img src={data.icon} alt={data.title} />
          </div>
          <div className="bento-card-text">
            <h3 className="bento-card-title">{data.title}</h3>
            <p className="bento-card-label">{data.label}</p>
          </div>
        </div>
        <p className="bento-card-desc">{data.description}</p>
      </div>
    </div>
  );
}

export default function MagicBento({
  glowColor = '132, 0, 255',
  disableAnimations = false,
}) {
  return (
    <div className="bento-wrapper">
      <div className="bento-grid">
        {cardData.map((card, i) => (
          <BentoCard key={i} data={card} glowColor={glowColor} disableAnimations={disableAnimations} />
        ))}
      </div>
    </div>
  );
}
