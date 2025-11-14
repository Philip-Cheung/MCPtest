import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import DesktopSidebar from './DesktopSidebar';
import MobileDrawer from './MobileDrawer';
import ThemeToggle from '../ThemeToggle';

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <DesktopSidebar />
      <div className="md:ml-64">
        <header className="sticky top-0 z-30 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <MobileDrawer isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}

