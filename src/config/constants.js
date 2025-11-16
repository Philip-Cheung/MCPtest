/**
 * Application-wide constants and configuration values
 */

// Pagination configuration
export const PAGINATION_OPTIONS = [10, 25, 50, 100];
export const DEFAULT_ITEMS_PER_PAGE = 10;

// Color threshold values for indicators
export const COLOR_THRESHOLDS = {
  ERROR: 50,    // Below this value shows red
  WARNING: 75,  // Below this value shows yellow, above shows green
};

// Date range presets
export const DATE_RANGE_PRESETS = [
  { label: "Custom", value: "custom" },
  { label: "7 Days", value: "7days" },
  { label: "30 Days", value: "30days" },
  { label: "3 Months", value: "3months" },
  { label: "6 Months", value: "6months" },
];

export const DEFAULT_DATE_RANGE = "30days";

