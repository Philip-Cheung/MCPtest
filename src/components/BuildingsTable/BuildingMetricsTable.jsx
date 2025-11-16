/**
 * BuildingMetricsTable - Displays detailed metrics for an expanded building row
 * Uses grid layout to align with parent table columns
 */
import { IndicatorDot } from "../shared/IndicatorDot";

export function BuildingMetricsTable({ building, dateRange = "30days" }) {
  // Use time-variant metrics if available, otherwise fall back to base metrics
  const metrics = building.metricsByPeriod && building.metricsByPeriod[dateRange] 
    ? building.metricsByPeriod[dateRange] 
    : building.metrics;

  const allMetrics = [
    ...metrics.airQuality.map(m => ({ ...m, category: 'Air Quality' })),
    ...metrics.thermalComfort.map(m => ({ ...m, category: 'Thermal Comfort' }))
  ];

  return (
    <div className="w-full">
      {/* Header row - aligns with parent table columns */}
      <div className="grid grid-cols-[40px_40px_1fr_auto_1fr_auto_auto] gap-4 border-b border-border pb-2 mb-2">
        <div></div> {/* Chevron column spacer */}
        <div></div> {/* Building image spacer */}
        <div className="px-4 font-semibold text-foreground">Metric</div>
        <div className="px-4 font-semibold text-foreground">Target</div>
        <div className="px-4 font-semibold text-foreground">% Time In Targets</div>
        <div></div> {/* Air Quality column spacer */}
        <div></div> {/* Thermal Comfort column spacer */}
      </div>
      
      {/* Metric rows - align with parent table columns */}
      <div className="space-y-1">
        {allMetrics.map((metric) => (
          <div 
            key={`${metric.category}-${metric.name}`}
            className="grid grid-cols-[40px_40px_1fr_auto_1fr_auto_auto] gap-4 py-2 hover:bg-muted/30 rounded"
          >
            <div></div> {/* Chevron column spacer */}
            <div></div> {/* Building image spacer */}
            <div className="px-4">
              <div className="font-medium text-foreground">{metric.name}</div>
              <div className="text-xs text-muted-foreground">{metric.category}</div>
            </div>
            <div className="px-4 text-foreground text-left">{metric.target}</div>
            <div className="px-4">
              <IndicatorDot value={metric.timeInTarget} />
            </div>
            <div></div> {/* Air Quality column spacer */}
            <div></div> {/* Thermal Comfort column spacer */}
          </div>
        ))}
      </div>
    </div>
  );
}

