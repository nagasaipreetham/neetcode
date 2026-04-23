import dataStructureImg from '../assets/data_structure.png';
import algorithmImg from '../assets/algorithm.png';
import algorithmAdv1Img from '../assets/algorithmAdv1.png';
import algorithmAdv2Img from '../assets/algorithmAdv2.png';
import pythonImg from '../assets/python.png';
import pythonCodeImg from '../assets/pythonCode.png';
import oopsImg from '../assets/oops.png';
import databaseImg from '../assets/database.png';
import postgreImg from '../assets/postgre.png';
import oopdesignImg from '../assets/oopdesign.png';
import oopsdesignImg from '../assets/oopsdesign.png';
import pcImg from '../assets/pc.png';
import wwwImg from '../assets/www.png';
import pipeImg from '../assets/pipe.png';
import firewallImg from '../assets/firewall.png';
import reactImg from '../assets/react.png';
import typescriptImg from '../assets/typescript.png';
import dockerImg from '../assets/docker.png';
import firebaseImg from '../assets/firebase.png';
import cloudServerImg from '../assets/cloud-server.png';
import ffmpegImg from '../assets/ffmpeg.png';

export const COURSES_DATA = [
  {
    id: 'dsa',
    title: 'Data Structures & Algorithms',
    description: 'Follow a structured path to learn all of the core data structures & algorithms. Perfect for coding interview preparation.',
    cards: [
      { title: 'Algorithms & Data Structures for Beginners', description: 'Learn the foundations of coding interviews.', hours: '25 Hours', difficulty: 'Medium', lessons: 45, images: [dataStructureImg, algorithmImg], variant: 'duo', link: 'https://neetcode.io/courses/dsa-for-beginners/0' },
      { title: 'Advanced Algorithms', description: 'Learn every algorithm you would ever need.', hours: '25 Hours', difficulty: 'Hard', lessons: 38, images: [algorithmAdv1Img, algorithmAdv2Img], variant: 'duo', link: 'https://neetcode.io/courses/advanced-algorithms/0' },
    ]
  },
  {
    id: 'system-design',
    title: 'System Design',
    description: 'Brush up on core system design concepts for designing robust backend systems.',
    cards: [
      { title: 'System Design for Beginners', description: 'Learn the foundations of system design interviews.', hours: '10 Hours', difficulty: 'Medium', lessons: 22, images: [pcImg, databaseImg, wwwImg], variant: 'trio', link: 'https://neetcode.io/courses/system-design-for-beginners/0' },
      { title: 'System Design Interview', description: 'Learn common system design interview questions.', hours: '10 Hours', difficulty: 'Medium', lessons: 18, images: [pcImg, pipeImg, firewallImg, databaseImg], variant: 'grid4', link: 'https://neetcode.io/courses/system-design-interview/0' },
    ]
  },
  {
    id: 'python',
    title: 'Python',
    description: 'Learn the Python programming language with interactive coding lessons.',
    cards: [
      { title: 'Python for Beginners', description: 'Learn the Python programming language.', hours: '12 Hours', difficulty: 'Easy', lessons: 52, images: [pythonImg, pythonCodeImg], variant: 'duo', link: 'https://neetcode.io/problems/python-hello-world/question' },
      { title: 'Python for Coding Interviews', description: 'Learn effective Python for coding interviews.', hours: '8 Hours', difficulty: 'Easy', lessons: 28, images: [pythonImg, dataStructureImg], variant: 'duo', link: 'https://neetcode.io/problems/python-sort-ascending/question' },
      { title: 'Python OOP', description: 'Learn object-oriented programming in Python.', hours: '8 Hours', difficulty: 'Easy', lessons: 24, images: [pythonImg, oopsImg], variant: 'duo', link: 'https://neetcode.io/problems/python-intro-to-classes/question' },
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Development',
    description: 'Choose from a variety of skills involved in full stack development.',
    cards: [
      { title: 'SQL for Beginners', description: 'Learn PostgreSQL with interactive coding lessons.', hours: '10 Hours', difficulty: 'Easy', lessons: 35, images: [databaseImg, postgreImg], variant: 'duo', link: 'https://neetcode.io/problems/sql-create-table/question' },
      { title: 'Full Stack Development', description: 'Learn how to build an intermediate full stack app.', hours: '20 Hours', difficulty: 'Medium', lessons: 42, images: [reactImg, typescriptImg, dockerImg, firebaseImg, cloudServerImg, ffmpegImg], variant: 'grid6', link: 'https://neetcode.io/courses/full-stack-dev/0' },
    ]
  },
  {
    id: 'ood',
    title: 'Object Oriented Design',
    description: 'Dive deeper into object-oriented programming by focusing on design patterns and principles.',
    cards: [
      { title: 'Object Oriented Design Interviews', description: 'Learn Object Oriented Design interview questions.', hours: '8 Hours', difficulty: 'Easy', lessons: 16, images: [oopsImg, oopdesignImg], variant: 'duo', link: 'https://neetcode.io/courses/ood-interview/0' },
      { title: 'Object Oriented Design Patterns', description: 'Learn & implement common coding design patterns.', hours: '8 Hours', difficulty: 'Easy', lessons: 20, images: [oopsImg, oopsdesignImg], variant: 'duo', link: 'https://neetcode.io/courses/design-patterns/0' },
    ]
  }
];
