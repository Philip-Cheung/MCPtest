/**
 * BuildingsTable - Main orchestrator component for the buildings table
 * Refactored to use subcomponents for better maintainability
 */
import { useState, useMemo } from "react";
import { usePagination } from "../../hooks/usePagination";
import { useFilters } from "../../hooks/useFilters";
import { useExpandable } from "../../hooks/useExpandable";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { buildings } from "../../data/buildings";
import { filterBuildings } from "../../utils/tableHelpers";
import { BuildingsTableControls } from "./BuildingsTableControls";
import { BuildingsTableHeader } from "./BuildingsTableHeader";
import { BuildingRow } from "./BuildingRow";
import { BuildingsTablePagination } from "./BuildingsTablePagination";

export function BuildingsTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("30days");
  const [dateRangeValue, setDateRangeValue] = useState(null);

  // Use custom hooks for state management
  const { filters, updateFilter } = useFilters({ wellCompliance: "all" });
  const { isExpanded, toggle: toggleRow } = useExpandable();

  // Apply time-variant data based on selected date range
  const buildingsWithTimeData = useMemo(() => {
    console.log('Total buildings:', buildings.length);
    const result = buildings.map(building => {
      if (building.dataByPeriod && building.dataByPeriod[dateRange]) {
        const periodData = building.dataByPeriod[dateRange];
        return {
          ...building,
          airQuality: periodData.airQuality,
          thermalComfort: periodData.thermalComfort,
        };
      }
      return building;
    });
    console.log('Buildings with time data:', result.length);
    return result;
  }, [dateRange]);

  // Apply filters
  const filteredData = useMemo(() => {
    const result = filterBuildings(buildingsWithTimeData, filters, searchQuery, dateRangeValue);
    console.log('Filtered data:', result.length);
    return result;
  }, [buildingsWithTimeData, searchQuery, filters, dateRangeValue]);

  // Use pagination hook
  const {
    paginatedData,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
    canGoNext,
    canGoPrevious,
  } = usePagination(filteredData);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (value) => {
    updateFilter('wellCompliance', value);
    setCurrentPage(1);
  };

  console.log('Paginated items:', paginatedData.items.length, 'of', paginatedData.totalItems);
  console.log('Current page:', currentPage, 'Items per page:', itemsPerPage);

  return (
    <div className="space-y-4">
      {/* Controls Row */}
      <BuildingsTableControls
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onDateRangeValueChange={setDateRangeValue}
        filterValue={filters.wellCompliance}
        onFilterChange={handleFilterChange}
      />

      {/* Table */}
      <div className="rounded-lg border border-border bg-card shadow-sm overflow-hidden">
        <Table>
          <BuildingsTableHeader />
          <TableBody>
            {paginatedData.items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No buildings found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.items.map((building) => (
                <BuildingRow
                  key={building.id}
                  building={building}
                  isExpanded={isExpanded(building.id)}
                  onToggle={toggleRow}
                  dateRange={dateRange}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <BuildingsTablePagination
        currentPage={currentPage}
        totalPages={paginatedData.totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
        canGoNext={canGoNext}
        canGoPrevious={canGoPrevious}
      />
    </div>
  );
}

