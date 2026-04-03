'use client';

import { BookOpen, LayoutDashboard, Home } from 'lucide-react';
import { ThemeSelector } from '@/components/theme-selector';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useLocation } from '@tanstack/react-router'

const NAV_LINKS = [
  { href: '/', label: 'Início', icon: Home },
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
];

export function NavHeader() {
    const location = useLocation();
    const pathname = location.pathname;
  return (
    <header className="sticky top-0 z-40 border-b border-border/40 bg-card/95 backdrop-blur-sm shadow-xs">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-sm transition-transform group-hover:scale-105">
              <BookOpen className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-base font-bold text-foreground tracking-tight">mylogy</span>
          </a>

          {/* Nav Links — desktop */}
          <nav className="hidden sm:flex items-center gap-1" aria-label="Navegação principal">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <a
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    active
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                  aria-current={active ? 'page' : undefined}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeSelector />

            {/* Dashboard CTA — mobile only */}
            <a href="/dashboard" className="sm:hidden">
              <Button
                size="sm"
                variant={pathname === '/dashboard' ? 'default' : 'outline'}
                className="rounded-xl text-xs font-semibold h-8 px-3"
                aria-label="Ir para o Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
