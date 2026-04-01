import LessonCard from './LessonCard';
import './Lessons.css';

const lessons = [
  { title: 'How to Use Neetcode Effectively', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/8ac26cc8-8108-4247-eddd-c434b8e44100/public' },
  { title: 'Python Cheat Sheet', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/9ccf90a9-bbca-4a17-5461-444e859f5500/public' },
  { title: 'Big-O Notation', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/c21f735d-f9f7-4efe-1cb1-2982fa151400/public' },
  { title: '8 Data Structures for Coding Interviews', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/717252a3-9f6e-4707-5262-72c72d5f8300/public' },
  { title: 'Sorting Algorithms Cheat Sheet', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/d888a751-43dd-470f-f5de-a79834ec9c00/public' },
  { title: '5 Graph Algorithms for Coding Interviews', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/c1758a92-2541-460f-5591-aca84e2dcb00/public' },
  { title: '8 Design Patterns Every Programmer Should Know', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/d1971965-f033-4c26-6925-c0b06a270500/public' },
  { title: '20 Must-Know System Design Concepts', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/e19bb26d-9436-4f98-7852-d1a181818d00/public' },
  { title: '30-Day JavaScript Coding Challenge', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/5b31c7ef-d597-4b08-be82-15e3db17e100/public' },
  { title: 'Design a YouTube Clone', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/2d33be5f-6a51-4475-6975-7350d9d3d700/public' },
  { title: 'MongoDB Crash Course', imageUrl: 'https://imagedelivery.net/CLfkmk9Wzy8_9HRyug4EVA/cc61ac8a-d7b5-4f47-b001-c7736ae43600/public' },
];

export default function Lessons() {
  return (
    <section className="lessons-section">
      <div className="lessons-grid">
        {lessons.map((lesson, i) => (
          <LessonCard key={i} title={lesson.title} imageUrl={lesson.imageUrl} />
        ))}
      </div>
    </section>
  );
}
