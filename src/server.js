import 'dotenv/config';
import mongoose from 'mongoose';
import app from './app.js';

const { MONGODB_URI } = process.env;
const PORT = process.env.PORT || 3000;

// conexión a MongoDB
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Conectado a MongoDB Atlas');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en puerto ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('Error conectando a MongoDB:', err.message);
        process.exit(1);
    });