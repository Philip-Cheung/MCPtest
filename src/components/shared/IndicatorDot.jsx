/**
 * IndicatorDot - Reusable component for displaying percentage values with color indicators
 */
import { cn } from "../../utils/cn";
import { getIndicatorColor } from "../../utils/tableHelpers";

/**
 * Displays a colored dot indicator with a percentage value
 * @param {number} value - The percentage value to display (0-100)
 * @param {string} className - Additional CSS classes
 * @param {number} decimalPlaces - Number of decimal places to show (default: 1)
 */
export function IndicatorDot({ value, className, decimalPlaces = 1 }) {
  return (
    <span className={cn("flex items-center gap-2 text-foreground", className)}>
      <span 
        className={cn(
          "h-2 w-2 rounded-full flex-shrink-0", 
          getIndicatorColor(value)
        )} 
      />
      <span className="font-medium">
        {value.toFixed(decimalPlaces)}%
      </span>
    </span>
  );
}

