import { getBooks, saveBooks } from '../db/index.js';

// Función para obtener todos los libros
export const findAllBooks = () => {
  return getBooks();  // Recuperar todos los libros del archivo
};

// Función para encontrar un libro por su ID
export const findBookById = (id) => {
  const books = getBooks();
  return books.find(book => book.id === id);  // Buscar el libro por ID
};

// Función para crear un nuevo libro
export const createBook = (newBook) => {
  const books = getBooks();  // Obtener los libros actuales
  books.push(newBook);  // Añadir el nuevo libro
  saveBooks(books);  // Guardar los libros actualizados
};