/**
 * Smoke tests for BuildingsTable component
 * These tests verify basic functionality before refactoring
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BuildingsTable } from '../../components/BuildingsTable/index';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BuildingsTable Smoke Tests', () => {
  test('renders table without crashing', () => {
    renderWithRouter(<BuildingsTable />);
    expect(screen.getByPlaceholderText('Search buildings...')).toBeInTheDocument();
  });

  test('displays building data', () => {
    renderWithRouter(<BuildingsTable />);
    // Check for at least one building name (from buildings.js data)
    expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
  });

  test('search functionality works', async () => {
    renderWithRouter(<BuildingsTable />);
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    
    fireEvent.change(searchInput, { target: { value: 'Calgary Demo' } });
    
    await waitFor(() => {
      expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
    });
  });

  test('row expansion works', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Find first building row
    const buildingRow = screen.getByText('Calgary Demo Office').closest('tr');
    expect(buildingRow).toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(buildingRow);
    
    // Check for expanded metrics (should show metric details)
    await waitFor(() => {
      expect(screen.getByText('CO₂')).toBeInTheDocument();
    });
  });

  test('pagination controls render when needed', () => {
    renderWithRouter(<BuildingsTable />);
    
    // Should have pagination controls if there are enough items
    // Check for "Rows per page" label
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
  });

  test('filter dropdown works', () => {
    renderWithRouter(<BuildingsTable />);
    
    // Find and click filter button
    const filterButton = screen.getByRole('button', { name: /filter buildings/i });
    expect(filterButton).toBeInTheDocument();
    
    fireEvent.click(filterButton);
    
    // Check for filter options
    expect(screen.getByText('All Buildings')).toBeInTheDocument();
    expect(screen.getByText('Passing')).toBeInTheDocument();
    expect(screen.getByText('Needs Attention')).toBeInTheDocument();
  });

  test('date range selector is present', () => {
    renderWithRouter(<BuildingsTable />);
    
    // Check for date range tabs
    expect(screen.getByRole('tab', { name: '30 Days' })).toBeInTheDocument();
  });

  test('displays indicator dots with correct values', () => {
    renderWithRouter(<BuildingsTable />);
    
    // Check for percentage values in the table
    const percentageRegex = /\d+\.\d+%/;
    const percentages = screen.getAllByText(percentageRegex);
    expect(percentages.length).toBeGreaterThan(0);
  });

  test('displays well compliance badges', () => {
    renderWithRouter(<BuildingsTable />);
    
    // Check for compliance badges
    const passingBadges = screen.queryAllByText('Passing');
    const needsAttentionBadges = screen.queryAllByText('Needs Attention');
    
    expect(passingBadges.length + needsAttentionBadges.length).toBeGreaterThan(0);
  });

  test('building links are rendered', () => {
    renderWithRouter(<BuildingsTable />);
    
    const buildingLink = screen.getByText('Calgary Demo Office');
    expect(buildingLink).toHaveAttribute('href');
  });
});

