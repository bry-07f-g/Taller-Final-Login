import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './routes/auth.routes.js';

const app = express();

// ✅ CORS para local + Vercel
app.use(cors({
origin: [
    'http://localhost:5173',
    'https://taller-final-gamma.vercel.app' // 👈 QUITA LA "/" AL FINAL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // 👈 AÑADE ESTO si vas a usar Cookies o Sessions más adelante
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