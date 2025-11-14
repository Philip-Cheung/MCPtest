import * as React from "react";
import {
  LayoutGrid,
  Laptop,
  FileText,
  Star,
  Monitor,
  Bell,
  FolderCog,
  Settings,
  Wrench,
  Users,
  Building2,
  GalleryVerticalEnd,
} from "lucide-react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "../ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
};

export function AppSidebar({ alertCount = 0, ...props }) {
  const monitorItems = [
    { title: "Portfolio", url: "/", icon: LayoutGrid },
    { title: "Devices", url: "/devices", icon: Laptop },
    { title: "Compare", url: "/compare", icon: FileText },
    { title: "Compliance", url: "/compliance", icon: Star },
    { title: "Kiosks", url: "/kiosks", icon: Monitor },
    {
      title: "Alerts",
      url: "/alerts",
      icon: Bell,
      badge: alertCount > 0 ? (
        <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
          {alertCount > 99 ? "99+" : alertCount}
        </span>
      ) : undefined,
    },
  ];

  const managementItems = [
    { title: "Thresholds", url: "/thresholds", icon: FolderCog },
    { title: "Device Configurations", url: "/device-configurations", icon: FolderCog },
    { title: "Weekly Digest", url: "/weekly-digest", icon: FolderCog },
    { title: "Subscriptions", url: "/subscriptions", icon: FolderCog },
  ];

  const adminItems = [
    { title: "Building Settings", url: "/building-settings", icon: Wrench },
    { title: "User Management", url: "/user-management", icon: Users },
    { title: "Organization", url: "/organization", icon: Building2 },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={monitorItems} label="Monitor" />
        <NavMain items={managementItems} label="Management" collapsible sectionIcon={FolderCog} />
        <NavMain items={adminItems} label="Admin" collapsible sectionIcon={Wrench} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

