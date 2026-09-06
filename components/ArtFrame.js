export default function ArtFrame({ sym = 'fold-a', grad, line, tag, className = '' }) {
  return (
    <div className={`media-frame ${className}`} style={{ width: '100%', height: '100%' }} data-placeholder>
      <div className="media-frame__art" style={{ background: grad, color: line }}>
        <svg viewBox="0 0 300 375" preserveAspectRatio="xMidYMid slice">
          <use href={`#${sym}`} />
        </svg>
      </div>
      {tag && <div className="media-frame__tag">{tag}</div>}
    </div>
  );
}
