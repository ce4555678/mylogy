import { PGlite } from '@electric-sql/pglite'
import { drizzle } from 'drizzle-orm/pglite'
import * as schema from './schema'
import { vector } from '@electric-sql/pglite/vector' // Importante para embeddings

let clientDb: PGlite | null = null

if (typeof window !== 'undefined') {
  // Apenas inicializa no cliente (navegador)
  clientDb = new PGlite('idb://my-logy-db', {
    extensions: {
      vector,
    },
  })
}

const db = drizzle(clientDb as any, { schema })

export { clientDb }
export default db
