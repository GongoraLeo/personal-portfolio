import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

function useDarkMode(): [Theme, (theme: Theme) => void] {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = window.localStorage.getItem('theme') as Theme | null;
      if (storedTheme && ['light', 'dark', 'system'].includes(storedTheme)) {
        return storedTheme;
      }
    }
    return 'system';
  });

  const setTheme = (newTheme: Theme) => {
    window.localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Esta es la única función que modifica el DOM.
    // Se basa en el estado actual de React ('theme') como única fuente de verdad.
    const applyTheme = () => {
      const systemPrefersDark = mediaQuery.matches;
      
      if (theme === 'dark' || (theme === 'system' && systemPrefersDark)) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    // Llamamos a la función cada vez que el estado del tema cambia.
    applyTheme();

    // También añadimos un listener para que, si cambia la preferencia del sistema,
    // se vuelva a ejecutar la misma lógica.
    mediaQuery.addEventListener('change', applyTheme);

    // Limpiamos el listener cuando el componente se desmonta.
    return () => {
      mediaQuery.removeEventListener('change', applyTheme);
    };
  }, [theme]); // El efecto se vuelve a ejecutar solo cuando cambia el estado 'theme'.

  return [theme, setTheme];
}

export default useDarkMode;