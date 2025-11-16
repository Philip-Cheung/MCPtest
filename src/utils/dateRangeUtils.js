/**
 * Date range utility functions
 */

/**
 * Calculate date range for preset options
 * @param {string} rangeValue - The preset range value (7days, 30days, etc.)
 * @returns {Object|null} Date range object with 'from' and 'to' dates, or null for custom
 */
export function getDateRange(rangeValue) {
  const today = new Date();
  today.setHours(23, 59, 59, 999); // End of today
  
  let startDate = new Date();
  
  switch (rangeValue) {
    case "7days":
      startDate.setDate(today.getDate() - 6);
      break;
    case "30days":
      startDate.setDate(today.getDate() - 29);
      break;
    case "3months":
      startDate.setMonth(today.getMonth() - 3);
      break;
    case "6months":
      startDate.setMonth(today.getMonth() - 6);
      break;
    default:
      return null;
  }
  
  startDate.setHours(0, 0, 0, 0);
  return { from: startDate, to: today };
}

/**
 * Format a date range as a human-readable string
 * @param {Object} dateRange - Date range object with 'from' and 'to' dates
 * @returns {string} Formatted date range string
 */
export function formatDateRange(dateRange) {
  if (!dateRange || !dateRange.from || !dateRange.to) {
    return '';
  }
  
  return `${dateRange.from.toLocaleDateString()} - ${dateRange.to.toLocaleDateString()}`;
}

/**
 * Validate a date range object
 * @param {Object} dateRange - Date range object to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidDateRange(dateRange) {
  if (!dateRange || typeof dateRange !== 'object') {
    return false;
  }
  
  const { from, to } = dateRange;
  
  if (!from || !to) {
    return false;
  }
  
  if (!(from instanceof Date) || !(to instanceof Date)) {
    return false;
  }
  
  if (isNaN(from.getTime()) || isNaN(to.getTime())) {
    return false;
  }
  
  // 'from' date should be before or equal to 'to' date
  return from <= to;
}

/**
 * Get a label for a date range preset
 * @param {string} rangeValue - The preset range value
 * @returns {string} Human-readable label
 */
export function getDateRangeLabel(rangeValue) {
  const labels = {
    'custom': 'Custom',
    '7days': 'Last 7 Days',
    '30days': 'Last 30 Days',
    '3months': 'Last 3 Months',
    '6months': 'Last 6 Months',
  };
  
  return labels[rangeValue] || rangeValue;
}

/**
 * Check if a date falls within a date range
 * @param {Date} date - The date to check
 * @param {Object} dateRange - Date range object with 'from' and 'to' dates
 * @returns {boolean} True if date is within range
 */
export function isDateInRange(date, dateRange) {
  if (!date || !isValidDateRange(dateRange)) {
    return false;
  }
  
  const checkDate = date instanceof Date ? date : new Date(date);
  
  if (isNaN(checkDate.getTime())) {
    return false;
  }
  
  return checkDate >= dateRange.from && checkDate <= dateRange.to;
}

