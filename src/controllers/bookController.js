import { findAllBooks, findBookById, createBook as createBookInRepo } from '../repositories/bookRepository.js';

// Función para obtener todos los libros
export const getBooks = (req, res, next) => {
  try {
    const books = findAllBooks();  // Leer todos los libros desde el repositorio
    res.status(200).json(books);
  } catch (err) {
    next(err);  // Pasamos el error al middleware de manejo de errores
  }
};

// Función para obtener un libro específico
export const getBook = (req, res, next) => {
  try {
    const { id } = req.params;
    const book = findBookById(id);  // Buscar el libro por ID en el repositorio

    if (!book) {
      return res.status(404).json({ message: 'Libro no encontrado' });
    }

    res.status(200).json(book);
  } catch (err) {
    next(err);
  }
};

// Función para crear un nuevo libro
export const createBook = (req, res, next) => {
  try {
    const { title, author, isbn, publishedDate, availableCopies } = req.body;
    const newBook = {
      id: Date.now().toString(),  // Usamos el timestamp como ID único
      title,
      author,
      isbn,
      publishedDate,
      availableCopies
    };

    createBookInRepo(newBook);  // Usar la función del repositorio para crear el libro

    res.status(201).json({
      success: true,
      message: 'Libro creado con éxito',
      book: newBook
    });
  } catch (err) {
    next(err);  // Pasamos el error al middleware de manejo de errores
  }
};
