import { motion } from 'framer-motion';
import CourseCard from './CourseCard';
import { COURSES_DATA } from '../../data/coursesData';
import './Courses.css';

const blockVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }
  })
};

export default function Courses({ showHeading = true, gradientTitles = false, layout = 'landing' }) {
  return (
    <section className={`courses-section${layout === 'page' ? ' courses-section--page' : ''}`}>
      {showHeading && (
        <motion.div
          className="courses-section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="courses-section-label">Courses</div>
          <h2 className="courses-main-heading">Learn everything you need</h2>
          <p className="courses-main-desc">Structured courses from beginner to advanced, covering DSA, system design, Python, and more.</p>
        </motion.div>
      )}

      {COURSES_DATA.map((course, blockIdx) => (
        <motion.div
          key={course.id}
          className={`course-block${layout === 'page' ? ' course-block--page' : ' course-block--landing'}`}
          variants={blockVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <div className="course-block-header">
            <h3 className="course-block-title">{course.title}</h3>
            <p className="course-block-desc">{course.description}</p>
          </div>
          <div className={`course-cards-row${layout === 'page' ? ' course-cards-row--page' : ' course-cards-row--landing'}`}>
            {course.cards.map((card, i) => (
              <motion.div
                key={card.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                <CourseCard {...card} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </section>
  );
}

