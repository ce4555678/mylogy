'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type ColorTheme = 'azul' | 'rosa' | 'amarelo';

const COLOR_THEMES: { id: ColorTheme; label: string; color: string; ring: string }[] = [
  { id: 'azul',    label: 'Azul',    color: 'bg-[oklch(0.52_0.18_260)]', ring: 'ring-[oklch(0.52_0.18_260)]' },
  { id: 'rosa',    label: 'Rosa',    color: 'bg-[oklch(0.58_0.22_358)]', ring: 'ring-[oklch(0.58_0.22_358)]' },
  { id: 'amarelo', label: 'Amarelo', color: 'bg-[oklch(0.68_0.17_72)]',  ring: 'ring-[oklch(0.68_0.17_72)]'  },
];

export function ThemeSelector() {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('azul');

  useEffect(() => {
    const saved = localStorage.getItem('mylogy-color-theme') as ColorTheme | null;
    if (saved && ['azul', 'rosa', 'amarelo'].includes(saved)) {
      setColorTheme(saved);
      applyTheme(saved);
    }
  }, []);

  function applyTheme(theme: ColorTheme) {
    const root = document.documentElement;
    if (theme === 'azul') {
      root.removeAttribute('data-color-theme');
    } else {
      root.setAttribute('data-color-theme', theme);
    }
  }

  function handleSelect(theme: ColorTheme) {
    setColorTheme(theme);
    applyTheme(theme);
    localStorage.setItem('mylogy-color-theme', theme);
  }

  return (
    <div className="flex items-center gap-1.5" aria-label="Selecionar tema de cor">
      {COLOR_THEMES.map(({ id, label, color, ring }) => (
        <button
          key={id}
          onClick={() => handleSelect(id)}
          aria-label={`Tema ${label}`}
          className={[
            'w-6 h-6 rounded-full transition-all duration-200 focus-visible:outline-none',
            color,
            colorTheme === id
              ? `ring-2 ring-offset-2 ring-offset-background ${ring} scale-110`
              : 'opacity-60 hover:opacity-90 hover:scale-105',
          ].join(' ')}
        />
      ))}
    </div>
  );
}
