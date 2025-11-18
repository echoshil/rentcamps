import React from "react";

export function Switch({ checked, onChange }) {
  return (
    <button
      className={`w-12 h-6 rounded-full transition-colors ${checked ? "bg-blue-600" : "bg-gray-300"}`}
      onClick={() => onChange(!checked)}
    >
      <div className={`w-6 h-6 bg-white rounded-full shadow transform transition ${checked ? "translate-x-6" : ""}`} />
    </button>
  );
}
