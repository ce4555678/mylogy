'use client';

import { BookOpen } from 'lucide-react';
import { ThemeSelector } from './theme-selector';

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-card/95 backdrop-blur-sm shadow-xs">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground tracking-tight">mylogy</span>
              <p className="text-[10px] text-muted-foreground leading-none mt-0.5 hidden sm:block">Seu diário privado</p>
            </div>
          </div>

          {/* Theme Selector */}
          <ThemeSelector />
        </div>
      </div>
    </header>
  );
}
