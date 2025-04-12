import express from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();
const PORT = 3001;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend 👋' });
});

app.get('/api/db', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ db: 'connected ✅' });
  } catch (err) {
    res.status(500).json({ db: 'error ❌', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});

