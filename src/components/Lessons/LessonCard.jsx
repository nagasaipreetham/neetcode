import './LessonCard.css';

export default function LessonCard({ title, imageUrl, href }) {
  const content = (
    <div className="lesson-card">
      <img src={imageUrl} alt={title} className="lesson-card-img" loading="lazy" />
      <div className="lesson-card-body">
        <p className="lesson-card-title">{title}</p>
      </div>
    </div>
  );

  if (href) {
    return <a href={href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>{content}</a>;
  }
  return content;
}
