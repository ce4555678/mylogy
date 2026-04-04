'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PenLine, Save, X } from 'lucide-react'
import db from '#/db/db'
import { notesTable } from '#/db/schema'
import { pipeline, env } from '@xenova/transformers'
import { toast } from 'sonner'

env.localModelPath = '/paraphrase-multilingual-MiniLM-L12-v2/'
env.allowRemoteModels = false

export function NewNote() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  async function createNote(dataNote: { title: string; content: string }) {
    const extractor = await pipeline(
      'feature-extraction',
      'Xenova/paraphrase-multilingual-MiniLM-L12-v2',
      {
        progress_callback: (data: any) => {
          if (data.status === 'progress') {
            toast.info(`Baixando: ${data.progress.toFixed(2)}%`)
          }
          if (data.status === 'ready') {
            toast.success('Concluído!')
          }
        },
      },
    )
    const embedding = await extractor(
      `
        ${dataNote.title} ${dataNote.content}
        `,
      { pooling: 'mean', normalize: true },
    )
    const embeddingArray = Array.from(embedding.data as Float32Array)

    await db.insert(notesTable).values({
      title: dataNote.title,
      content: dataNote.content,
      embedding: embeddingArray,
    })
  }

  const handleSave = async () => {
    if (title.trim() && content.trim()) {
      await createNote({ title: title.trim(), content: content.trim() })
      setTitle('')
      setContent('')
      setOpen(false)
    }
  }

  const handleClose = () => {
    setTitle('')
    setContent('')
  }

  const isDisabled = !title.trim() || !content.trim()
  const titleLength = title.length
  const contentLength = content.length
  const titleMax = 100
  const contentMax = 5000

  // Limpar campos ao fechar o modal
  useEffect(() => {
    if (!open) {
      setTitle('')
      setContent('')
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-xl font-semibold gap-2">
          <PenLine className="w-4 h-4" />
          Nova Nota
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border border-border/40 w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-sm sm:max-w-lg md:max-w-2xl rounded-2xl p-0 overflow-hidden gap-0 shadow-xl">
        {/* Colored top bar com animação */}
        <div className="h-1 w-full bg-linear-to-r from-primary via-primary to-primary/80" />

        <div className="p-4 sm:p-6 md:p-8">
          <DialogHeader className="mb-4 sm:mb-6 md:mb-8">
            <DialogTitle className="text-foreground text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <PenLine className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              </div>
              Nova Nota
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-xs sm:text-sm mt-2">
              Escreva seus pensamentos. Tudo fica salvo localmente.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 sm:space-y-6">
            {/* Campo de Título */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="new-title"
                  className="text-xs sm:text-sm font-semibold text-foreground"
                >
                  Título
                </label>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {titleLength}/{titleMax}
                </span>
              </div>
              <Input
                id="new-title"
                placeholder="Título para sua nota..."
                value={title}
                onChange={(e) => setTitle(e.target.value.slice(0, titleMax))}
                maxLength={titleMax}
                className="bg-input border border-border/60 text-foreground placeholder:text-muted-foreground rounded-xl focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all h-10 sm:h-11 text-sm sm:text-base"
                autoFocus
              />
              {titleLength > 0 && (
                <div className="h-1 bg-border/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 transition-all duration-200"
                    style={{ width: `${(titleLength / titleMax) * 100}%` }}
                  />
                </div>
              )}
            </div>

            {/* Campo de Conteúdo */}
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="new-content"
                  className="text-xs sm:text-sm font-semibold text-foreground"
                >
                  Conteúdo
                </label>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {contentLength}/{contentMax}
                </span>
              </div>
              <Textarea
                id="new-content"
                placeholder="Escreva seus pensamentos..."
                value={content}
                onChange={(e) =>
                  setContent(e.target.value.slice(0, contentMax))
                }
                className="min-h-32 sm:min-h-40 md:min-h-52 bg-input border border-border/60 text-foreground placeholder:text-muted-foreground resize-none leading-relaxed rounded-xl focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20 transition-all p-3 sm:p-4 text-sm sm:text-base"
              />
              {contentLength > 0 && (
                <div className="h-1 bg-border/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary/60 transition-all duration-200"
                    style={{ width: `${(contentLength / contentMax) * 100}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-end">
            <DialogClose asChild>
              <Button
                variant="outline"
                onClick={handleClose}
                className="border border-border/60 text-foreground hover:bg-muted rounded-xl font-medium px-4 sm:px-6 w-full sm:w-auto order-2 sm:order-1"
              >
                <X className="w-4 h-4 mr-2" />
                Cancelar
              </Button>
            </DialogClose>
            <Button
              onClick={handleSave}
              disabled={isDisabled}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all px-4 sm:px-6 gap-2 w-full sm:w-auto order-1 sm:order-2"
            >
              <Save className="w-4 h-4" />
              Salvar Nota
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}
