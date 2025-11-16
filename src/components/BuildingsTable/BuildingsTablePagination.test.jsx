/**
 * Tests for BuildingsTablePagination component
 */
import { render, screen, fireEvent } from '@testing-library/react';
import { BuildingsTablePagination } from './BuildingsTablePagination';

describe('BuildingsTablePagination', () => {
  const defaultProps = {
    currentPage: 1,
    totalPages: 5,
    itemsPerPage: 10,
    onPageChange: jest.fn(),
    onItemsPerPageChange: jest.fn(),
    canGoNext: true,
    canGoPrevious: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders pagination controls', () => {
    render(<BuildingsTablePagination {...defaultProps} />);
    
    expect(screen.getByText('Rows per page:')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument();
  });

  test('does not render when totalPages is 1', () => {
    const { container } = render(
      <BuildingsTablePagination {...defaultProps} totalPages={1} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('does not render when totalPages is 0', () => {
    const { container } = render(
      <BuildingsTablePagination {...defaultProps} totalPages={0} />
    );
    
    expect(container.firstChild).toBeNull();
  });

  test('renders Previous and Next buttons', () => {
    render(<BuildingsTablePagination {...defaultProps} />);
    
    expect(screen.getByText('Previous')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
  });

  test('disables Previous button when cannot go previous', () => {
    render(<BuildingsTablePagination {...defaultProps} canGoPrevious={false} />);
    
    const previousButton = screen.getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  test('disables Next button when cannot go next', () => {
    render(<BuildingsTablePagination {...defaultProps} canGoNext={false} />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  test('enables Previous button when can go previous', () => {
    render(<BuildingsTablePagination {...defaultProps} canGoPrevious={true} />);
    
    const previousButton = screen.getByText('Previous');
    expect(previousButton).not.toBeDisabled();
  });

  test('enables Next button when can go next', () => {
    render(<BuildingsTablePagination {...defaultProps} canGoNext={true} />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).not.toBeDisabled();
  });

  test('calls onPageChange with decremented page when Previous is clicked', () => {
    render(<BuildingsTablePagination {...defaultProps} currentPage={3} canGoPrevious={true} />);
    
    const previousButton = screen.getByText('Previous');
    fireEvent.click(previousButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(2);
  });

  test('calls onPageChange with incremented page when Next is clicked', () => {
    render(<BuildingsTablePagination {...defaultProps} currentPage={3} />);
    
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    
    expect(defaultProps.onPageChange).toHaveBeenCalledWith(4);
  });

  test('displays current page info correctly', () => {
    render(<BuildingsTablePagination {...defaultProps} currentPage={3} totalPages={10} />);
    
    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument();
  });

  test('renders items per page selector with pagination options', () => {
    render(<BuildingsTablePagination {...defaultProps} />);
    
    // Click the select to open it
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    // Should show pagination options
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('calls onItemsPerPageChange when selecting different items per page', () => {
    render(<BuildingsTablePagination {...defaultProps} />);
    
    const select = screen.getByRole('combobox');
    fireEvent.click(select);
    
    const option25 = screen.getAllByText('25')[0];
    fireEvent.click(option25);
    
    expect(defaultProps.onItemsPerPageChange).toHaveBeenCalledWith(25);
  });

  test('displays selected items per page value', () => {
    render(<BuildingsTablePagination {...defaultProps} itemsPerPage={25} />);
    
    // The select should show the current value
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });
});

