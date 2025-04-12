import express from 'express';
import clientRoutes from './client/client.routes';

const app = express();
app.use(express.json());

app.use('/api/clients', clientRoutes);

const PORT = 3001;
app.listen(PORT);