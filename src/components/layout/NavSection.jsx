import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../ui/collapsible';
import { cn } from '../../utils/cn';

export default function NavSection({ icon: Icon, title, children, defaultOpen = false }) {
  return (
    <Collapsible defaultOpen={defaultOpen}>
      <CollapsibleTrigger className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium",
        "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      )}>
        {Icon && <Icon className="h-5 w-5" />}
        <span>{title}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="mt-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

