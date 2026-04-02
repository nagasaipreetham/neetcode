import { motion } from 'framer-motion';
import ProfileCard from '../ProfileCard/ProfileCard';
import amogImg from '../../assets/Amog_Chandrashekar.png';
import rodrigoImg from '../../assets/Rodrigo Ramirez.png';
import aiswaryaImg from '../../assets/Aiswarya_Sukumar.png';
import janviImg from '../../assets/Janvi Kalra.png';
import thariqImg from '../../assets/Thariq Shihipar.png';
import './Reviews.css';

const reviewers = [
  {
    name: 'Amog Chandrashekar',
    title: 'Google',
    handle: 'amogc',
    status: 'Software Engineer L4',
    avatarUrl: amogImg,
    behindGlowColor: 'rgba(66, 133, 244, 0.65)',
    innerGradient: 'linear-gradient(145deg, #0d1f3c 0%, #1a4a8a88 100%)',
    avatarStyle: { width: '100%', bottom: '-40px' },
    description: 'I signed my offer with Google as a software engineer (L4) and you have a fair share of contribution in it.'
  },
  {
    name: 'Rodrigo Ramirez',
    title: 'Microsoft',
    handle: 'rodrigor',
    status: 'Incoming SWE',
    avatarUrl: rodrigoImg,
    behindGlowColor: 'rgba(0, 188, 242, 0.6)',
    innerGradient: 'linear-gradient(145deg, #001a2e 0%, #00bcf288 100%)',
    avatarStyle: { width: '100%', bottom: '-10px' },
    description: 'I recently got an offer for Microsoft, and I will be starting next year! Thank you so much for your videos!'
  },
  {
    name: 'Aiswarya Sukumar',
    title: 'Amazon',
    handle: 'aiswaryask',
    status: 'Software Engineer',
    avatarUrl: aiswaryaImg,
    behindGlowColor: 'rgba(255, 153, 0, 0.6)',
    innerGradient: 'linear-gradient(145deg, #1e0e00 0%, #ff990088 100%)',
    avatarStyle: { width: '150%', bottom: '-15px' },
    description: 'Got an offer from Amazon today. Thanks a lot for your videos. It really helped me during the preparation.'
  },
  {
    name: 'Janvi Kalra',
    title: 'OpenAI',
    handle: 'janvik',
    status: 'AI Engineer',
    avatarUrl: janviImg,
    behindGlowColor: 'rgba(16, 163, 127, 0.6)',
    innerGradient: 'linear-gradient(145deg, #001a14 0%, #10a37f88 100%)',
    avatarStyle: { width: '110%', bottom: '-30px' },
    description: 'The structured roadmap made all the difference in cracking the OpenAI interview.'
  },
  {
    name: 'Thariq Shihipar',
    title: 'Anthropic',
    handle: 'thariqsh',
    status: 'Research Engineer',
    avatarUrl: thariqImg,
    behindGlowColor: 'rgba(205, 127, 50, 0.6)',
    innerGradient: 'linear-gradient(145deg, #1a0e00 0%, #cd7f3288 100%)',
    avatarStyle: { width: '150%', bottom: '-20px' },
    description: 'The video explanations on NeetCode are unmatched. Got an offer from Anthropic.'
  }
];

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
  const row1 = reviewers.slice(0, 3);
  const row2 = reviewers.slice(3);

  return (
    <section className="reviews-section">
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
                name={p.name}
                title={p.title}
                handle={p.handle}
                status={p.status}
                avatarUrl={p.avatarUrl}
                avatarStyle={p.avatarStyle}
                description={p.description}
                showUserInfo={false}
                enableTilt={true}
                behindGlowEnabled={true}
                behindGlowColor={p.behindGlowColor}
                innerGradient={p.innerGradient}
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
                name={p.name}
                title={p.title}
                handle={p.handle}
                status={p.status}
                avatarUrl={p.avatarUrl}
                avatarStyle={p.avatarStyle}
                description={p.description}
                showUserInfo={false}
                enableTilt={true}
                behindGlowEnabled={true}
                behindGlowColor={p.behindGlowColor}
                innerGradient={p.innerGradient}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
