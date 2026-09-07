export default function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="fold-a" viewBox="0 0 300 375">
          <path d="M -40 415 A 300 300 0 0 1 340 75" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M -10 380 A 260 260 0 0 1 310 40" fill="none" stroke="currentColor" strokeWidth="1" opacity=".7" />
          <path d="M 20 345 A 220 220 0 0 1 280 5" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" />
          <path d="M 55 305 A 175 175 0 0 1 245 -30" fill="none" stroke="currentColor" strokeWidth="1" opacity=".35" />
          <circle cx="60" cy="330" r="150" fill="currentColor" opacity=".07" />
        </symbol>

        <symbol id="fold-b" viewBox="0 0 300 375">
          <path d="M -20 60 Q 150 20 320 70" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M -20 140 Q 150 95 320 150" fill="none" stroke="currentColor" strokeWidth="1" opacity=".78" />
          <path d="M -20 220 Q 150 175 320 230" fill="none" stroke="currentColor" strokeWidth="1" opacity=".58" />
          <path d="M -20 300 Q 150 255 320 310" fill="none" stroke="currentColor" strokeWidth="1" opacity=".4" />
          <path d="M -20 375 Q 150 335 320 385" fill="none" stroke="currentColor" strokeWidth="1" opacity=".26" />
        </symbol>

        <symbol id="fold-c" viewBox="0 0 300 375">
          <polyline points="-10,140 50,70 100,120 150,40 200,120 250,70 310,140" fill="none" stroke="currentColor" strokeWidth="1" />
          <line x1="40" y1="150" x2="20" y2="375" stroke="currentColor" strokeWidth="1" opacity=".4" />
          <line x1="100" y1="140" x2="115" y2="375" stroke="currentColor" strokeWidth="1" opacity=".3" />
          <line x1="160" y1="150" x2="150" y2="375" stroke="currentColor" strokeWidth="1" opacity=".42" />
          <line x1="220" y1="140" x2="240" y2="375" stroke="currentColor" strokeWidth="1" opacity=".3" />
          <circle cx="150" cy="90" r="3" fill="currentColor" />
        </symbol>
      </defs>
    </svg>
  );
}
