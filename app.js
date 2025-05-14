// app.js
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import fileRoutes from './src/routes/file.routes.js';
import bookRoutes from './src/routes/book.routes.js';
import { errorHandler } from './src/middlewares/errorHandler.js'; // ✅ Importación correcta

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api', fileRoutes);
app.use('/api/book', bookRoutes);

// Middleware de errores (al final)
app.use(errorHandler); // ✅ Usa el manejador correctamente

// Inicio del servidor
const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
