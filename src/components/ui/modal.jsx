import React from "react";

export function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
        <button className="absolute top-2 right-2" onClick={onClose}>
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
