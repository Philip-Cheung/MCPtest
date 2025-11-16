/**
 * BuildingsTableControls - Search, filter, and date range controls
 */
import { Search, Filter } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { DateRangeSelector } from "../DateRangeSelector/index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function BuildingsTableControls({
  searchQuery,
  onSearchChange,
  dateRange,
  onDateRangeChange,
  onDateRangeValueChange,
  filterValue,
  onFilterChange,
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <DateRangeSelector 
        value={dateRange} 
        onChange={onDateRangeChange}
        onDateRangeChange={onDateRangeValueChange}
      />
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Filter className="h-4 w-4 text-foreground" />
              <span className="sr-only">Filter buildings</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuRadioGroup
              value={filterValue}
              onValueChange={onFilterChange}
            >
              <DropdownMenuRadioItem value="all">All Buildings</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="passing">Passing</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="needs-attention">Needs Attention</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="no-report">No Report</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search buildings..."
            value={searchQuery}
            onChange={onSearchChange}
            className="pl-9 h-9"
          />
        </div>
      </div>
    </div>
  );
}

