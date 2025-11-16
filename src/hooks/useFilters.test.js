/**
 * Tests for useFilters hook
 */
import { renderHook, act } from '@testing-library/react';
import { useFilters } from './useFilters';

describe('useFilters', () => {
  const initialFilters = {
    category: 'all',
    status: 'active',
    minValue: 0,
  };

  test('initializes with provided filters', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    expect(result.current.filters).toEqual(initialFilters);
  });

  test('initializes with empty object when no initial filters provided', () => {
    const { result } = renderHook(() => useFilters());
    
    expect(result.current.filters).toEqual({});
  });

  test('updates a single filter', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilter('category', 'electronics');
    });
    
    expect(result.current.filters).toEqual({
      ...initialFilters,
      category: 'electronics',
    });
  });

  test('updates multiple filters at once', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilters({
        category: 'books',
        minValue: 10,
      });
    });
    
    expect(result.current.filters).toEqual({
      category: 'books',
      status: 'active',
      minValue: 10,
    });
  });

  test('resets all filters to initial values', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilter('category', 'electronics');
      result.current.updateFilter('status', 'inactive');
    });
    
    act(() => {
      result.current.resetFilters();
    });
    
    expect(result.current.filters).toEqual(initialFilters);
  });

  test('resets a specific filter to initial value', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilter('category', 'electronics');
      result.current.updateFilter('status', 'inactive');
    });
    
    act(() => {
      result.current.resetFilter('category');
    });
    
    expect(result.current.filters).toEqual({
      category: 'all',
      status: 'inactive',
      minValue: 0,
    });
  });

  test('clears all filters', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.clearFilters();
    });
    
    expect(result.current.filters).toEqual({});
  });

  test('sets filters directly', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    const newFilters = { search: 'test', page: 1 };
    
    act(() => {
      result.current.setFilters(newFilters);
    });
    
    expect(result.current.filters).toEqual(newFilters);
  });

  test('hasActiveFilters returns false when filters match initial', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    expect(result.current.hasActiveFilters).toBe(false);
  });

  test('hasActiveFilters returns true when filters differ from initial', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilter('category', 'electronics');
    });
    
    expect(result.current.hasActiveFilters).toBe(true);
  });

  test('hasActiveFilters updates when filters are reset', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilter('category', 'electronics');
    });
    
    expect(result.current.hasActiveFilters).toBe(true);
    
    act(() => {
      result.current.resetFilters();
    });
    
    expect(result.current.hasActiveFilters).toBe(false);
  });

  test('can add new filter keys not in initial filters', () => {
    const { result } = renderHook(() => useFilters(initialFilters));
    
    act(() => {
      result.current.updateFilter('newKey', 'newValue');
    });
    
    expect(result.current.filters.newKey).toBe('newValue');
  });
});

