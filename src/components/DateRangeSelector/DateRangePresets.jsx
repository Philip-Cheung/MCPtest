/**
 * DateRangePresets - Preset tabs for date range selection
 */
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { DATE_RANGE_PRESETS } from "../../config/constants";

export function DateRangePresets({ value, onChange }) {
  return (
    <Tabs value={value} onValueChange={onChange}>
      <TabsList>
        {DATE_RANGE_PRESETS.map((range) => (
          <TabsTrigger key={range.value} value={range.value}>
            {range.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

