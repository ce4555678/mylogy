import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import appCss from '../styles.css?url'
import { ColorThemeProvider } from '#/components/color-theme-provider'
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router'
import { clientDb } from '#/db/db'
import { useEffect } from 'react'
import { Toaster } from 'sonner'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'My Logy',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
})

const setupDatabase = async () => {
  try {
    if (!clientDb) return

    // Criar extensão pgvector
    await clientDb.exec('CREATE EXTENSION IF NOT EXISTS vector;')

    // Criar tabela
    const schemaSql = `
      CREATE TABLE IF NOT EXISTS "notes" (
          "id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
          "title" varchar NOT NULL,
          "content" text NOT NULL,
          "embedding" vector(384) NOT NULL,
          "createdAt" timestamp DEFAULT now(),
          "updatedAt" timestamp DEFAULT now()
      );
    `
    await clientDb.exec(schemaSql)

    // Criar índice
    await clientDb.exec(
      `CREATE INDEX IF NOT EXISTS "embedding_index" ON "notes" USING hnsw ("embedding" vector_cosine_ops);`,
    )

    console.log('✅ Schema verificado/criado com sucesso')
  } catch (err) {
    console.error('❌ Erro ao criar schema:', err)
  }
}

function RootDocument({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    setupDatabase()
  }, [])

  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <ColorThemeProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ColorThemeProvider>
        <Toaster richColors />
        <TanStackDevtools
          config={{
            position: 'bottom-right',
          }}
          plugins={[
            {
              name: 'Tanstack Router',
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  )
}
