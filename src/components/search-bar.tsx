'use client'

import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useQueryState } from 'nuqs'

export function SearchBar() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' })

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      //   handleSearch();
    }
  }

  return (
    <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-primary pointer-events-none" />
        <Input
          type="text"
          placeholder={'Buscar por título ou conteúdo...'}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            // onSearch(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className="pl-12 pr-10 bg-input border-2 border-border/60 text-foreground font-medium placeholder:text-muted-foreground rounded-2xl focus-visible:border-primary transition-colors"
        />
        {query && (
          <Button
            size="sm"
            variant="ghost"
            // onClick={handleClear}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted rounded-lg text-muted-foreground hover:text-foreground"
            aria-label="Limpar pesquisa"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
