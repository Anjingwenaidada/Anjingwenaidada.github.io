export function SectionHeading({ number, english, title, description }: { number: string; english: string; title: string; description?: string }) {
  return <div className="section-heading"><div className="section-heading__title"><p className="eyebrow"><span>{number}</span> / {english}</p><h2>{title}</h2></div>{description && <p className="section-description">{description}</p>}</div>
}
