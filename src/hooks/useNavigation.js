/**
 * Custom hook for navigation state and logic
 */
import { useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

/**
 * Hook to manage navigation state
 * @param {Array} items - Navigation items
 * @returns {Object} Navigation state and helpers
 */
export function useNavigation(items = []) {
  const location = useLocation();

  // Check if a specific item is active
  const isItemActive = useCallback(
    (itemUrl) => {
      if (itemUrl === '/' && location.pathname === '/') {
        return true;
      }
      return location.pathname === itemUrl;
    },
    [location.pathname]
  );

  // Check if any item in a group is active
  const hasActiveItem = useMemo(() => {
    return items.some((item) => isItemActive(item.url));
  }, [items, isItemActive]);

  // Get the currently active item
  const activeItem = useMemo(() => {
    return items.find((item) => isItemActive(item.url));
  }, [items, isItemActive]);

  return {
    currentPath: location.pathname,
    isItemActive,
    hasActiveItem,
    activeItem,
  };
}

