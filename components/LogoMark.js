export default function LogoMark({ className }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M4 33 A22 22 0 0 1 35 9" stroke="currentColor" strokeWidth="1.4" />
      <path d="M9.5 33 A16 16 0 0 1 32 13.5" stroke="currentColor" strokeWidth="1.4" opacity=".65" />
      <path d="M15 33 A10 10 0 0 1 29 18.5" stroke="currentColor" strokeWidth="1.4" opacity=".4" />
      <circle cx="35" cy="8" r="1.8" fill="currentColor" />
    </svg>
  );
}
