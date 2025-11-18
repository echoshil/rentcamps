import React, { useState } from "react";

// Container Tabs
export function Tabs({ children, defaultValue = 0, className = "" }) {
  const [active, setActive] = useState(defaultValue);
  return (
    <div className={className}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

// TabsList → wrapper tombol
export function TabsList({ children, className = "", active, setActive }) {
  return (
    <div className={`flex space-x-2 mb-2 ${className}`}>
      {React.Children.map(children, child =>
        React.cloneElement(child, { active, setActive })
      )}
    </div>
  );
}

// TabsTrigger → tombol tab
export function TabsTrigger({ children, value, active, setActive, className = "" }) {
  const isActive = active === value;
  return (
    <button
      className={`px-3 py-1 rounded ${isActive ? "bg-blue-600 text-white" : "bg-gray-200"} ${className}`}
      onClick={() => setActive(value)}
    >
      {children}
    </button>
  );
}

// TabsContent → konten tiap tab
export function TabsContent({ children, value, active, className = "" }) {
  if (active !== value) return null;
  return <div className={className}>{children}</div>;
}
