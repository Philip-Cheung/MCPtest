/**
 * NavMainStandard - Non-collapsible navigation variant
 */
import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { useNavigation } from "../../hooks/useNavigation";

export function NavMainStandard({ items, label }) {
  const { isItemActive } = useNavigation(items);

  return (
    <SidebarGroup>
      {label && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item.url);
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={active}>
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

