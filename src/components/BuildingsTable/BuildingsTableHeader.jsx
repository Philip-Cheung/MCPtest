/**
 * BuildingsTableHeader - Table header row component
 */
import {
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export function BuildingsTableHeader() {
  return (
    <TableHeader>
      <TableRow className="bg-muted/50 hover:bg-muted/50">
        <TableHead className="w-[40px]"></TableHead>
        <TableHead className="px-4 py-3">
          <div className="font-semibold text-foreground">Building</div>
        </TableHead>
        <TableHead className="px-4 py-3">
          <div className="font-semibold text-foreground">Spaces</div>
        </TableHead>
        <TableHead className="px-4 py-3">
          <div className="font-semibold text-foreground">WELL V2 Compliance</div>
        </TableHead>
        <TableHead className="px-4 py-3">
          <div className="font-semibold text-foreground">Air Quality</div>
        </TableHead>
        <TableHead className="px-4 py-3">
          <div className="font-semibold text-foreground">Thermal Comfort</div>
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}

