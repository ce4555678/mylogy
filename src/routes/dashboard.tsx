import { NewNote } from '#/components/new-note';
import { SearchBar } from '#/components/search-bar';
import { Button } from '#/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '#/components/ui/dropdown-menu';
import { NavHeader } from '#/components/ui/nav-header';
import { createFileRoute } from '@tanstack/react-router'
import { ArrowUpDown } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

type SortOption = 'updatedAt' | 'createdAt' | 'title';

function RouteComponent() {
  const [query, setQuery] = useQueryState('q', { defaultValue: '' })

    const [sortBy, setSortBy] = useState<SortOption>('updatedAt');
  const SORT_LABELS: Record<SortOption, string> = {
    updatedAt: 'Última edição',
    createdAt: 'Data de criação',
    title: 'Título (A–Z)',
  };

  return  <div className="min-h-screen bg-background flex flex-col">
      <NavHeader />

      <main className="flex-1 w-full mx-auto max-w-4xl px-4 sm:px-6 py-8 pb-20">

        {/* ── PAGE HEADER ── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Gerencie e organize todas as suas notas.
            </p>
          </div>
          <NewNote />
          {/* <Button
            // onClick={() => setIsNewNoteOpen(true)}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl h-10 px-5 shadow-sm"
          >
            <PenLine className="w-4 h-4 mr-2" />
            Nova Nota
          </Button> */}
        </div>

        {/* ── STATS ── */}
        {/* <DashboardStats notes={notes} /> */}

        {/* ── TOOLBAR ── */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-8 mb-5">
          <div className="flex-1">
            <SearchBar
            />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-2 border-border/60 text-foreground font-semibold rounded-xl h-10 gap-1.5 hover:border-primary/40"
                >
                  <ArrowUpDown className="w-3.5 h-3.5 text-primary" />
                  <span className="hidden sm:inline">{SORT_LABELS[sortBy]}</span>
                  <span className="sm:hidden">Ordenar</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  Ordenar por
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <DropdownMenuRadioItem value="updatedAt">Última edição</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="createdAt">Data de criação</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="title">Título (A–Z)</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Actions (export, clear) */}
            {/* <NotesActions
              notes={notes}
              onClearAll={() => {
                if (confirm('Deletar TODAS as notas? Esta ação não pode ser desfeita.')) {
                  clearAllNotes();
                }
              }}
            /> */}
          </div>
        </div>

        {/* ── SEARCH RESULT FEEDBACK ── */}
        {query && (
          <p className="text-sm text-muted-foreground mb-4 font-medium">
            {/* {sortedNotes.length} resultado{sortedNotes.length !== 1 ? 's' : ''} para{' '} */}
            <span className="text-foreground font-semibold">&quot;{query}&quot;</span>
          </p>
        )}

        {/* ── NOTES LIST ──
        <NotesList
          notes={sortedNotes}
          onEdit={(note) => {
            setSelectedNote(note);
            setIsEditModalOpen(true);
          }}
          onDelete={deleteNote}
        /> */}

        {/* ── EMPTY STATE ── */}
        {/* {notes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <PenLine className="w-9 h-9 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Comece a escrever</h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-7">
              Nenhuma nota ainda. Crie sua primeira nota e comece a documentar seus pensamentos.
            </p>
            <Button
              onClick={() => setIsNewNoteOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold rounded-xl h-11 px-7"
            >
              <PenLine className="w-4 h-4 mr-2" />
              Criar Primeira Nota
            </Button>
          </div>
        )} */}
      </main>

      {/* ── FOOTER ── */}
      <footer className="border-t border-border/40 bg-card/50 px-4 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          mylogy &copy; {new Date().getFullYear()} &mdash; Seus dados, somente seus.
        </p>
      </footer>

      {/* ── MODALS ── */}
      {/* <NewNoteModal
        isOpen={isNewNoteOpen}
        onClose={() => setIsNewNoteOpen(false)}
        onSave={(title, content) => {
          addNote(title, content);
          setIsNewNoteOpen(false);
        }}
      /> */}

      {/* <EditNoteModal
        note={selectedNote}
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedNote(null);
        }}
        onSave={(id, title, content) => {
          updateNote(id, title, content);
          setIsEditModalOpen(false);
          setSelectedNote(null);
        }}
      /> */}
    </div>
}
