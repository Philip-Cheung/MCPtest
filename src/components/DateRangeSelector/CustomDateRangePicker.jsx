/**
 * CustomDateRangePicker - Calendar popover for custom date range selection
 */
import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "../../utils/cn";

export function CustomDateRangePicker({ customRange, onRangeSelect }) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleRangeSelect = (range) => {
    onRangeSelect(range);
    if (range?.from && range?.to) {
      setPopoverOpen(false);
    }
  };

  return (
    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-9 w-[280px] justify-start text-left font-normal",
            !customRange && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {customRange?.from && customRange?.to ? (
            <>
              {customRange.from.toLocaleDateString()} - {customRange.to.toLocaleDateString()}
            </>
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={customRange?.from || new Date()}
          selected={customRange}
          onSelect={handleRangeSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

