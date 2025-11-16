/**
 * Integration tests for complete user flows
 * Tests the end-to-end flow of searching, filtering, sorting, expanding, and paginating buildings
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BuildingsTable } from '../../components/BuildingsTable/index';

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Buildings Flow Integration', () => {
  test('complete user flow: search → filter → expand → paginate', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Step 1: Verify initial render
    expect(screen.getByPlaceholderText('Search buildings...')).toBeInTheDocument();
    expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
    
    // Step 2: Search for a building
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    fireEvent.change(searchInput, { target: { value: 'Office' } });
    
    await waitFor(() => {
      // Should show buildings with "Office" in the name
      expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
    });
    
    // Step 3: Apply filter
    const filterButton = screen.getByRole('button', { name: /filter buildings/i });
    fireEvent.click(filterButton);
    fireEvent.click(screen.getByText('Passing'));
    
    await waitFor(() => {
      // Should only show passing buildings
      const needsAttentionBadges = screen.queryAllByText('Needs Attention');
      expect(needsAttentionBadges).toHaveLength(0);
    });
    
    // Step 4: Expand a building row
    const firstBuilding = screen.getAllByText(/Office|Building/)[0];
    const buildingRow = firstBuilding.closest('tr');
    fireEvent.click(buildingRow);
    
    await waitFor(() => {
      // Should show expanded metrics
      expect(screen.getByText('CO₂')).toBeInTheDocument();
      expect(screen.getByText('Target')).toBeInTheDocument();
    });
    
    // Step 5: Navigate pagination if available
    const nextButton = screen.queryByText('Next');
    if (nextButton && !nextButton.disabled) {
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Page 2 of/)).toBeInTheDocument();
      });
    }
  });

  test('search and clear flow', async () => {
    renderWithRouter(<BuildingsTable />);
    
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    
    // Search for something
    fireEvent.change(searchInput, { target: { value: 'Calgary' } });
    
    await waitFor(() => {
      expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
    });
    
    // Clear search
    fireEvent.change(searchInput, { target: { value: '' } });
    
    await waitFor(() => {
      // Should show more buildings again
      const rows = screen.getAllByRole('row');
      expect(rows.length).toBeGreaterThan(2); // More than just header
    });
  });

  test('filter changes reset pagination', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Go to page 2 if possible
    const nextButton = screen.queryByText('Next');
    if (nextButton && !nextButton.disabled) {
      fireEvent.click(nextButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Page 2 of/)).toBeInTheDocument();
      });
      
      // Change filter
      const filterButton = screen.getByRole('button', { name: /filter buildings/i });
      fireEvent.click(filterButton);
      fireEvent.click(screen.getByText('Passing'));
      
      await waitFor(() => {
        // Should be back on page 1
        expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
      });
    }
  });

  test('multiple buildings can be expanded and collapsed', async () => {
    renderWithRouter(<BuildingsTable />);
    
    const buildings = screen.getAllByText(/Office|Building|Center/);
    
    if (buildings.length >= 2) {
      // Expand first
      const firstRow = buildings[0].closest('tr');
      fireEvent.click(firstRow);
      
      await waitFor(() => {
        expect(screen.getAllByText('CO₂').length).toBeGreaterThan(0);
      });
      
      const firstMetricsCount = screen.getAllByText('CO₂').length;
      
      // Expand second
      const secondRow = buildings[1].closest('tr');
      fireEvent.click(secondRow);
      
      await waitFor(() => {
        // Should have more metrics visible
        expect(screen.getAllByText('CO₂').length).toBeGreaterThan(firstMetricsCount);
      });
      
      // Collapse first
      fireEvent.click(firstRow);
      
      await waitFor(() => {
        // Should have fewer metrics now
        expect(screen.getAllByText('CO₂').length).toBeLessThan(firstMetricsCount * 2);
      });
    }
  });

  test('items per page change flow', async () => {
    renderWithRouter(<BuildingsTable />);
    
    // Change items per page
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const option25 = screen.getAllByText('25')[0];
    fireEvent.click(option25);
    
    await waitFor(() => {
      // Should reset to page 1
      expect(screen.getByText(/Page 1 of/)).toBeInTheDocument();
    });
  });

  test('empty search results flow', async () => {
    renderWithRouter(<BuildingsTable />);
    
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    fireEvent.change(searchInput, { target: { value: 'NonexistentBuilding12345' } });
    
    await waitFor(() => {
      expect(screen.getByText('No buildings found.')).toBeInTheDocument();
    });
    
    // Clear search to recover
    fireEvent.change(searchInput, { target: { value: '' } });
    
    await waitFor(() => {
      expect(screen.queryByText('No buildings found.')).not.toBeInTheDocument();
      expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
    });
  });

  test('date range selection flow', () => {
    renderWithRouter(<BuildingsTable />);
    
    // Should have date range tabs
    expect(screen.getByRole('tab', { name: '30 Days' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '7 Days' })).toBeInTheDocument();
    
    // Click different date range
    const sevenDaysTab = screen.getByRole('tab', { name: '7 Days' });
    fireEvent.click(sevenDaysTab);
    
    // Should still show buildings
    expect(screen.getByText('Calgary Demo Office')).toBeInTheDocument();
  });
});

