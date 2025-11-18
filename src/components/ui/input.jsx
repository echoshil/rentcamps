import React from "react";

export function Input({ placeholder, type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      {...props}
    />
  );
}
