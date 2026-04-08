import './PlaceholderPage.css';

export default function PlaceholderPage({ title = 'Coming Soon' }) {
  return (
    <main className="placeholder-main">
      <div className="placeholder-inner">
        <p className="placeholder-emoji">🚧</p>
        <h1>{title}</h1>
        <p className="placeholder-sub">This section is under construction. Check back soon!</p>
      </div>
    </main>
  );
}
