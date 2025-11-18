import React from "react";

export function Progress({ value, max = 100, className = "" }) {
  return (
    <div className={`w-full bg-gray-200 rounded-full h-3 ${className}`}>
      <div className="bg-blue-600 h-3 rounded-full" style={{ width: `${(value / max) * 100}%` }} />
    </div>
  );
}
