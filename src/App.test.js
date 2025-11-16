/**
 * Tests for App routing
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock Layout to simplify testing
jest.mock('./components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="layout">{children}</div>,
}));

// Mock all page components
jest.mock('./pages/Portfolio', () => ({
  __esModule: true,
  default: () => <div data-testid="page-portfolio">Portfolio Page</div>,
}));

jest.mock('./pages/Devices', () => ({
  __esModule: true,
  default: () => <div data-testid="page-devices">Devices Page</div>,
}));

jest.mock('./pages/Compare', () => ({
  __esModule: true,
  default: () => <div data-testid="page-compare">Compare Page</div>,
}));

jest.mock('./pages/NotFound', () => ({
  __esModule: true,
  default: () => <div data-testid="page-notfound">404 Not Found</div>,
}));

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('App Routing', () => {
  test('renders Layout component', () => {
    renderWithRouter();
    expect(screen.getByTestId('layout')).toBeInTheDocument();
  });

  test('renders Portfolio page on root route', () => {
    renderWithRouter('/');
    expect(screen.getByTestId('page-portfolio')).toBeInTheDocument();
  });

  test('renders Devices page on /devices route', () => {
    renderWithRouter('/devices');
    expect(screen.getByTestId('page-devices')).toBeInTheDocument();
  });

  test('renders Compare page on /compare route', () => {
    renderWithRouter('/compare');
    expect(screen.getByTestId('page-compare')).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', () => {
    renderWithRouter('/non-existent-route');
    expect(screen.getByTestId('page-notfound')).toBeInTheDocument();
  });

  test('all routes render within Layout', () => {
    const routes = ['/', '/devices', '/compare', '/unknown'];
    
    routes.forEach((route) => {
      const { unmount } = renderWithRouter(route);
      expect(screen.getByTestId('layout')).toBeInTheDocument();
      unmount();
    });
  });
});

