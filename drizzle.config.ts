import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts', // Caminho para seu schema
  out: './drizzle',             // Onde os arquivos SQL serão gerados
  dialect: 'postgresql',
  strict: true,
  verbose: true,
});