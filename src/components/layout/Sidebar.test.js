import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from './Sidebar';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

test('renders all navigation items', () => {
  renderWithRouter(<Sidebar />);
  expect(screen.getByText('Portfolio')).toBeInTheDocument();
  expect(screen.getByText('Devices')).toBeInTheDocument();
  expect(screen.getByText('Alerts')).toBeInTheDocument();
});

test('displays badge on Alerts', () => {
  renderWithRouter(<Sidebar />);
  expect(screen.getByText('99+')).toBeInTheDocument();
});

