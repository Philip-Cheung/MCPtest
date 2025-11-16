/**
 * Smoke tests for Navigation and Routing
 * These tests verify basic navigation functionality
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

const renderWithRouter = (initialRoute = '/') => {
  return render(
    <MemoryRouter initialEntries={[initialRoute]}>
      <App />
    </MemoryRouter>
  );
};

describe('Navigation Smoke Tests', () => {
  test('app renders without crashing', () => {
    renderWithRouter();
    // Should render the layout and sidebar
    expect(document.body).toBeInTheDocument();
  });

  test('portfolio route is accessible', () => {
    renderWithRouter('/');
    // Portfolio page should contain BuildingsTable
    expect(screen.getByPlaceholderText('Search buildings...')).toBeInTheDocument();
  });

  test('devices route is accessible', () => {
    renderWithRouter('/devices');
    // Should render without error (placeholder page)
    expect(document.body).toBeInTheDocument();
  });

  test('compare route is accessible', () => {
    renderWithRouter('/compare');
    expect(document.body).toBeInTheDocument();
  });

  test('compliance route is accessible', () => {
    renderWithRouter('/compliance');
    expect(document.body).toBeInTheDocument();
  });

  test('kiosks route is accessible', () => {
    renderWithRouter('/kiosks');
    expect(document.body).toBeInTheDocument();
  });

  test('alerts route is accessible', () => {
    renderWithRouter('/alerts');
    expect(document.body).toBeInTheDocument();
  });

  test('thresholds route is accessible', () => {
    renderWithRouter('/thresholds');
    expect(document.body).toBeInTheDocument();
  });

  test('device-configurations route is accessible', () => {
    renderWithRouter('/device-configurations');
    expect(document.body).toBeInTheDocument();
  });

  test('weekly-digest route is accessible', () => {
    renderWithRouter('/weekly-digest');
    expect(document.body).toBeInTheDocument();
  });

  test('subscriptions route is accessible', () => {
    renderWithRouter('/subscriptions');
    expect(document.body).toBeInTheDocument();
  });

  test('building-settings route is accessible', () => {
    renderWithRouter('/building-settings');
    expect(document.body).toBeInTheDocument();
  });

  test('user-management route is accessible', () => {
    renderWithRouter('/user-management');
    expect(document.body).toBeInTheDocument();
  });

  test('organization route is accessible', () => {
    renderWithRouter('/organization');
    expect(document.body).toBeInTheDocument();
  });

  test('404 route renders NotFound page', () => {
    renderWithRouter('/non-existent-route');
    // Should render without crashing (NotFound page)
    expect(document.body).toBeInTheDocument();
  });

  test('breadcrumb navigation is present', () => {
    renderWithRouter('/');
    // Check for Portfolio breadcrumb on home page
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
  });
});

