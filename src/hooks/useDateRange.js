/**
 * Custom hook for date range management
 */
import { useState, useEffect, useCallback } from 'react';
import { getDateRange } from '../utils/dateRangeUtils';
import { DEFAULT_DATE_RANGE } from '../config/constants';

/**
 * Hook to manage date range selection (presets and custom)
 * @param {string} initialPreset - Initial preset value (e.g., "30days")
 * @param {Function} onDateRangeChange - Callback when date range changes
 * @returns {Object} Date range state and handlers
 */
export function useDateRange(initialPreset = DEFAULT_DATE_RANGE, onDateRangeChange = null) {
  const [selectedPreset, setSelectedPreset] = useState(initialPreset);
  const [customRange, setCustomRange] = useState(null);
  const [calculatedRange, setCalculatedRange] = useState(null);

  // Calculate date range based on preset or custom selection
  useEffect(() => {
    if (selectedPreset !== 'custom') {
      const range = getDateRange(selectedPreset);
      setCalculatedRange(range);
      if (range && onDateRangeChange) {
        onDateRangeChange(range);
      }
    } else if (customRange) {
      setCalculatedRange(customRange);
      if (onDateRangeChange) {
        onDateRangeChange(customRange);
      }
    }
  }, [selectedPreset, customRange, onDateRangeChange]);

  // Change to a preset date range
  const selectPreset = useCallback((preset) => {
    setSelectedPreset(preset);
    if (preset !== 'custom') {
      setCustomRange(null);
    }
  }, []);

  // Set a custom date range
  const selectCustomRange = useCallback((range) => {
    setCustomRange(range);
    setSelectedPreset('custom');
  }, []);

  // Reset to initial preset
  const reset = useCallback(() => {
    setSelectedPreset(initialPreset);
    setCustomRange(null);
  }, [initialPreset]);

  return {
    selectedPreset,
    customRange,
    calculatedRange,
    isCustom: selectedPreset === 'custom',
    selectPreset,
    selectCustomRange,
    setCustomRange,
    reset,
  };
}

