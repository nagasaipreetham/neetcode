import './CourseCard.css';

const difficultyClass = {
  Easy:   'course-tag-easy',
  Medium: 'course-tag-medium',
  Hard:   'course-tag-hard',
};

const difficultyGlow = {
  Easy:   '142 70 45',
  Medium: '25 95 60',
  Hard:   '0 90 65',
};

// ── Arrow SVG (two-headed, horizontal) ──
function Arrow() {
  return (
    <svg className="card-arrow" viewBox="0 0 32 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 6 H32 M26 1 L32 6 L26 11 M6 1 L0 6 L6 11"
        stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

// ── variant: "duo" — 2 images (default existing behaviour) ──
function DuoImages({ images }) {
  return (
    <div className="card-img-stage card-img-stage--duo">
      {images.map((src, i) => (
        <div key={i} className={`card-img-wrap card-img-wrap--${i === 0 ? 'left' : 'right'}`}>
          <img src={src} alt="" className="card-img" />
        </div>
      ))}
    </div>
  );
}

// ── variant: "trio" — 3 images, no arrows ──
function TrioImages({ images }) {
  return (
    <div className="card-img-stage card-img-stage--trio">
      {images.map((src, i) => (
        <div key={i} className={`card-img-wrap card-img-wrap--trio card-img-wrap--trio-${i}`}>
          <img src={src} alt="" className="card-img" />
        </div>
      ))}
    </div>
  );
}

// ── variant: "grid4" — 4 images → 2×2 grid on hover ──
function Grid4Images({ images }) {
  return (
    <div className="card-img-stage card-img-stage--grid4">
      {images.map((src, i) => (
        <div key={i} className={`card-img-wrap card-img-wrap--grid4 card-img-wrap--grid4-${i}`}>
          <img src={src} alt="" className="card-img" />
        </div>
      ))}
    </div>
  );
}

// ── variant: "grid6" — 6 images in 2 rows of 3 on hover ──
function Grid6Images({ images }) {
  return (
    <div className="card-img-stage card-img-stage--grid6">
      {images.map((src, i) => (
        <div key={i} className={`card-img-wrap card-img-wrap--grid6 card-img-wrap--grid6-${i}`}>
          <img src={src} alt="" className="card-img" />
        </div>
      ))}
    </div>
  );
}

export default function CourseCard({ title, description, hours, difficulty, lessons, images = [], variant = 'duo', link }) {
  const renderImages = () => {
    if (!images.length) return null;
    switch (variant) {
      case 'trio':     return <TrioImages images={images} />;
      case 'grid4':    return <Grid4Images images={images} />;
      case 'grid6':    return <Grid6Images images={images} />;
      default:         return <DuoImages images={images} />;
    }
  };

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="course-card-link"
    >
      <div className="course-card">
        <div className={`course-card-inner course-card-inner--${variant}`}>
          <div className="course-card-top">
            {renderImages()}
          </div>
          <div className="course-card-bottom">
            <div className="course-card-title">{title}</div>
            <div className="course-card-desc">{description}</div>
            <div className="course-card-tags">
              {lessons && <span className="course-tag course-tag-lessons">{lessons} Lessons</span>}
              <span className="course-tag course-tag-hours">{hours}</span>
              <span className={`course-tag ${difficultyClass[difficulty]}`}>{difficulty}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
