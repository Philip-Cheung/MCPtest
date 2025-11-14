import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";

const CollapsibleContext = React.createContext();

const Collapsible = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <CollapsibleContext.Provider value={{ open, setOpen }}>
      {children}
    </CollapsibleContext.Provider>
  );
};

const CollapsibleTrigger = ({ children, className, ...props }) => {
  const { open, setOpen } = React.useContext(CollapsibleContext);
  return (
    <button
      onClick={() => setOpen(!open)}
      className={cn("flex items-center w-full", className)}
      {...props}
    >
      {children}
      <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", open && "rotate-180")} />
    </button>
  );
};

const CollapsibleContent = ({ children, className }) => {
  const { open } = React.useContext(CollapsibleContext);
  if (!open) return null;
  return <div className={cn("pl-4", className)}>{children}</div>;
};

export { Collapsible, CollapsibleTrigger, CollapsibleContent };

