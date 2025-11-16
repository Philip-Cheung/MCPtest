/**
 * BuildingRow - Single building row with expand/collapse functionality
 */
import { Link } from "react-router-dom";
import { ChevronDown, ChevronRight } from "lucide-react";
import { TableCell, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { IndicatorDot } from "../shared/IndicatorDot";
import { BuildingMetricsTable } from "./BuildingMetricsTable";

export function BuildingRow({ building, isExpanded, onToggle, dateRange }) {
  return (
    <>
      <TableRow
        className="cursor-pointer border-b border-border"
        onClick={() => onToggle(building.id)}
      >
        <TableCell className="px-4 py-3">
          {isExpanded ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
        </TableCell>
          <TableCell className="px-4 py-3">
            <div className="flex items-center gap-3">
              <img 
                src={building.image} 
                alt={building.name}
                className="h-10 w-10 rounded-md object-cover"
              />
              <Link
                to={`/building/${building.id}`}
                className="text-foreground hover:text-foreground/80 hover:underline font-medium"
                onClick={(e) => e.stopPropagation()}
              >
                {building.name}
              </Link>
            </div>
          </TableCell>
        <TableCell className="px-4 py-3 text-foreground">{building.spaces}</TableCell>
        <TableCell className="px-4 py-3">
          <Badge variant="minimal">
            {building.wellCompliance === "passing" ? (
              <>
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                Passing
              </>
            ) : building.wellCompliance === "needs-attention" ? (
              <>
                <span className="h-2 w-2 rounded-full bg-orange-500 mr-2" />
                Needs Attention
              </>
            ) : (
              <>
                <span className="h-2 w-2 rounded-full bg-gray-400 mr-2" />
                No Report
              </>
            )}
          </Badge>
        </TableCell>
        <TableCell className="px-4 py-3">
          <IndicatorDot value={building.airQuality} />
        </TableCell>
        <TableCell className="px-4 py-3">
          <IndicatorDot value={building.thermalComfort} />
        </TableCell>
      </TableRow>
        {isExpanded && (
          <TableRow className="hover:bg-transparent border-b border-border">
            <TableCell colSpan={6} className="bg-muted/20 p-0">
              <div className="px-6 py-4">
                <BuildingMetricsTable building={building} dateRange={dateRange} />
              </div>
            </TableCell>
          </TableRow>
        )}
    </>
  );
}

