/**
 * Custom hook for filter state management
 */
import { useState, useMemo } from 'react';

/**
 * Hook to manage filter state and apply filters to data
 * @param {Object} initialFilters - Initial filter values
 * @returns {Object} Filter state and handlers
 */
export function useFilters(initialFilters = {}) {
  const [filters, setFilters] = useState(initialFilters);

  // Update a specific filter
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Update multiple filters at once
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };

  // Reset all filters to initial values
  const resetFilters = () => {
    setFilters(initialFilters);
  };

  // Reset a specific filter to initial value
  const resetFilter = (key) => {
    setFilters((prev) => ({
      ...prev,
      [key]: initialFilters[key],
    }));
  };

  // Clear all filters (set to empty object)
  const clearFilters = () => {
    setFilters({});
  };

  // Check if filters are active (different from initial)
  const hasActiveFilters = useMemo(() => {
    return JSON.stringify(filters) !== JSON.stringify(initialFilters);
  }, [filters, initialFilters]);

  return {
    filters,
    setFilters,
    updateFilter,
    updateFilters,
    resetFilters,
    resetFilter,
    clearFilters,
    hasActiveFilters,
  };
}

