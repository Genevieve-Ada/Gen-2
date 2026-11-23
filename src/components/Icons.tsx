import React from 'react';

export function ConwerseLogoMark({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Top-left warm taupe/cream arc segment */}
      <path
        d="M5.5 14.5C6.2 9.4 10.6 5.5 16 5.5C17.8 5.5 19.5 5.9 21 6.7L18.4 11.1C17.7 10.8 16.9 10.6 16 10.6C13.3 10.6 11.1 12.4 10.6 14.9L5.5 14.5Z"
        fill="#D6C6B0"
      />
      {/* Main white broken C-ring */}
      <path
        d="M24.2 9.3C25.6 11.1 26.5 13.4 26.5 16C26.5 21.8 21.8 26.5 16 26.5C10.5 26.5 6 22.3 5.5 16.9L10.7 16.9C11.1 19.5 13.3 21.4 16 21.4C19 21.4 21.4 19 21.4 16C21.4 14.7 20.9 13.4 20.1 12.5L24.2 9.3Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function PumaSilhouetteMark({ className = 'w-11 h-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 40"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M53.5 8.2c-1.1-.6-2.5-.4-3.7.2-1.8.9-3.9 2.4-6.4 3.5-4.3 1.9-9.1 2.4-13.9 3.9-3.6 1.1-7.4 2.8-10.7 4.7-2.6 1.5-5.6 3.5-8.4 4.1-2 .4-4.1-.3-5.9-1.1-.7-.3-1.4.3-1.1 1 .7 1.6 2.8 2.8 5.2 2.9 3.6.2 7.2-1.9 10.6-3.7 1.3-.7 2.8-1.4 4.2-1.9-1.1 2.1-2.7 4.3-4.7 6.1-.8.7-.1 1.9.9 1.5 2.7-1.1 5.1-3.6 6.9-6.3.7-1.1 1.4-2.1 2.3-2.9 2.7-.7 5.6-1.2 8.2-1.9 3.2-.8 6.4-2.2 9.1-4.3.9 1.9 1.5 4.1 1.3 6.3-.1 1.1 1.3 1.5 1.9.5 1.3-2.2 1.8-5.1 1.1-7.9 1.7-1.6 3.4-3.2 4.7-4.9.9-1.1 1.7-2.7 1.2-3.9-.3-.7-1-.9-1.8-.9-.4 0-.7-.1-1-.2z" />
    </svg>
  );
}

export function NikeSwooshMark({ className = 'w-12 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.2 21.8C11.1 23.3 6.3 22.8 3.6 20.1c-2.8-2.8-2.4-7.6.9-12.5 1.6-2.4 3.8-4.7 6.3-6.8-.9 2-1.4 4-.9 5.9.8 3.2 4.1 4.8 9.2 3.4L62.5 1.2 16.2 21.8z" />
    </svg>
  );
}
