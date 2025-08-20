import 'dotenv/config';

export const env = {
  port: Number(process.env.PORT ?? 3000),
  databaseUrl: process.env.DATABASE_URL ?? ''
};

if (!env.databaseUrl) {
  throw new Error('DATABASE_URL não configurada no .env');
}
