/**
 * NavMain - Main navigation component orchestrator
 * Routes to appropriate navigation variant based on sidebar state and configuration
 */
import { useSidebar } from "../ui/sidebar";
import { NavMainStandard } from "./NavMainStandard";
import { NavMainCollapsed } from "./NavMainCollapsed";
import { NavMainExpanded } from "./NavMainExpanded";

export function NavMain({ items, label, collapsible = false, sectionIcon }) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Non-collapsible navigation (always standard)
  if (!collapsible) {
    return <NavMainStandard items={items} label={label} />;
  }

  // Collapsed sidebar with collapsible sections
  if (isCollapsed && sectionIcon) {
    return <NavMainCollapsed items={items} sectionIcon={sectionIcon} />;
  }

  // Expanded sidebar with collapsible sections
  return <NavMainExpanded items={items} label={label} />;
}

