import { motion } from 'framer-motion';
import ProfileCard from '../ProfileCard/ProfileCard';
import { REVIEWS_DATA } from '../../data/reviewsData';
import './Reviews.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  }
};

export default function Reviews() {
  const row1 = REVIEWS_DATA.slice(0, 3);
  const row2 = REVIEWS_DATA.slice(3);

  return (
    <section className="reviews-section">
      <h2 className="reviews-heading">Testimonials</h2>
      <div className="reviews-grid">
        <motion.div 
          className="reviews-row"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {row1.map(p => (
            <motion.div key={p.name} variants={cardVariants}>
              <ProfileCard
                {...p}
                showUserInfo={false}
                enableTilt={true}
                behindGlowEnabled={true}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="reviews-row reviews-row--center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {row2.map(p => (
            <motion.div key={p.name} variants={cardVariants}>
              <ProfileCard
                {...p}
                showUserInfo={false}
                enableTilt={true}
                behindGlowEnabled={true}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

