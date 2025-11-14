import { NavLink } from 'react-router-dom';
import { cn } from '../../utils/cn';

export default function NavItem({ to, icon: Icon, children, badge }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
          isActive
            ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50"
            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        )
      }
    >
      {Icon && <Icon className="h-5 w-5" />}
      <span>{children}</span>
      {badge}
    </NavLink>
  );
}

