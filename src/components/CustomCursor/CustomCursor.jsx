import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import './CustomCursor.css';

const CustomCursor = () => {
  const location = useLocation();
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hoveringLink, setHoveringLink] = useState(false);
  const [hoveringText, setHoveringText] = useState(false);
  const [hoveringDisabled, setHoveringDisabled] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Disable cursor on /practice, /course, and /problems pages
  const isPracticePage = location.pathname.startsWith('/practice');
  const isCoursePage = location.pathname.startsWith('/course');
  const isProblemSolvePage = location.pathname.startsWith('/problems');
  const shouldDisableCursor = isPracticePage || isCoursePage || isProblemSolvePage;

  // Add data attribute to body for CSS targeting
  useEffect(() => {
    if (shouldDisableCursor) {
      document.body.setAttribute('data-practice-page', 'true');
    } else {
      document.body.removeAttribute('data-practice-page');
    }

    return () => {
      document.body.removeAttribute('data-practice-page');
    };
  }, [shouldDisableCursor]);

  useEffect(() => {
    // Check if device is touch-enabled
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleMouseOver = (e) => {
      const target = e.target;

      // EXCLUDE NO-CURSOR ELEMENTS
      if (target.classList.contains('no-cursor') || target.closest('.no-cursor')) {
        setHoveringLink(false);
        setHoveringText(false);
        setHoveringDisabled(false);
        return;
      }

      // CHECK FOR DISABLED BUTTONS
      const button = target.closest('button');
      if (button && button.disabled) {
        setHoveringDisabled(true);
        setHoveringLink(false);
        setHoveringText(false);
        return;
      }

      // LINKS (including course cards which are wrapped in <a>)
      const link = target.tagName.toLowerCase() === 'a' || target.closest('a');
      if (link) {
        setHoveringLink(true);
        setHoveringText(false);
        setHoveringDisabled(false);
      }
      // TEXT ELEMENTS (headings, paragraphs, spans)
      else {
        const textClasses = [
          'courses-title',
          'courses-desc',
          'courses-label',
          'subject-title',
          'subject-description',
          'course-card-title',
          'course-card-desc',
          'page-number',
          'dot'
        ];

        const isTextElement =
          target.tagName.toLowerCase() === 'h1' ||
          target.tagName.toLowerCase() === 'h2' ||
          target.tagName.toLowerCase() === 'h3' ||
          target.tagName.toLowerCase() === 'p' ||
          target.tagName.toLowerCase() === 'span' ||
          textClasses.some(c => target.classList.contains(c) || target.closest(`.${c}`));

        if (isTextElement) {
          setHoveringText(true);
          setHoveringLink(false);
          setHoveringDisabled(false);
        } else {
          setHoveringLink(false);
          setHoveringText(false);
          setHoveringDisabled(false);
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    // FIX FOR SELECTION CLEARING
    const handleMouseDown = (e) => {
      const style = window.getComputedStyle(e.target);
      if (style.userSelect === 'none') {
        window.getSelection().removeAllRanges();
      }
    };
    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [isVisible]);

  // Don't render cursor on practice/courses pages or touch devices
  if (isTouchDevice || !isVisible || shouldDisableCursor) return null;

  return (
    <div
      className={`custom-cursor ${hoveringLink ? 'hovering-link' : ''} ${hoveringText ? 'hovering-text' : ''
        } ${hoveringDisabled ? 'hovering-disabled' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    >
      {hoveringLink && (
        <ArrowUpRight className="cursor-arrow" strokeWidth={2.5} size={28} />
      )}
    </div>
  );
};

export default CustomCursor;
