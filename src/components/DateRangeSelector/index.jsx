/**
 * DateRangeSelector - Main orchestrator for date range selection
 * Refactored to use subcomponents for better maintainability
 */
import { DEFAULT_DATE_RANGE } from "../../config/constants";
import { useDateRange } from "../../hooks/useDateRange";
import { DateRangePresets } from "./DateRangePresets";
import { CustomDateRangePicker } from "./CustomDateRangePicker";

export function DateRangeSelector({ value = DEFAULT_DATE_RANGE, onChange, onDateRangeChange }) {
  // Use date range hook for state management
  const { customRange, selectCustomRange } = useDateRange(value, onDateRangeChange);

  return (
    <div className="flex items-center gap-2">
      <DateRangePresets value={value} onChange={onChange} />
      
      {value === "custom" && (
        <CustomDateRangePicker
          customRange={customRange}
          onRangeSelect={selectCustomRange}
        />
      )}
    </div>
  );
}

