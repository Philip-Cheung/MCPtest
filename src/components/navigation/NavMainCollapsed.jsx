/**
 * NavMainCollapsed - Navigation variant for collapsed sidebar
 */
import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useNavigation } from "../../hooks/useNavigation";
import { cn } from "../../utils/cn";

export function NavMainCollapsed({ items, sectionIcon }) {
  const { hasActiveItem, isItemActive } = useNavigation(items);
  const SectionIcon = sectionIcon;

  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton isActive={hasActiveItem}>
            {SectionIcon && <SectionIcon />}
          </SidebarMenuButton>
          
          {/* Custom hover menu - pure CSS, no JS state */}
          <div className="absolute left-full top-0 ml-2 invisible opacity-0 group-hover/menu-item:visible group-hover/menu-item:opacity-100 transition-all duration-200 z-50 pointer-events-none group-hover/menu-item:pointer-events-auto">
            <div className="rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 shadow-lg p-1 min-w-[12rem]">
              {items.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item.url);
                
                return (
                  <NavLink
                    key={item.title}
                    to={item.url}
                    className={cn(
                      "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors cursor-pointer",
                      "hover:bg-slate-100 dark:hover:bg-slate-800",
                      "text-slate-950 dark:text-slate-50",
                      active && "bg-slate-100 dark:bg-slate-800"
                    )}
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    <span>{item.title}</span>
                    {item.badge}
                  </NavLink>
                );
              })}
            </div>
          </div>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

