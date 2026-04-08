import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';

const app = express();

// ✅ CORS para local + Vercel
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://taller-final-gamma.vercel.app'
  ]
}));

app.use(morgan('dev'));
app.use(express.json());

// rutas
app.use('/api/auth', authRoutes);

// ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando 🚀');
});

export default app;