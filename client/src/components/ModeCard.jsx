import { Link } from 'react-router-dom';

/**
 * Shared mode presentation card used on Landing, How It Works, and Choose Experience.
 */
function ModeCard({
  eyebrow,
  title,
  description,
  details = [],
  participation,
  bestFor,
  ctaLabel,
  ctaTo,
  ctaVariant = 'secondary',
  accent = 'default',
}) {
  return (
    <article className={`mode-card mode-card--${accent}`}>
      {eyebrow ? <p className="mode-card__eyebrow">{eyebrow}</p> : null}
      <h3>{title}</h3>
      {description ? <p className="mode-card__lead">{description}</p> : null}
      {details.map((item) => (
        <p key={item} className="mode-card__detail">
          {item}
        </p>
      ))}
      {participation ? (
        <p className="mode-card__meta">
          <span className="mode-card__meta-label">Participation</span>
          {participation}
        </p>
      ) : null}
      {bestFor ? (
        <p className="mode-card__meta">
          <span className="mode-card__meta-label">Best for</span>
          {bestFor}
        </p>
      ) : null}
      {ctaLabel && ctaTo ? (
        <Link to={ctaTo} className={`btn btn-${ctaVariant}`}>
          {ctaLabel}
        </Link>
      ) : null}
    </article>
  );
}

export default ModeCard;
