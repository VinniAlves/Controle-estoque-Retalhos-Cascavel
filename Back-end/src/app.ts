import express from 'express';
import cors from 'cors';
import partsRoutes from './routes/parts.routes';

export const app = express();

app.use(cors());
app.use(express.json({ limit: '15mb' })); // para receber Base64
app.use('/api', partsRoutes);

app.get('/health', (_req, res) => res.json({ ok: true }));
