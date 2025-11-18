import React from "react";

export function Avatar({ children, className = "" }) {
  return (
    <div className={`relative inline-flex items-center justify-center rounded-full overflow-hidden bg-slate-200 ${className}`}>
      {children}
    </div>
  );
}

export function AvatarFallback({ children, className = "" }) {
  return (
    <div className={`w-full h-full flex items-center justify-center text-gray-500 ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt, className = "" }) {
  return (
    <img src={src} alt={alt} className={`w-full h-full object-cover ${className}`} />
  );
}
