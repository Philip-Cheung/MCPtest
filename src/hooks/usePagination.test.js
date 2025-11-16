/**
 * Tests for usePagination hook
 */
import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  const testData = Array.from({ length: 50 }, (_, i) => ({ id: i + 1, name: `Item ${i + 1}` }));

  test('initializes with default values', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    expect(result.current.currentPage).toBe(1);
    expect(result.current.itemsPerPage).toBe(10);
    expect(result.current.paginatedData.items).toHaveLength(10);
    expect(result.current.totalPages).toBe(5);
    expect(result.current.totalItems).toBe(50);
  });

  test('initializes with custom items per page', () => {
    const { result } = renderHook(() => usePagination(testData, 25));
    
    expect(result.current.itemsPerPage).toBe(25);
    expect(result.current.paginatedData.items).toHaveLength(25);
    expect(result.current.totalPages).toBe(2);
  });

  test('navigates to next page', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.nextPage();
    });
    
    expect(result.current.currentPage).toBe(2);
    expect(result.current.paginatedData.items[0].id).toBe(11);
  });

  test('navigates to previous page', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.setCurrentPage(3);
    });
    
    act(() => {
      result.current.previousPage();
    });
    
    expect(result.current.currentPage).toBe(2);
  });

  test('cannot go previous from first page', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.previousPage();
    });
    
    expect(result.current.currentPage).toBe(1);
    expect(result.current.canGoPrevious).toBe(false);
  });

  test('cannot go next from last page', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.setCurrentPage(5);
    });
    
    act(() => {
      result.current.nextPage();
    });
    
    expect(result.current.currentPage).toBe(5);
    expect(result.current.canGoNext).toBe(false);
  });

  test('goes to specific page', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.goToPage(3);
    });
    
    expect(result.current.currentPage).toBe(3);
    expect(result.current.paginatedData.items[0].id).toBe(21);
  });

  test('changes items per page and resets to page 1', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.setCurrentPage(3);
    });
    
    act(() => {
      result.current.setItemsPerPage(25);
    });
    
    expect(result.current.currentPage).toBe(1);
    expect(result.current.itemsPerPage).toBe(25);
    expect(result.current.totalPages).toBe(2);
  });

  test('resets page to 1', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.setCurrentPage(4);
    });
    
    act(() => {
      result.current.resetPage();
    });
    
    expect(result.current.currentPage).toBe(1);
  });

  test('handles empty data array', () => {
    const { result } = renderHook(() => usePagination([]));
    
    expect(result.current.paginatedData.items).toHaveLength(0);
    expect(result.current.totalPages).toBe(0);
    expect(result.current.totalItems).toBe(0);
  });

  test('handles data with fewer items than page size', () => {
    const smallData = testData.slice(0, 5);
    const { result } = renderHook(() => usePagination(smallData));
    
    expect(result.current.paginatedData.items).toHaveLength(5);
    expect(result.current.totalPages).toBe(1);
  });

  test('clamps page number to valid range when going to page', () => {
    const { result } = renderHook(() => usePagination(testData));
    
    act(() => {
      result.current.goToPage(100);
    });
    
    expect(result.current.currentPage).toBe(5); // Should clamp to last page
    
    act(() => {
      result.current.goToPage(-5);
    });
    
    expect(result.current.currentPage).toBe(1); // Should clamp to first page
  });

  test('updates when data changes', () => {
    const { result, rerender } = renderHook(
      ({ data }) => usePagination(data),
      { initialProps: { data: testData } }
    );
    
    expect(result.current.totalItems).toBe(50);
    
    const newData = testData.slice(0, 20);
    rerender({ data: newData });
    
    expect(result.current.totalItems).toBe(20);
    expect(result.current.totalPages).toBe(2);
  });
});

