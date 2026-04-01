import CourseCard from './CourseCard';
import './Courses.css';

import dataStructureImg from '../../assets/data_structure.png';
import algorithmImg from '../../assets/algorithm.png';
import algorithmAdv1Img from '../../assets/algorithmAdv1.png';
import algorithmAdv2Img from '../../assets/algorithmAdv2.png';
import pythonImg from '../../assets/python.png';
import pythonCodeImg from '../../assets/pythonCode.png';
import oopsImg from '../../assets/oops.png';
import databaseImg from '../../assets/database.png';
import postgreImg from '../../assets/postgre.png';
import oopdesignImg from '../../assets/oopdesign.png';
import oopsdesignImg from '../../assets/oopsdesign.png';
import pcImg from '../../assets/pc.png';
import wwwImg from '../../assets/www.png';
import pipeImg from '../../assets/pipe.png';
import firewallImg from '../../assets/firewall.png';
import reactImg from '../../assets/react.png';
import typescriptImg from '../../assets/typescript.png';
import dockerImg from '../../assets/docker.png';
import firebaseImg from '../../assets/firebase.png';
import cloudServerImg from '../../assets/cloud-server.png';
import ffmpegImg from '../../assets/ffmpeg.png';

const courses = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Follow a structured path to learn all of the core data structures & algorithms. Perfect for coding interview preparation.',
    cards: [
      { title: 'Algorithms & Data Structures for Beginners', description: 'Learn the foundations of coding interviews.', hours: '25 Hours', difficulty: 'Medium', images: [dataStructureImg, algorithmImg], variant: 'duo' },
      { title: 'Advanced Algorithms', description: 'Learn every algorithm you would ever need.', hours: '25 Hours', difficulty: 'Hard', images: [algorithmAdv1Img, algorithmAdv2Img], variant: 'duo' },
    ]
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Brush up on core system design concepts for designing robust backend systems.',
    cards: [
      { title: 'System Design for Beginners', description: 'Learn the foundations of system design interviews.', hours: '10 Hours', difficulty: 'Medium', images: [pcImg, databaseImg, wwwImg], variant: 'trio' },
      { title: 'System Design Interview', description: 'Learn common system design interview questions.', hours: '10 Hours', difficulty: 'Medium', images: [pcImg, pipeImg, firewallImg, databaseImg], variant: 'grid4' },
    ]
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Learn the Python programming language with interactive coding lessons.',
    cards: [
      { title: 'Python for Beginners', description: 'Learn the Python programming language.', hours: '12 Hours', difficulty: 'Easy', images: [pythonImg, pythonCodeImg], variant: 'duo' },
      { title: 'Python for Coding Interviews', description: 'Learn effective Python for coding interviews.', hours: '8 Hours', difficulty: 'Easy', images: [pythonImg, dataStructureImg], variant: 'duo' },
      { title: 'Python OOP', description: 'Learn object-oriented programming in Python.', hours: '8 Hours', difficulty: 'Easy', images: [pythonImg, oopsImg], variant: 'duo' },
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Choose from a variety of skills involved in full stack development.',
    cards: [
      { title: 'SQL for Beginners', description: 'Learn PostgreSQL with interactive coding lessons.', hours: '10 Hours', difficulty: 'Easy', images: [databaseImg, postgreImg], variant: 'duo' },
      { title: 'Full Stack Development', description: 'Learn how to build an intermediate full stack app.', hours: '20 Hours', difficulty: 'Medium', images: [reactImg, typescriptImg, dockerImg, firebaseImg, cloudServerImg, ffmpegImg], variant: 'grid6' },
    ]
  },
  {
    id: 'ood',
    title: 'Object Oriented Design',
    description: 'Dive deeper into object-oriented programming by focusing on design patterns and principles.',
    cards: [
      { title: 'Object Oriented Design Interviews', description: 'Learn Object Oriented Design interview questions.', hours: '8 Hours', difficulty: 'Easy', images: [oopsImg, oopdesignImg], variant: 'duo' },
      { title: 'Object Oriented Design Patterns', description: 'Learn & implement common coding design patterns.', hours: '8 Hours', difficulty: 'Easy', images: [oopsImg, oopsdesignImg], variant: 'duo' },
    ]
  }
];

export default function Courses() {
  return (
    <section className="courses-section">
      <h2 className="courses-main-heading">Courses</h2>

      {courses.map(course => (
        <div key={course.id} className="course-block">
          <div className="course-block-header">
            <h3 className="course-block-title">{course.title}</h3>
            <p className="course-block-desc">{course.description}</p>
          </div>
          <div className="course-cards-row">
            {course.cards.map(card => (
              <CourseCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
