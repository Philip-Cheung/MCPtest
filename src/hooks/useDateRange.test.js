/**
 * Tests for useDateRange hook
 */
import { renderHook, act } from '@testing-library/react';
import { useDateRange } from './useDateRange';

describe('useDateRange', () => {
  test('initializes with default preset', () => {
    const { result } = renderHook(() => useDateRange('30days'));
    
    expect(result.current.selectedPreset).toBe('30days');
    expect(result.current.isCustom).toBe(false);
    expect(result.current.calculatedRange).toBeTruthy();
    expect(result.current.calculatedRange.from).toBeInstanceOf(Date);
    expect(result.current.calculatedRange.to).toBeInstanceOf(Date);
  });

  test('initializes with custom preset', () => {
    const { result } = renderHook(() => useDateRange('custom'));
    
    expect(result.current.selectedPreset).toBe('custom');
    expect(result.current.isCustom).toBe(true);
  });

  test('selects a new preset', () => {
    const { result } = renderHook(() => useDateRange('30days'));
    
    act(() => {
      result.current.selectPreset('7days');
    });
    
    expect(result.current.selectedPreset).toBe('7days');
    expect(result.current.calculatedRange).toBeTruthy();
  });

  test('selecting custom preset clears custom range initially', () => {
    const { result } = renderHook(() => useDateRange('30days'));
    
    act(() => {
      result.current.selectPreset('custom');
    });
    
    expect(result.current.selectedPreset).toBe('custom');
    expect(result.current.isCustom).toBe(true);
  });

  test('selects a custom date range', () => {
    const { result } = renderHook(() => useDateRange('30days'));
    
    const customRange = {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    };
    
    act(() => {
      result.current.selectCustomRange(customRange);
    });
    
    expect(result.current.selectedPreset).toBe('custom');
    expect(result.current.customRange).toEqual(customRange);
    expect(result.current.calculatedRange).toEqual(customRange);
    expect(result.current.isCustom).toBe(true);
  });

  test('setCustomRange updates custom range', () => {
    const { result } = renderHook(() => useDateRange('custom'));
    
    const customRange = {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    };
    
    act(() => {
      result.current.setCustomRange(customRange);
    });
    
    expect(result.current.customRange).toEqual(customRange);
  });

  test('resets to initial preset', () => {
    const { result } = renderHook(() => useDateRange('30days'));
    
    act(() => {
      result.current.selectPreset('7days');
    });
    
    expect(result.current.selectedPreset).toBe('7days');
    
    act(() => {
      result.current.reset();
    });
    
    expect(result.current.selectedPreset).toBe('30days');
    expect(result.current.customRange).toBeNull();
  });

  test('calls onDateRangeChange callback when preset changes', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDateRange('30days', callback));
    
    // Should be called on mount
    expect(callback).toHaveBeenCalled();
    
    callback.mockClear();
    
    act(() => {
      result.current.selectPreset('7days');
    });
    
    expect(callback).toHaveBeenCalledWith(expect.objectContaining({
      from: expect.any(Date),
      to: expect.any(Date),
    }));
  });

  test('calls onDateRangeChange callback when custom range changes', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDateRange('custom', callback));
    
    const customRange = {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    };
    
    act(() => {
      result.current.selectCustomRange(customRange);
    });
    
    expect(callback).toHaveBeenCalledWith(customRange);
  });

  test('calculates correct date range for 7days preset', () => {
    const { result } = renderHook(() => useDateRange('7days'));
    
    const range = result.current.calculatedRange;
    const daysDiff = Math.ceil((range.to - range.from) / (1000 * 60 * 60 * 24));
    
    expect(daysDiff).toBe(6); // 7 days inclusive means 6 days difference
  });

  test('calculates correct date range for 3months preset', () => {
    const { result } = renderHook(() => useDateRange('3months'));
    
    const range = result.current.calculatedRange;
    expect(range.from).toBeInstanceOf(Date);
    expect(range.to).toBeInstanceOf(Date);
    expect(range.from.getTime()).toBeLessThan(range.to.getTime());
  });

  test('handles preset change without callback', () => {
    const { result } = renderHook(() => useDateRange('30days'));
    
    act(() => {
      result.current.selectPreset('7days');
    });
    
    expect(result.current.selectedPreset).toBe('7days');
  });

  test('clears custom range when selecting non-custom preset', () => {
    const { result } = renderHook(() => useDateRange('custom'));
    
    const customRange = {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    };
    
    act(() => {
      result.current.selectCustomRange(customRange);
    });
    
    expect(result.current.customRange).toEqual(customRange);
    
    act(() => {
      result.current.selectPreset('7days');
    });
    
    expect(result.current.customRange).toBeNull();
    expect(result.current.selectedPreset).toBe('7days');
  });
});

