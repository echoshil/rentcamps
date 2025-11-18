import React, { useState } from "react";

export function Dropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative inline-block text-left">
      <div>
        <button onClick={() => setOpen(!open)} className="px-3 py-2 bg-gray-100 rounded-md">
          {label}
        </button>
      </div>
      {open && <div className="absolute mt-1 bg-white border rounded shadow-md">{children}</div>}
    </div>
  );
}
