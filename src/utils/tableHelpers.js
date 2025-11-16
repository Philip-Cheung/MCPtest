/**
 * Returns the appropriate color indicator class based on percentage value
 * @param {number} value - Percentage value (0-100)
 * @returns {string} - Color class for the indicator dot
 */
export function getIndicatorColor(value) {
  if (value < 50) {
    return "bg-red-500";
  } else if (value < 75) {
    return "bg-yellow-500";
  }
  return "bg-green-500";
}

/**
 * Filters buildings based on search query, filters, and date range
 * @param {Array} data - Array of building objects
 * @param {Object} filters - Filter object {wellCompliance: string}
 * @param {string} searchQuery - Search term
 * @param {Object} dateRange - Date range object {from: Date, to: Date}
 * @returns {Array} - Filtered buildings
 */
export function filterBuildings(data, filters, searchQuery, dateRange = null) {
  let filtered = [...data];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter((building) =>
      building.name.toLowerCase().includes(query)
    );
  }

  // Apply WELL compliance filter
  if (filters.wellCompliance && filters.wellCompliance !== "all") {
    filtered = filtered.filter(
      (building) => building.wellCompliance === filters.wellCompliance
    );
  }

  // Apply date range filter
  if (dateRange && dateRange.from && dateRange.to) {
    filtered = filtered.filter((building) => {
      // If building has lastUpdated field, filter by it
      if (building.lastUpdated) {
        const buildingDate = new Date(building.lastUpdated);
        return buildingDate >= dateRange.from && buildingDate <= dateRange.to;
      }
      // Otherwise, include all buildings (no date filtering)
      return true;
    });
  }

  return filtered;
}

/**
 * Sorts buildings array by specified key and direction
 * @param {Array} data - Array of building objects
 * @param {string} sortKey - Key to sort by
 * @param {string} sortDirection - 'asc' or 'desc'
 * @returns {Array} - Sorted buildings
 */
export function sortBuildings(data, sortKey, sortDirection) {
  if (!sortKey) return data;

  return [...data].sort((a, b) => {
    let aVal = a[sortKey];
    let bVal = b[sortKey];

    // Handle string comparison (building name)
    if (typeof aVal === "string") {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    // Ascending order
    if (sortDirection === "asc") {
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    }
    
    // Descending order
    return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
  });
}

/**
 * Paginates data array
 * @param {Array} data - Array of items to paginate
 * @param {number} page - Current page (1-indexed)
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Object} - {items: Array, totalPages: number}
 */
export function paginateData(data, page, itemsPerPage) {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const items = data.slice(startIndex, endIndex);

  return {
    items,
    totalPages,
    currentPage: page,
    totalItems: data.length,
  };
}

