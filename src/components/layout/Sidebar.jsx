import {
  LayoutGrid, Laptop, FileText, Star, Monitor, Bell,
  FolderCog, Settings, Wrench, Users, Building2
} from 'lucide-react';
import NavItem from './NavItem';
import NavSection from './NavSection';
import NavBadge from './NavBadge';

const navItems = [
  { to: '/', icon: LayoutGrid, label: 'Portfolio' },
  { to: '/devices', icon: Laptop, label: 'Devices' },
  { to: '/compare', icon: FileText, label: 'Compare' },
  { to: '/compliance', icon: Star, label: 'Compliance' },
  { to: '/kiosks', icon: Monitor, label: 'Kiosks' },
  { to: '/alerts', icon: Bell, label: 'Alerts', badge: <NavBadge count="99+" /> },
];

const manageItems = [
  { to: '/device-configurations', label: 'Device Configurations' },
  { to: '/weekly-digest', label: 'Weekly Digest' },
  { to: '/subscriptions', label: 'Subscriptions' },
];

const adminItems = [
  { to: '/building-settings', icon: Wrench, label: 'Building Settings' },
  { to: '/user-management', icon: Users, label: 'User Management' },
  { to: '/organization', icon: Building2, label: 'Organization' },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 space-y-1">
      {navItems.map(item => (
        <NavItem key={item.to} to={item.to} icon={item.icon} badge={item.badge}>
          {item.label}
        </NavItem>
      ))}
      <NavSection icon={FolderCog} title="Manage">
        {manageItems.map(item => (
          <NavItem key={item.to} to={item.to}>{item.label}</NavItem>
        ))}
      </NavSection>
      <NavSection icon={Settings} title="Admin">
        {adminItems.map(item => (
          <NavItem key={item.to} to={item.to} icon={item.icon}>{item.label}</NavItem>
        ))}
      </NavSection>
    </div>
  );
}

