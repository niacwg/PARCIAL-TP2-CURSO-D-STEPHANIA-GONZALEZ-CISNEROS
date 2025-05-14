import express from 'express';
import { getBooks, getBook, createBook } from '../controllers/bookController.js';  // Importar funciones del controlador

const router = express.Router();  // Crear un enrutador

// Ruta para obtener todos los libros
router.get('/', getBooks);

// Ruta para obtener un libro por su id
router.get('/:id', getBook);

// Ruta para crear un nuevo libro
router.post('/', createBook);

export default router;  // Exportar el enrutador para ser usado en app.js
