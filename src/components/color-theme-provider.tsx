
import { type ReactNode, useEffect, useState } from 'react';

type ColorTheme = 'azul' | 'rosa' | 'amarelo';

export function ColorThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('mylogy-color-theme') as ColorTheme | null;
    const theme = savedTheme || 'azul';
    
    // Apply theme to HTML element
    document.documentElement.setAttribute('data-color-theme', theme);
  }, []);

  if (!mounted) return <>{children}</>;

  return <>{children}</>;
}
