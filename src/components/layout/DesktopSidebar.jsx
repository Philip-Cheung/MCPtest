import Sidebar from './Sidebar';

export default function DesktopSidebar() {
  return (
    <aside className="hidden md:block fixed left-0 top-0 bottom-0 overflow-y-auto">
      <Sidebar />
    </aside>
  );
}

