/**
 * Integration tests for BuildingsTable component
 * Tests the complete flow and interaction between subcomponents
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BuildingsTable } from './index';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BuildingsTable Integration', () => {
  test('renders complete table with data', () => {
    renderWithRouter(<BuildingsTable />);
    
    // Should render controls
    expect(screen.getByPlaceholderText('Search buildings...')).toBeInTheDocument();
    
    // Should render table headers
    expect(screen.getByText('Building')).toBeInTheDocument();
    expect(screen.getByText('Spaces')).toBeInTheDocument();
    
    // Should render at least one building
    expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
  });

  test('search filters buildings', async () => {
    renderWithRouter(<BuildingsTable />);
    
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    fireEvent.change(searchInput, { target: { value: 'Calgary Demo' } });
    
    await waitFor(() => {
      expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
      // Other buildings should be filtered out (check one that shouldn't match)
      expect(screen.queryByText('Vancouver')).not.toBeInTheDocument();
    });
  });

  test('compliance filter works', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Open filter dropdown
    const filterButton = screen.getByRole('button', { name: /filter buildings/i });
    fireEvent.click(filterButton);
    
    // Select "Passing" filter
    fireEvent.click(screen.getByText('Passing'));
    
    await waitFor(() => {
      // Should only show passing buildings
      const needsAttentionBadges = screen.queryAllByText('Needs Attention');
      expect(needsAttentionBadges).toHaveLength(0);
    });
  });

  test('row expansion shows metrics', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Find and click a building row
    const buildingRow = screen.getByText('Calgary Demo Office').closest('tr');
    fireEvent.click(buildingRow);
    
    await waitFor(() => {
      // Should show expanded metrics
      expect(screen.getByText('CO₂')).toBeInTheDocument();
      expect(screen.getByText('Target')).toBeInTheDocument();
    });
  });

  test('row collapse hides metrics', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Expand a row
    const buildingRow = screen.getByText('Calgary Demo Office').closest('tr');
    fireEvent.click(buildingRow);
    
    await waitFor(() => {
      expect(screen.getByText('CO₂')).toBeInTheDocument();
    });
    
    // Collapse the row
    fireEvent.click(buildingRow);
    
    await waitFor(() => {
      expect(screen.queryByText('CO₂')).not.toBeInTheDocument();
    });
  });

  test('pagination changes displayed items', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Should have pagination if there are enough items
    const nextButton = screen.queryByText('Next');
    
    if (nextButton && !nextButton.disabled) {
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        // Page indicator should update
        expect(screen.getByText(/Page 2 of/)).toBeInTheDocument();
      });
    }
  });

  test('items per page selector changes pagination', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Open items per page selector
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    // Select 25 items per page
    const option25 = screen.getAllByText('25')[0];
    fireEvent.click(option25);
    
    await waitFor(() => {
      // Should reset to page 1
      expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
    });
  });

  test('search resets to page 1', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Go to page 2 if possible
    const nextButton = screen.queryByText('Next');
    if (nextButton && !nextButton.disabled) {
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Page 2 of/)).toBeInTheDocument();
      });
    }
    
    // Perform search
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    fireEvent.change(searchInput, { target: { value: 'Calgary' } });
    
    await waitFor(() => {
      // Should be back on page 1
      expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
    });
  });

  test('shows empty state when no buildings match', async () => {
    renderWithRouter(<BuildingsTable />);
    
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    fireEvent.change(searchInput, { target: { value: 'NonexistentBuilding123' } });
    
    await waitFor(() => {
      expect(screen.getByText('No buildings found.')).toBeInTheDocument();
    });
  });

  test('building link navigation works', () => {
    renderWithRouter(<BuildingsTable />);
    
    const buildingLink = screen.getByText('Calgary Demo Office');
    expect(buildingLink).toHaveAttribute('href');
    expect(buildingLink.getAttribute('href')).toContain('/building/');
  });

  test('multiple buildings can be expanded simultaneously', async () => {
    renderWithRouter(<BuildingsTable />);
    
    const buildings = screen.getAllByText(/Office|Building|Center/);
    
    if (buildings.length >= 2) {
      // Expand first building
      const firstRow = buildings[0].closest('tr');
      fireEvent.click(firstRow);
      
      await waitFor(() => {
        expect(screen.getAllByText('CO₂').length).toBeGreaterThan(0);
      });
      
      const metricsCount = screen.getAllByText('CO₂').length;
      
      // Expand second building
      const secondRow = buildings[1].closest('tr');
      fireEvent.click(secondRow);
      
      await waitFor(() => {
        // Should have more metrics visible (both buildings expanded)
        expect(screen.getAllByText('CO₂').length).toBeGreaterThan(metricsCount);
      });
    }
  });
});

