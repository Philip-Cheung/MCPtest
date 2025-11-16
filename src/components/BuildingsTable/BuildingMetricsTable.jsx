/**
 * BuildingMetricsTable - Displays detailed metrics for an expanded building row
 */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { IndicatorDot } from "../shared/IndicatorDot";

export function BuildingMetricsTable({ building, dateRange = "30days" }) {
  // Use time-variant metrics if available, otherwise fall back to base metrics
  const metrics = building.metricsByPeriod && building.metricsByPeriod[dateRange] 
    ? building.metricsByPeriod[dateRange] 
    : building.metrics;

  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent border-b">
          <TableHead className="font-semibold text-foreground px-4 py-2">Metric</TableHead>
          <TableHead className="font-semibold text-foreground px-4 py-2">Target</TableHead>
          <TableHead className="font-semibold text-foreground px-4 py-2">% Time In Targets</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {metrics.airQuality.map((metric) => (
          <TableRow key={metric.name} className="hover:bg-transparent">
            <TableCell className="px-4 py-2">
              <div>
                <div className="font-medium text-foreground">
                  {metric.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Air Quality
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-2 text-foreground">{metric.target}</TableCell>
            <TableCell className="px-4 py-2">
              <IndicatorDot value={metric.timeInTarget} />
            </TableCell>
          </TableRow>
        ))}
        {metrics.thermalComfort.map((metric) => (
          <TableRow key={metric.name} className="hover:bg-transparent">
            <TableCell className="px-4 py-2">
              <div>
                <div className="font-medium text-foreground">
                  {metric.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  Thermal Comfort
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-2 text-foreground">{metric.target}</TableCell>
            <TableCell className="px-4 py-2">
              <IndicatorDot value={metric.timeInTarget} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

