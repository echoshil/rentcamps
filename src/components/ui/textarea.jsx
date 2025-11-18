import React from "react";

export function Textarea({ placeholder, className = "", ...props }) {
  return (
    <textarea
      placeholder={placeholder}
      className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
