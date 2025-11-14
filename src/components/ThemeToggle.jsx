import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useThemeContext } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeContext();
  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

