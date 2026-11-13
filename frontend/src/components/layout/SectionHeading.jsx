export default function SectionHeading({ eyebrow, title, description, action, className = '' }) {
  return (
    <header className={`section-heading ${className}`.trim()}>
      <div>
        {eyebrow && <p className="section-heading__eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
        {description && <p className="section-heading__description">{description}</p>}
      </div>
      {action && <div className="section-heading__action">{action}</div>}
    </header>
  );
}
