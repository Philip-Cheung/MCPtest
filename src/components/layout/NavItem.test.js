import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavItem from './NavItem';
import { LayoutGrid } from 'lucide-react';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

test('renders nav item with label', () => {
  renderWithRouter(<NavItem to="/test" icon={LayoutGrid}>Test Item</NavItem>);
  expect(screen.getByText('Test Item')).toBeInTheDocument();
});

test('applies active styles when route matches', () => {
  window.history.pushState({}, 'Test page', '/test');
  renderWithRouter(<NavItem to="/test">Test Item</NavItem>);
  const link = screen.getByText('Test Item').closest('a');
  expect(link).toHaveClass('bg-slate-100');
});

