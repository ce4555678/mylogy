import {
  index, // Importar o construtor de índice
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
  vector,
} from 'drizzle-orm/pg-core';

export const notesTable = pgTable(
  'notes',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar().notNull(),
    content: text().notNull(),
    embedding: vector({
      dimensions: 384,
    }).notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp()
      .defaultNow()
      .$onUpdateFn(() => new Date()),
  },
  (table) => [
    // Criando o índice para busca vetorial
    index('embedding_index').using(
      'hnsw', 
      table.embedding.op('vector_cosine_ops') // Define a métrica de distância (Cosseno é a mais comum para embeddings)
    ),
  ]
);