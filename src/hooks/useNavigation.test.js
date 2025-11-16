/**
 * Tests for useNavigation hook
 */
import { renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useNavigation } from './useNavigation';

const mockItems = [
  { title: 'Home', url: '/', icon: null },
  { title: 'About', url: '/about', icon: null },
  { title: 'Contact', url: '/contact', icon: null },
];

const wrapper = ({ children, initialRoute = '/' }) => (
  <MemoryRouter initialEntries={[initialRoute]}>{children}</MemoryRouter>
);

describe('useNavigation', () => {
  test('returns current path', () => {
    const { result } = renderHook(() => useNavigation(mockItems), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/about' }),
    });
    
    expect(result.current.currentPath).toBe('/about');
  });

  test('identifies home route as active', () => {
    const { result } = renderHook(() => useNavigation(mockItems), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/' }),
    });
    
    expect(result.current.isItemActive('/')).toBe(true);
    expect(result.current.isItemActive('/about')).toBe(false);
  });

  test('identifies non-home route as active', () => {
    const { result } = renderHook(() => useNavigation(mockItems), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/about' }),
    });
    
    expect(result.current.isItemActive('/about')).toBe(true);
    expect(result.current.isItemActive('/')).toBe(false);
  });

  test('hasActiveItem returns true when an item is active', () => {
    const { result } = renderHook(() => useNavigation(mockItems), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/about' }),
    });
    
    expect(result.current.hasActiveItem).toBe(true);
  });

  test('hasActiveItem returns false when no item is active', () => {
    const items = [
      { title: 'About', url: '/about', icon: null },
      { title: 'Contact', url: '/contact', icon: null },
    ];
    
    const { result } = renderHook(() => useNavigation(items), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/' }),
    });
    
    expect(result.current.hasActiveItem).toBe(false);
  });

  test('returns active item when found', () => {
    const { result } = renderHook(() => useNavigation(mockItems), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/contact' }),
    });
    
    expect(result.current.activeItem).toEqual(mockItems[2]);
  });

  test('returns undefined when no active item', () => {
    const items = [
      { title: 'About', url: '/about', icon: null },
    ];
    
    const { result } = renderHook(() => useNavigation(items), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/' }),
    });
    
    expect(result.current.activeItem).toBeUndefined();
  });

  test('handles empty items array', () => {
    const { result } = renderHook(() => useNavigation([]), {
      wrapper,
    });
    
    expect(result.current.hasActiveItem).toBe(false);
    expect(result.current.activeItem).toBeUndefined();
  });

  test('handles home route edge case correctly', () => {
    const { result } = renderHook(() => useNavigation(mockItems), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/' }),
    });
    
    // Home route should be active when at /
    expect(result.current.isItemActive('/')).toBe(true);
    
    // But not when at another route
    const { result: result2 } = renderHook(() => useNavigation(mockItems), {
      wrapper: (props) => wrapper({ ...props, initialRoute: '/about' }),
    });
    
    expect(result2.current.isItemActive('/')).toBe(false);
  });
});

