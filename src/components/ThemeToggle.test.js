import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';

const renderWithProvider = (component) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

test('toggles theme on click', async () => {
  const user = userEvent.setup();
  renderWithProvider(<ThemeToggle />);
  const button = screen.getByRole('button');
  await user.click(button);
  expect(document.documentElement.classList.contains('dark')).toBe(true);
});

