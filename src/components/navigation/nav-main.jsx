import { useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

export function NavMain({ items, label, collapsible = false, sectionIcon }) {
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  if (!collapsible) {
    return (
      <SidebarGroup>
        {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
        <SidebarMenu>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.url || (item.url === '/' && location.pathname === '/');
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild tooltip={item.title} isActive={isActive}>
                  <NavLink to={item.url}>
                    {Icon && <Icon />}
                    <span>{item.title}</span>
                    {item.badge}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    );
  }

  // When sidebar is collapsed, show icon-only button with custom hover menu
  if (isCollapsed && collapsible && sectionIcon) {
    const SectionIcon = sectionIcon;
    const hasActiveItem = items.some(item => location.pathname === item.url);
    
    return (
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton isActive={hasActiveItem}>
              <SectionIcon />
            </SidebarMenuButton>
            
            {/* Custom hover menu - pure CSS, no JS state */}
            <div className="absolute left-full top-0 ml-2 invisible opacity-0 group-hover/menu-item:visible group-hover/menu-item:opacity-100 transition-all duration-200 z-50 pointer-events-none group-hover/menu-item:pointer-events-auto">
              <div className="rounded-md border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 shadow-lg p-1 min-w-[12rem]">
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.url;
                  return (
                    <NavLink
                      key={item.title}
                      to={item.url}
                      className={cn(
                        "flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm transition-colors cursor-pointer",
                        "hover:bg-slate-100 dark:hover:bg-slate-800",
                        "text-slate-950 dark:text-slate-50",
                        isActive && "bg-slate-100 dark:bg-slate-800"
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

  // When sidebar is expanded, show normal collapsible behavior
  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip={label}>
                <span>{label}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.url;
                  return (
                    <SidebarMenuSubItem key={item.title}>
                      <SidebarMenuSubButton asChild isActive={isActive}>
                        <NavLink to={item.url}>
                          {Icon && <Icon />}
                          <span>{item.title}</span>
                          {item.badge}
                        </NavLink>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  );
                })}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      </SidebarMenu>
    </SidebarGroup>
  );
}

