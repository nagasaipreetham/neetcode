import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import PixelSnow from '../components/PixelSnow/PixelSnow';
import Courses from '../components/Courses/Courses';
import Lessons from '../components/Lessons/Lessons';
import './CoursesPage.css';

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'courses';

  const setTab = (t) => setSearchParams({ tab: t });

  return (
    <div className="courses-page">
      <div className="courses-page-bg">
        <PixelSnow
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
        />
      </div>

      <Navbar />

      <div className="courses-page-content">
        {/* Toggle */}
        <div className="courses-page-toggle">
          <div
            className="toggle-slider"
            style={{
              transform: `translateX(${tab === 'courses' ? '0' : '100%'})`
            }}
          />
          <button
            className={`toggle-btn ${tab === 'courses' ? 'toggle-btn--active' : 'toggle-btn--inactive'}`}
            onClick={() => setTab('courses')}
          >
            Courses
          </button>
          <button
            className={`toggle-btn ${tab === 'lessons' ? 'toggle-btn--active' : 'toggle-btn--inactive'}`}
            onClick={() => setTab('lessons')}
          >
            Lessons
          </button>
        </div>

        {/* Tab content */}
        <div className="courses-page-tab">
          {tab === 'courses' && <Courses showHeading={false} gradientTitles />}
          {tab === 'lessons' && <Lessons />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
