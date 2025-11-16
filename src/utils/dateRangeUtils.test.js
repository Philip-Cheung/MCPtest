/**
 * Comprehensive tests for dateRangeUtils utility functions
 */
import {
  getDateRange,
  formatDateRange,
  isValidDateRange,
  getDateRangeLabel,
  isDateInRange,
} from './dateRangeUtils';

describe('getDateRange', () => {
  test('returns date range for 7days preset', () => {
    const result = getDateRange('7days');
    expect(result).toBeTruthy();
    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
    expect(result.from.getTime()).toBeLessThan(result.to.getTime());
  });

  test('returns date range for 30days preset', () => {
    const result = getDateRange('30days');
    expect(result).toBeTruthy();
    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
  });

  test('returns date range for 3months preset', () => {
    const result = getDateRange('3months');
    expect(result).toBeTruthy();
    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
  });

  test('returns date range for 6months preset', () => {
    const result = getDateRange('6months');
    expect(result).toBeTruthy();
    expect(result.from).toBeInstanceOf(Date);
    expect(result.to).toBeInstanceOf(Date);
  });

  test('returns null for custom preset', () => {
    const result = getDateRange('custom');
    expect(result).toBeNull();
  });

  test('returns null for invalid preset', () => {
    const result = getDateRange('invalid');
    expect(result).toBeNull();
  });

  test('7days range spans approximately 7 days', () => {
    const result = getDateRange('7days');
    const daysDiff = Math.ceil((result.to - result.from) / (1000 * 60 * 60 * 24));
    expect(daysDiff).toBe(6); // 7 days inclusive means 6 days difference
  });

  test('30days range spans approximately 30 days', () => {
    const result = getDateRange('30days');
    const daysDiff = Math.ceil((result.to - result.from) / (1000 * 60 * 60 * 24));
    expect(daysDiff).toBe(29); // 30 days inclusive
  });

  test('from date is at start of day (00:00:00)', () => {
    const result = getDateRange('7days');
    expect(result.from.getHours()).toBe(0);
    expect(result.from.getMinutes()).toBe(0);
    expect(result.from.getSeconds()).toBe(0);
    expect(result.from.getMilliseconds()).toBe(0);
  });

  test('to date is at end of day (23:59:59)', () => {
    const result = getDateRange('7days');
    expect(result.to.getHours()).toBe(23);
    expect(result.to.getMinutes()).toBe(59);
    expect(result.to.getSeconds()).toBe(59);
    expect(result.to.getMilliseconds()).toBe(999);
  });
});

describe('formatDateRange', () => {
  test('formats a valid date range', () => {
    const dateRange = {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    };
    const result = formatDateRange(dateRange);
    expect(result).toContain('2024');
    expect(result).toContain(' - ');
  });

  test('returns empty string for null range', () => {
    expect(formatDateRange(null)).toBe('');
  });

  test('returns empty string for undefined range', () => {
    expect(formatDateRange(undefined)).toBe('');
  });

  test('returns empty string for range without from date', () => {
    const dateRange = { to: new Date('2024-01-31') };
    expect(formatDateRange(dateRange)).toBe('');
  });

  test('returns empty string for range without to date', () => {
    const dateRange = { from: new Date('2024-01-01') };
    expect(formatDateRange(dateRange)).toBe('');
  });

  test('returns empty string for empty object', () => {
    expect(formatDateRange({})).toBe('');
  });

  test('formats dates in local format', () => {
    const dateRange = {
      from: new Date('2024-06-15'),
      to: new Date('2024-07-20'),
    };
    const result = formatDateRange(dateRange);
    // Result format depends on locale, but should contain dates
    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain(' - ');
  });
});

describe('isValidDateRange', () => {
  test('returns true for valid date range', () => {
    const dateRange = {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    };
    expect(isValidDateRange(dateRange)).toBe(true);
  });

  test('returns true when from and to are the same date', () => {
    const date = new Date('2024-01-15');
    const dateRange = { from: date, to: date };
    expect(isValidDateRange(dateRange)).toBe(true);
  });

  test('returns false when from is after to', () => {
    const dateRange = {
      from: new Date('2024-01-31'),
      to: new Date('2024-01-01'),
    };
    expect(isValidDateRange(dateRange)).toBe(false);
  });

  test('returns false for null', () => {
    expect(isValidDateRange(null)).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(isValidDateRange(undefined)).toBe(false);
  });

  test('returns false for non-object', () => {
    expect(isValidDateRange('not an object')).toBe(false);
    expect(isValidDateRange(123)).toBe(false);
  });

  test('returns false for range without from', () => {
    const dateRange = { to: new Date('2024-01-31') };
    expect(isValidDateRange(dateRange)).toBe(false);
  });

  test('returns false for range without to', () => {
    const dateRange = { from: new Date('2024-01-01') };
    expect(isValidDateRange(dateRange)).toBe(false);
  });

  test('returns false for invalid date objects', () => {
    const dateRange = {
      from: new Date('invalid'),
      to: new Date('2024-01-31'),
    };
    expect(isValidDateRange(dateRange)).toBe(false);
  });

  test('returns false for non-Date objects', () => {
    const dateRange = {
      from: '2024-01-01',
      to: '2024-01-31',
    };
    expect(isValidDateRange(dateRange)).toBe(false);
  });
});

describe('getDateRangeLabel', () => {
  test('returns correct label for custom', () => {
    expect(getDateRangeLabel('custom')).toBe('Custom');
  });

  test('returns correct label for 7days', () => {
    expect(getDateRangeLabel('7days')).toBe('Last 7 Days');
  });

  test('returns correct label for 30days', () => {
    expect(getDateRangeLabel('30days')).toBe('Last 30 Days');
  });

  test('returns correct label for 3months', () => {
    expect(getDateRangeLabel('3months')).toBe('Last 3 Months');
  });

  test('returns correct label for 6months', () => {
    expect(getDateRangeLabel('6months')).toBe('Last 6 Months');
  });

  test('returns the value itself for unknown preset', () => {
    expect(getDateRangeLabel('unknown')).toBe('unknown');
  });
});

describe('isDateInRange', () => {
  const dateRange = {
    from: new Date('2024-01-10'),
    to: new Date('2024-01-20'),
  };

  test('returns true for date within range', () => {
    const date = new Date('2024-01-15');
    expect(isDateInRange(date, dateRange)).toBe(true);
  });

  test('returns true for date at start of range', () => {
    const date = new Date('2024-01-10');
    expect(isDateInRange(date, dateRange)).toBe(true);
  });

  test('returns true for date at end of range', () => {
    const date = new Date('2024-01-20');
    expect(isDateInRange(date, dateRange)).toBe(true);
  });

  test('returns false for date before range', () => {
    const date = new Date('2024-01-05');
    expect(isDateInRange(date, dateRange)).toBe(false);
  });

  test('returns false for date after range', () => {
    const date = new Date('2024-01-25');
    expect(isDateInRange(date, dateRange)).toBe(false);
  });

  test('handles date as ISO string', () => {
    const dateString = '2024-01-15';
    expect(isDateInRange(dateString, dateRange)).toBe(true);
  });

  test('returns false for null date', () => {
    expect(isDateInRange(null, dateRange)).toBe(false);
  });

  test('returns false for invalid date range', () => {
    const date = new Date('2024-01-15');
    expect(isDateInRange(date, null)).toBe(false);
  });

  test('returns false for invalid date', () => {
    expect(isDateInRange('invalid date', dateRange)).toBe(false);
  });

  test('returns false for undefined date', () => {
    expect(isDateInRange(undefined, dateRange)).toBe(false);
  });

  test('handles date range with reverse order (from > to)', () => {
    const invalidRange = {
      from: new Date('2024-01-20'),
      to: new Date('2024-01-10'),
    };
    const date = new Date('2024-01-15');
    expect(isDateInRange(date, invalidRange)).toBe(false);
  });
});

