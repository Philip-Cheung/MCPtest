/**
 * Custom hook for pagination state and logic
 */
import { useState, useMemo } from 'react';
import { DEFAULT_ITEMS_PER_PAGE } from '../config/constants';
import { paginateData } from '../utils/tableHelpers';

/**
 * Hook to manage pagination state
 * @param {Array} data - The data array to paginate
 * @param {number} initialItemsPerPage - Initial items per page (default: 10)
 * @returns {Object} Pagination state and handlers
 */
export function usePagination(data = [], initialItemsPerPage = DEFAULT_ITEMS_PER_PAGE) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    return paginateData(data, currentPage, itemsPerPage);
  }, [data, currentPage, itemsPerPage]);

  // Reset to page 1 when data changes
  const resetPage = () => setCurrentPage(1);

  // Navigate to next page
  const nextPage = () => {
    setCurrentPage((prev) => Math.min(paginatedData.totalPages, prev + 1));
  };

  // Navigate to previous page
  const previousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  // Go to specific page
  const goToPage = (page) => {
    const pageNumber = Math.max(1, Math.min(paginatedData.totalPages, page));
    setCurrentPage(pageNumber);
  };

  // Change items per page and reset to page 1
  const changeItemsPerPage = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  return {
    currentPage,
    itemsPerPage,
    paginatedData,
    totalPages: paginatedData.totalPages,
    totalItems: paginatedData.totalItems,
    setCurrentPage,
    setItemsPerPage: changeItemsPerPage,
    resetPage,
    nextPage,
    previousPage,
    goToPage,
    canGoNext: currentPage < paginatedData.totalPages,
    canGoPrevious: currentPage > 1,
  };
}

