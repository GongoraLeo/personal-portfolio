import React from 'react';
import useDarkMode from '../hooks/useDarkMode';
import { SunIcon, MoonIcon, DesktopIcon } from './icons';

const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useDarkMode();

  const cycleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const iconMap = {
    light: <SunIcon className="w-6 h-6" />,
    dark: <MoonIcon className="w-6 h-6" />,
    system: <DesktopIcon className="w-6 h-6" />,
  };

  return (
    <button
      onClick={cycleTheme}
      className="text-zinc-600 hover:text-lime-600 dark:text-stone-300 dark:hover:text-lime-400 transition-colors"
      aria-label={`Cambiar a tema ${theme === 'light' ? 'oscuro' : theme === 'dark' ? 'del sistema' : 'claro'}`}
    >
      {iconMap[theme]}
    </button>
  );
};

export default ThemeToggle;
