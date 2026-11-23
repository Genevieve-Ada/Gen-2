import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackClassName = '',
  ...rest
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt || fallbackTitle || 'Product visual'}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#EFEAE0] to-[#DDD4C5] text-[#5C4F40] p-6 text-center ${fallbackClassName} ${className}`}
      >
        <svg
          className="w-8 h-8 mb-2 opacity-60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M3 16l4-5 4 4 5-6 5 7H3z" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="3" y="4" width="18" height="16" rx="2" />
        </svg>
        {fallbackTitle && (
          <span className="text-xs font-medium tracking-wide opacity-80">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  );
}
