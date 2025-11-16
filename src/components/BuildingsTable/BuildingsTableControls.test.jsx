/**
 * Tests for BuildingsTableControls component
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { BuildingsTableControls } from './BuildingsTableControls';

// Mock DateRangeSelector since it's tested separately
jest.mock('../DateRangeSelector', () => ({
  DateRangeSelector: ({ value, onChange }) => (
    <div data-testid="date-range-selector">
      <button onClick={() => onChange('7days')}>7 Days</button>
      <button onClick={() => onChange('30days')}>30 Days</button>
    </div>
  ),
}));

describe('BuildingsTableControls', () => {
  const defaultProps = {
    searchQuery: '',
    onSearchChange: jest.fn(),
    dateRange: '30days',
    onDateRangeChange: jest.fn(),
    onDateRangeValueChange: jest.fn(),
    filterValue: 'all',
    onFilterChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders search input', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search buildings...')).toBeInTheDocument();
  });

  test('renders date range selector', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    expect(screen.getByTestId('date-range-selector')).toBeInTheDocument();
  });

  test('renders filter button', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    const filterButton = screen.getByRole('button', { name: /filter buildings/i });
    expect(filterButton).toBeInTheDocument();
  });

  test('calls onSearchChange when typing in search input', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    
    fireEvent.change(searchInput, { target: { value: 'Calgary' } });
    
    expect(defaultProps.onSearchChange).toHaveBeenCalled();
  });

  test('displays current search query', () => {
    render(<BuildingsTableControls {...defaultProps} searchQuery="Calgary" />);
    const searchInput = screen.getByPlaceholderText('Search buildings...');
    expect(searchInput.value).toBe('Calgary');
  });

  test('opens filter dropdown when clicked', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    const filterButton = screen.getByRole('button', { name: /filter buildings/i });
    
    fireEvent.click(filterButton);
    
    expect(screen.getByText('All Buildings')).toBeInTheDocument();
    expect(screen.getByText('Passing')).toBeInTheDocument();
    expect(screen.getByText('Needs Attention')).toBeInTheDocument();
  });

  test('calls onFilterChange when selecting a filter option', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    const filterButton = screen.getByRole('button', { name: /filter buildings/i });
    
    fireEvent.click(filterButton);
    fireEvent.click(screen.getByText('Passing'));
    
    expect(defaultProps.onFilterChange).toHaveBeenCalledWith('passing');
  });

  test('calls onDateRangeChange when date range preset changes', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    
    const button = screen.getByText('7 Days');
    fireEvent.click(button);
    
    expect(defaultProps.onDateRangeChange).toHaveBeenCalledWith('7days');
  });

  test('renders with all filter options visible when dropdown is open', () => {
    render(<BuildingsTableControls {...defaultProps} />);
    const filterButton = screen.getByRole('button', { name: /filter buildings/i });
    
    fireEvent.click(filterButton);
    
    const options = screen.getAllByRole('menuitemradio');
    expect(options).toHaveLength(3);
  });
});

