/**
 * Tests for Layout component
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

// Mock child components
jest.mock('../navigation/app-sidebar', () => ({
  AppSidebar: () => <div data-testid="app-sidebar">AppSidebar</div>,
}));

jest.mock('../ThemeToggle', () => ({
  __esModule: true,
  default: () => <div data-testid="theme-toggle">ThemeToggle</div>,
}));

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <Layout />
    </MemoryRouter>
  );
};

describe('Layout', () => {
  test('renders sidebar', () => {
    renderWithRouter();
    expect(screen.getByTestId('app-sidebar')).toBeInTheDocument();
  });

  test('renders theme toggle', () => {
    renderWithRouter();
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  test('renders breadcrumb with Portfolio on home page', () => {
    renderWithRouter('/');
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  test('renders breadcrumb with correct page label', () => {
    renderWithRouter('/devices');
    
    // Should show Portfolio > Devices
    const breadcrumbItems = screen.getAllByText('Portfolio');
    expect(breadcrumbItems.length).toBeGreaterThan(0);
    expect(screen.getByText('Devices')).toBeInTheDocument();
  });

  test('only shows Portfolio breadcrumb on home page', () => {
    renderWithRouter('/');
    
    const portfolioItems = screen.getAllByText('Portfolio');
    expect(portfolioItems).toHaveLength(1); // Only one instance
  });

  test('shows two-level breadcrumb on non-home pages', () => {
    renderWithRouter('/alerts');
    
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Alerts')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    const { container } = renderWithRouter();
    const main = container.querySelector('main');
    expect(main).toBeInTheDocument();
  });

  test('renders header with sidebar trigger', () => {
    const { container } = renderWithRouter();
    const header = container.querySelector('header');
    expect(header).toBeInTheDocument();
  });

  test('handles unknown routes gracefully', () => {
    renderWithRouter('/unknown-route');
    
    // Should default to "Page" label
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });

  test('renders correct labels for all known routes', () => {
    const routes = [
      { path: '/devices', label: 'Devices' },
      { path: '/compare', label: 'Compare' },
      { path: '/compliance', label: 'Compliance' },
      { path: '/kiosks', label: 'Kiosks' },
      { path: '/alerts', label: 'Alerts' },
    ];

    routes.forEach(({ path, label }) => {
      const { unmount } = renderWithRouter(path);
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    });
  });
});

