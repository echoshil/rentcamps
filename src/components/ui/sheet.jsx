import React from "react";

export function Sheet({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">
      <div className="bg-white w-80 h-full p-4 shadow-lg">{children}</div>
      <div className="flex-1" onClick={onClose}></div>
    </div>
  );
}
