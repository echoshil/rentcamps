import React from "react";

export const Select = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
});
Select.displayName = "Select";

export const SelectTrigger = React.forwardRef(({ children, className = "", ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

export const SelectValue = ({ placeholder }) => {
  return <span className="text-muted-foreground">{placeholder}</span>;
};

export const SelectContent = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const SelectItem = React.forwardRef(({ children, value, className = "", ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-value={value}
      className={`relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

