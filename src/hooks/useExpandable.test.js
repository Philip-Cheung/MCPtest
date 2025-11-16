/**
 * Tests for useExpandable hook
 */
import { renderHook, act } from '@testing-library/react';
import { useExpandable } from './useExpandable';

describe('useExpandable', () => {
  test('initializes with no expanded items', () => {
    const { result } = renderHook(() => useExpandable());
    
    expect(result.current.expandedCount).toBe(0);
    expect(result.current.isExpanded('item1')).toBe(false);
  });

  test('initializes with provided expanded items', () => {
    const { result } = renderHook(() => useExpandable(['item1', 'item2']));
    
    expect(result.current.expandedCount).toBe(2);
    expect(result.current.isExpanded('item1')).toBe(true);
    expect(result.current.isExpanded('item2')).toBe(true);
    expect(result.current.isExpanded('item3')).toBe(false);
  });

  test('toggles item expansion', () => {
    const { result } = renderHook(() => useExpandable());
    
    act(() => {
      result.current.toggle('item1');
    });
    
    expect(result.current.isExpanded('item1')).toBe(true);
    expect(result.current.expandedCount).toBe(1);
    
    act(() => {
      result.current.toggle('item1');
    });
    
    expect(result.current.isExpanded('item1')).toBe(false);
    expect(result.current.expandedCount).toBe(0);
  });

  test('expands an item', () => {
    const { result } = renderHook(() => useExpandable());
    
    act(() => {
      result.current.expand('item1');
    });
    
    expect(result.current.isExpanded('item1')).toBe(true);
    expect(result.current.expandedCount).toBe(1);
  });

  test('expanding an already expanded item does not duplicate', () => {
    const { result } = renderHook(() => useExpandable(['item1']));
    
    act(() => {
      result.current.expand('item1');
    });
    
    expect(result.current.expandedCount).toBe(1);
  });

  test('collapses an item', () => {
    const { result } = renderHook(() => useExpandable(['item1', 'item2']));
    
    act(() => {
      result.current.collapse('item1');
    });
    
    expect(result.current.isExpanded('item1')).toBe(false);
    expect(result.current.isExpanded('item2')).toBe(true);
    expect(result.current.expandedCount).toBe(1);
  });

  test('collapsing a non-expanded item does nothing', () => {
    const { result } = renderHook(() => useExpandable());
    
    act(() => {
      result.current.collapse('item1');
    });
    
    expect(result.current.expandedCount).toBe(0);
  });

  test('expands all items from list', () => {
    const { result } = renderHook(() => useExpandable());
    
    act(() => {
      result.current.expandAll(['item1', 'item2', 'item3']);
    });
    
    expect(result.current.expandedCount).toBe(3);
    expect(result.current.isExpanded('item1')).toBe(true);
    expect(result.current.isExpanded('item2')).toBe(true);
    expect(result.current.isExpanded('item3')).toBe(true);
  });

  test('collapses all items', () => {
    const { result } = renderHook(() => useExpandable(['item1', 'item2', 'item3']));
    
    act(() => {
      result.current.collapseAll();
    });
    
    expect(result.current.expandedCount).toBe(0);
    expect(result.current.isExpanded('item1')).toBe(false);
    expect(result.current.isExpanded('item2')).toBe(false);
    expect(result.current.isExpanded('item3')).toBe(false);
  });

  test('expandAll replaces existing expanded items', () => {
    const { result } = renderHook(() => useExpandable(['item1', 'item2']));
    
    act(() => {
      result.current.expandAll(['item3', 'item4']);
    });
    
    expect(result.current.expandedCount).toBe(2);
    expect(result.current.isExpanded('item1')).toBe(false);
    expect(result.current.isExpanded('item2')).toBe(false);
    expect(result.current.isExpanded('item3')).toBe(true);
    expect(result.current.isExpanded('item4')).toBe(true);
  });

  test('handles multiple items being toggled', () => {
    const { result } = renderHook(() => useExpandable());
    
    act(() => {
      result.current.toggle('item1');
      result.current.toggle('item2');
      result.current.toggle('item3');
    });
    
    expect(result.current.expandedCount).toBe(3);
    
    act(() => {
      result.current.toggle('item2');
    });
    
    expect(result.current.expandedCount).toBe(2);
    expect(result.current.isExpanded('item1')).toBe(true);
    expect(result.current.isExpanded('item2')).toBe(false);
    expect(result.current.isExpanded('item3')).toBe(true);
  });

  test('handles numeric IDs', () => {
    const { result } = renderHook(() => useExpandable([1, 2, 3]));
    
    expect(result.current.isExpanded(1)).toBe(true);
    expect(result.current.isExpanded(4)).toBe(false);
    
    act(() => {
      result.current.toggle(1);
    });
    
    expect(result.current.isExpanded(1)).toBe(false);
  });

  test('handles mixed ID types', () => {
    const { result } = renderHook(() => useExpandable(['item1', 123, { id: 'object' }]));
    
    expect(result.current.expandedCount).toBe(3);
    expect(result.current.isExpanded('item1')).toBe(true);
    expect(result.current.isExpanded(123)).toBe(true);
  });
});

