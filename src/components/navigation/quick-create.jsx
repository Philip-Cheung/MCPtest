import * as React from "react";
import { Plus, Laptop, Building2, Monitor, Megaphone, Users } from "lucide-react";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

const items = [
  { label: "Device", icon: Laptop, url: "/devices" },
  { label: "Building", icon: Building2, url: "/building-settings" },
  { label: "Kiosk", icon: Monitor, url: "/kiosks" },
  { label: "Alert", icon: Megaphone, url: "/alerts" },
  { label: "User", icon: Users, url: "/user-management" },
];

export function QuickCreate() {
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="sm">
                <span className="inline-flex size-5 items-center justify-center rounded-full bg-foreground text-background mr-2">
                  <Plus className="size-3" />
                </span>
                <span className="font-medium">Add</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="min-w-56 rounded-xl p-1.5 shadow-md"
              side="right"
              align="start"
              sideOffset={4}
            >
              {items.map((it) => {
                const Icon = it.icon;
                return (
                  <DropdownMenuItem asChild key={it.label} className="px-3 py-2 rounded-md gap-3 text-foreground/90">
                    <NavLink to={it.url} className="flex w-full items-center gap-3">
                      <Icon className="size-4" />
                      <span>{it.label}</span>
                    </NavLink>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}


