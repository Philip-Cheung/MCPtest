/**
 * Comprehensive tests for tableHelpers utility functions
 */
import {
  getIndicatorColor,
  filterBuildings,
  sortBuildings,
  paginateData,
} from './tableHelpers';

describe('getIndicatorColor', () => {
  test('returns red for values below 50', () => {
    expect(getIndicatorColor(0)).toBe('bg-red-500');
    expect(getIndicatorColor(25)).toBe('bg-red-500');
    expect(getIndicatorColor(49.9)).toBe('bg-red-500');
  });

  test('returns yellow for values between 50 and 74', () => {
    expect(getIndicatorColor(50)).toBe('bg-yellow-500');
    expect(getIndicatorColor(60)).toBe('bg-yellow-500');
    expect(getIndicatorColor(74.9)).toBe('bg-yellow-500');
  });

  test('returns green for values 75 and above', () => {
    expect(getIndicatorColor(75)).toBe('bg-green-500');
    expect(getIndicatorColor(90)).toBe('bg-green-500');
    expect(getIndicatorColor(100)).toBe('bg-green-500');
  });

  test('handles edge cases', () => {
    expect(getIndicatorColor(49.99999)).toBe('bg-red-500');
    expect(getIndicatorColor(50.00001)).toBe('bg-yellow-500');
    expect(getIndicatorColor(74.99999)).toBe('bg-yellow-500');
    expect(getIndicatorColor(75.00001)).toBe('bg-green-500');
  });
});

describe('filterBuildings', () => {
  const mockBuildings = [
    {
      id: '1',
      name: 'Calgary Office',
      wellCompliance: 'passing',
      lastUpdated: new Date('2024-01-15').toISOString(),
    },
    {
      id: '2',
      name: 'Toronto Building',
      wellCompliance: 'needs-attention',
      lastUpdated: new Date('2024-01-20').toISOString(),
    },
    {
      id: '3',
      name: 'Vancouver Center',
      wellCompliance: 'passing',
      lastUpdated: new Date('2024-01-25').toISOString(),
    },
    {
      id: '4',
      name: 'Montreal Office',
      wellCompliance: 'needs-attention',
      lastUpdated: new Date('2024-01-10').toISOString(),
    },
  ];

  test('returns all buildings when no filters applied', () => {
    const result = filterBuildings(mockBuildings, {}, '');
    expect(result).toHaveLength(4);
  });

  test('filters by search query (case insensitive)', () => {
    const result = filterBuildings(mockBuildings, {}, 'calgary');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Calgary Office');
  });

  test('filters by search query with partial match', () => {
    const result = filterBuildings(mockBuildings, {}, 'office');
    expect(result).toHaveLength(2);
    expect(result.map(b => b.name)).toContain('Calgary Office');
    expect(result.map(b => b.name)).toContain('Montreal Office');
  });

  test('filters by wellCompliance "passing"', () => {
    const result = filterBuildings(mockBuildings, { wellCompliance: 'passing' }, '');
    expect(result).toHaveLength(2);
    expect(result.every(b => b.wellCompliance === 'passing')).toBe(true);
  });

  test('filters by wellCompliance "needs-attention"', () => {
    const result = filterBuildings(mockBuildings, { wellCompliance: 'needs-attention' }, '');
    expect(result).toHaveLength(2);
    expect(result.every(b => b.wellCompliance === 'needs-attention')).toBe(true);
  });

  test('filters by wellCompliance "all" returns all buildings', () => {
    const result = filterBuildings(mockBuildings, { wellCompliance: 'all' }, '');
    expect(result).toHaveLength(4);
  });

  test('combines search and wellCompliance filters', () => {
    const result = filterBuildings(mockBuildings, { wellCompliance: 'passing' }, 'calgary');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Calgary Office');
  });

  test('filters by date range', () => {
    const dateRange = {
      from: new Date('2024-01-15'),
      to: new Date('2024-01-25'),
    };
    const result = filterBuildings(mockBuildings, {}, '', dateRange);
    expect(result).toHaveLength(3);
    expect(result.map(b => b.id)).toContain('1');
    expect(result.map(b => b.id)).toContain('2');
    expect(result.map(b => b.id)).toContain('3');
  });

  test('includes buildings without lastUpdated when date range is applied', () => {
    const buildingsWithoutDate = [
      ...mockBuildings,
      { id: '5', name: 'Edmonton Office', wellCompliance: 'passing' },
    ];
    const dateRange = {
      from: new Date('2024-01-15'),
      to: new Date('2024-01-25'),
    };
    const result = filterBuildings(buildingsWithoutDate, {}, '', dateRange);
    expect(result.some(b => b.id === '5')).toBe(true);
  });

  test('returns empty array when no buildings match', () => {
    const result = filterBuildings(mockBuildings, {}, 'nonexistent');
    expect(result).toHaveLength(0);
  });

  test('handles empty building array', () => {
    const result = filterBuildings([], { wellCompliance: 'passing' }, 'test');
    expect(result).toHaveLength(0);
  });

  test('combines all filters', () => {
    const dateRange = {
      from: new Date('2024-01-15'),
      to: new Date('2024-01-25'),
    };
    const result = filterBuildings(
      mockBuildings,
      { wellCompliance: 'passing' },
      'calgary',
      dateRange
    );
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Calgary Office');
  });

  test('does not mutate original array', () => {
    const original = [...mockBuildings];
    filterBuildings(mockBuildings, { wellCompliance: 'passing' }, '');
    expect(mockBuildings).toEqual(original);
  });
});

describe('sortBuildings', () => {
  const mockBuildings = [
    { id: '1', name: 'Charlie Building', airQuality: 80, spaces: 5 },
    { id: '2', name: 'Alpha Building', airQuality: 60, spaces: 10 },
    { id: '3', name: 'Bravo Building', airQuality: 90, spaces: 3 },
  ];

  test('returns original data when no sort key provided', () => {
    const result = sortBuildings(mockBuildings, null, 'asc');
    expect(result).toEqual(mockBuildings);
  });

  test('sorts by name ascending (case insensitive)', () => {
    const result = sortBuildings(mockBuildings, 'name', 'asc');
    expect(result[0].name).toBe('Alpha Building');
    expect(result[1].name).toBe('Bravo Building');
    expect(result[2].name).toBe('Charlie Building');
  });

  test('sorts by name descending', () => {
    const result = sortBuildings(mockBuildings, 'name', 'desc');
    expect(result[0].name).toBe('Charlie Building');
    expect(result[1].name).toBe('Bravo Building');
    expect(result[2].name).toBe('Alpha Building');
  });

  test('sorts by numeric value ascending', () => {
    const result = sortBuildings(mockBuildings, 'airQuality', 'asc');
    expect(result[0].airQuality).toBe(60);
    expect(result[1].airQuality).toBe(80);
    expect(result[2].airQuality).toBe(90);
  });

  test('sorts by numeric value descending', () => {
    const result = sortBuildings(mockBuildings, 'airQuality', 'desc');
    expect(result[0].airQuality).toBe(90);
    expect(result[1].airQuality).toBe(80);
    expect(result[2].airQuality).toBe(60);
  });

  test('does not mutate original array', () => {
    const original = [...mockBuildings];
    sortBuildings(mockBuildings, 'name', 'asc');
    expect(mockBuildings).toEqual(original);
  });

  test('handles empty array', () => {
    const result = sortBuildings([], 'name', 'asc');
    expect(result).toEqual([]);
  });

  test('handles single item array', () => {
    const singleItem = [mockBuildings[0]];
    const result = sortBuildings(singleItem, 'name', 'asc');
    expect(result).toEqual(singleItem);
  });

  test('maintains stable sort for equal values', () => {
    const buildings = [
      { id: '1', name: 'Building A', value: 50 },
      { id: '2', name: 'Building B', value: 50 },
      { id: '3', name: 'Building C', value: 50 },
    ];
    const result = sortBuildings(buildings, 'value', 'asc');
    expect(result.map(b => b.id)).toEqual(['1', '2', '3']);
  });
});

describe('paginateData', () => {
  const mockData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
  }));

  test('paginates data correctly for first page', () => {
    const result = paginateData(mockData, 1, 10);
    expect(result.items).toHaveLength(10);
    expect(result.items[0].id).toBe(1);
    expect(result.items[9].id).toBe(10);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(5);
    expect(result.totalItems).toBe(50);
  });

  test('paginates data correctly for middle page', () => {
    const result = paginateData(mockData, 3, 10);
    expect(result.items).toHaveLength(10);
    expect(result.items[0].id).toBe(21);
    expect(result.items[9].id).toBe(30);
    expect(result.currentPage).toBe(3);
  });

  test('paginates data correctly for last page', () => {
    const result = paginateData(mockData, 5, 10);
    expect(result.items).toHaveLength(10);
    expect(result.items[0].id).toBe(41);
    expect(result.items[9].id).toBe(50);
  });

  test('handles partial last page', () => {
    const result = paginateData(mockData, 5, 12);
    expect(result.items).toHaveLength(2); // 50 - (4 * 12) = 2
    expect(result.items[0].id).toBe(49);
    expect(result.items[1].id).toBe(50);
  });

  test('handles empty data array', () => {
    const result = paginateData([], 1, 10);
    expect(result.items).toHaveLength(0);
    expect(result.totalPages).toBe(0);
    expect(result.totalItems).toBe(0);
  });

  test('handles data smaller than page size', () => {
    const smallData = mockData.slice(0, 5);
    const result = paginateData(smallData, 1, 10);
    expect(result.items).toHaveLength(5);
    expect(result.totalPages).toBe(1);
  });

  test('calculates total pages correctly', () => {
    expect(paginateData(mockData, 1, 10).totalPages).toBe(5);
    expect(paginateData(mockData, 1, 25).totalPages).toBe(2);
    expect(paginateData(mockData, 1, 50).totalPages).toBe(1);
    expect(paginateData(mockData, 1, 100).totalPages).toBe(1);
  });

  test('handles page beyond total pages', () => {
    const result = paginateData(mockData, 10, 10);
    expect(result.items).toHaveLength(0);
    expect(result.currentPage).toBe(10);
    expect(result.totalPages).toBe(5);
  });

  test('handles different page sizes', () => {
    const result25 = paginateData(mockData, 1, 25);
    expect(result25.items).toHaveLength(25);
    expect(result25.totalPages).toBe(2);

    const result5 = paginateData(mockData, 1, 5);
    expect(result5.items).toHaveLength(5);
    expect(result5.totalPages).toBe(10);
  });

  test('does not mutate original data', () => {
    const original = [...mockData];
    paginateData(mockData, 2, 10);
    expect(mockData).toEqual(original);
  });
});

