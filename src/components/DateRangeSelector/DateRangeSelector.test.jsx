/**
 * Integration tests for DateRangeSelector component
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { DateRangeSelector } from './index';

describe('DateRangeSelector', () => {
  const defaultProps = {
    value: '30days',
    onChange: jest.fn(),
    onDateRangeChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders preset tabs', () => {
    render(<DateRangeSelector {...defaultProps} />);
    
    expect(screen.getByRole('tab', { name: '7 Days' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '30 Days' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: '3 Months' })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: 'Custom' })).toBeInTheDocument();
  });

  test('calls onChange when selecting a preset', () => {
    render(<DateRangeSelector {...defaultProps} />);
    
    const sevenDaysTab = screen.getByRole('tab', { name: '7 Days' });
    fireEvent.click(sevenDaysTab);
    
    expect(defaultProps.onChange).toHaveBeenCalledWith('7days');
  });

  test('does not render custom date picker when not on custom preset', () => {
    render(<DateRangeSelector {...defaultProps} value="30days" />);
    
    expect(screen.queryByText('Pick a date range')).not.toBeInTheDocument();
  });

  test('renders custom date picker when on custom preset', () => {
    render(<DateRangeSelector {...defaultProps} value="custom" />);
    
    expect(screen.getByText('Pick a date range')).toBeInTheDocument();
  });

  test('custom date picker opens calendar on click', () => {
    render(<DateRangeSelector {...defaultProps} value="custom" />);
    
    const button = screen.getByText('Pick a date range');
    fireEvent.click(button);
    
    // Calendar should be visible (check for month navigation)
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });

  test('uses default date range when no value provided', () => {
    const { container } = render(
      <DateRangeSelector
        onChange={jest.fn()}
        onDateRangeChange={jest.fn()}
      />
    );
    
    // Should default to 30days (from constants)
    expect(container.querySelector('[data-state="active"]')).toBeInTheDocument();
  });

  test('displays selected preset correctly', () => {
    render(<DateRangeSelector {...defaultProps} value="7days" />);
    
    const sevenDaysTab = screen.getByRole('tab', { name: '7 Days' });
    expect(sevenDaysTab).toHaveAttribute('data-state', 'active');
  });

  test('all preset options are clickable', () => {
    render(<DateRangeSelector {...defaultProps} />);
    
    const presets = ['Custom', '7 Days', '30 Days', '3 Months', '6 Months'];
    
    presets.forEach((preset) => {
      const tab = screen.getByRole('tab', { name: preset });
      expect(tab).toBeInTheDocument();
      fireEvent.click(tab);
    });
    
    expect(defaultProps.onChange).toHaveBeenCalledTimes(5);
  });
});

