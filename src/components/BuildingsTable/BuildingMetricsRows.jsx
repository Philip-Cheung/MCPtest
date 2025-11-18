/**
 * BuildingMetricsRows - Renders expanded metrics as true table rows
 * aligned to the parent table's 6 columns.
 */
import { TableCell, TableRow } from "../ui/table";
import { IndicatorDot } from "../shared/IndicatorDot";

export function BuildingMetricsRows({ building, dateRange = "30days" }) {
  const metrics =
    building.metricsByPeriod && building.metricsByPeriod[dateRange]
      ? building.metricsByPeriod[dateRange]
      : building.metrics;

  const allMetrics = [
    ...metrics.airQuality.map((m) => ({ ...m, category: "Air Quality" })),
    ...metrics.thermalComfort.map((m) => ({ ...m, category: "Thermal Comfort" })),
  ];

  return (
    <>
      {/* Section header row aligned to parent columns */}
      <TableRow className="hover:bg-transparent bg-muted/20">
        <TableCell className="p-0" />
        <TableCell className="px-4 py-2 font-semibold text-foreground">
          <div className="ml-[52px]">Metric</div>
        </TableCell>
        <TableCell className="px-4 py-2 font-semibold text-foreground">Target</TableCell>
        <TableCell className="px-4 py-2 font-semibold text-foreground">% Time In Targets</TableCell>
        <TableCell className="p-0" />
        <TableCell className="p-0" />
      </TableRow>

      {allMetrics.map((metric) => (
        <TableRow key={`${metric.category}-${metric.name}`} className="hover:bg-transparent">
          {/* Column 1: chevron spacer */}
          <TableCell className="p-0" />
          {/* Column 2: metric text, offset to account for building image + gap (40 + 12 = 52px) */}
          <TableCell className="px-4 py-2">
            <div className="ml-[52px]">
              <div className="font-medium text-foreground">{metric.name}</div>
              <div className="text-xs text-muted-foreground">{metric.category}</div>
            </div>
          </TableCell>
          {/* Column 3: target (aligns with spaces) */}
          <TableCell className="px-4 py-2 text-foreground">{metric.target}</TableCell>
          {/* Column 4: % time in targets (aligns with WELL V2 Compliance) */}
          <TableCell className="px-4 py-2">
            <IndicatorDot value={metric.timeInTarget} />
          </TableCell>
          {/* Column 5 & 6 remain empty to preserve alignment with AQ and Thermal columns */}
          <TableCell className="p-0" />
          <TableCell className="p-0" />
        </TableRow>
      ))}
    </>
  );
}


