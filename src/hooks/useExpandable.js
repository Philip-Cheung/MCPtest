/**
 * Custom hook for managing expandable row state
 */
import { useState, useCallback } from 'react';

/**
 * Hook to manage expandable rows (e.g., table rows)
 * @param {Array} initialExpanded - Array of initially expanded item IDs
 * @returns {Object} Expandable state and handlers
 */
export function useExpandable(initialExpanded = []) {
  const [expandedItems, setExpandedItems] = useState(new Set(initialExpanded));

  // Toggle a single item
  const toggle = useCallback((id) => {
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  }, []);

  // Expand a specific item
  const expand = useCallback((id) => {
    setExpandedItems((prev) => new Set([...prev, id]));
  }, []);

  // Collapse a specific item
  const collapse = useCallback((id) => {
    setExpandedItems((prev) => {
      const newExpanded = new Set(prev);
      newExpanded.delete(id);
      return newExpanded;
    });
  }, []);

  // Expand all items from a list
  const expandAll = useCallback((ids) => {
    setExpandedItems(new Set(ids));
  }, []);

  // Collapse all items
  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  // Check if an item is expanded
  const isExpanded = useCallback(
    (id) => {
      return expandedItems.has(id);
    },
    [expandedItems]
  );

  // Get count of expanded items
  const expandedCount = expandedItems.size;

  return {
    expandedItems,
    isExpanded,
    toggle,
    expand,
    collapse,
    expandAll,
    collapseAll,
    expandedCount,
  };
}

