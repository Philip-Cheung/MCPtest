import { Outlet, useLocation } from 'react-router-dom';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '../ui/sidebar';
import { AppSidebar } from '../navigation/app-sidebar';
import { Separator } from '../ui/separator';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../ui/breadcrumb';
import ThemeToggle from '../ThemeToggle';
import { ROUTE_LABELS } from '../../config/routes';

export default function Layout() {
  const location = useLocation();
  const currentPageLabel = ROUTE_LABELS[location.pathname] || 'Page';

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 bg-[#111111] px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  Portfolio
                </BreadcrumbLink>
              </BreadcrumbItem>
              {currentPageLabel !== 'Portfolio' && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </header>
        <main className="flex flex-1 flex-col bg-[#111111]">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
