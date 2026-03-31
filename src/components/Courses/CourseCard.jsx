import BorderGlow from '../BorderGlow/BorderGlow';
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

export default function CourseCard({ title, description, hours, difficulty, images = [] }) {
  return (
    <div className="course-card">
      <BorderGlow
        borderRadius={16}
        backgroundColor="rgba(0, 0, 0, 0.4)"
        glowColor={difficultyGlow[difficulty]}
        glowRadius={50}
        glowIntensity={0.9}
        coneSpread={12}
        edgeSensitivity={0}
        colors={['#c084fc', '#818cf8', '#38bdf8']}
      >
        <div className="course-card-inner">

          {/* Top — image showcase */}
          <div className="course-card-top">
            {images.length > 0 && (
              <div className="card-img-stage">
                {images.map((src, i) => (
                  <div
                    key={i}
                    className={`card-img-wrap card-img-wrap--${i === 0 ? 'left' : 'right'}`}
                  >
                    <img src={src} alt="" className="card-img" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Bottom — details */}
          <div className="course-card-bottom">
            <div className="course-card-title">{title}</div>
            <div className="course-card-desc">{description}</div>
            <div className="course-card-tags">
              <span className="course-tag course-tag-hours">{hours}</span>
              <span className={`course-tag ${difficultyClass[difficulty]}`}>{difficulty}</span>
            </div>
          </div>
        </div>
      </BorderGlow>
    </div>
  );
}
