import express from 'express';
import cors from 'cors';
import authRoutes from "./routes/auth.routes.js"

import errorHandler from './middlewares/errorHandler.js';

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// TODO : brancher les routes ici au fil des étapes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

app.use(errorHandler);

export default app;