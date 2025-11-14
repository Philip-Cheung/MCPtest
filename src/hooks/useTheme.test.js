import { renderHook, act } from '@testing-library/react';
import { useTheme } from './useTheme';

beforeEach(() => {
  localStorage.clear();
  document.documentElement.classList.remove('dark');
});

test('defaults to light theme', () => {
  const { result } = renderHook(() => useTheme());
  expect(result.current.theme).toBe('light');
});

test('toggles theme', () => {
  const { result } = renderHook(() => useTheme());
  act(() => {
    result.current.toggleTheme();
  });
  expect(result.current.theme).toBe('dark');
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});

test('persists theme to localStorage', () => {
  const { result } = renderHook(() => useTheme());
  act(() => {
    result.current.toggleTheme();
  });
  expect(localStorage.getItem('theme')).toBe('dark');
});

