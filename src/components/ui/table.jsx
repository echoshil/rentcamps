export function Table({ children, className = "" }) {
  return (
    <table className={`w-full border-collapse ${className}`}>
      {children}
    </table>
  );
}

export function Thead({ children }) {
  return <thead className="bg-gray-100">{children}</thead>;
}

export function Tbody({ children }) {
  return <tbody>{children}</tbody>;
}

export function Tr({ children }) {
  return <tr className="border-b">{children}</tr>;
}

export function Th({ children }) {
  return (
    <th className="py-3 px-4 text-left font-semibold text-gray-700">
      {children}
    </th>
  );
}

export function Td({ children }) {
  return <td className="py-3 px-4 text-gray-800">{children}</td>;
}
