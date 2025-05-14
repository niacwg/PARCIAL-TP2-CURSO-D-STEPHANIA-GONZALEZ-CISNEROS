// src/services/bookService.js
import { findAllBooks, findBookById, createBook } from '../repositories/bookRepository.js';

export const getAllBooks = () => {
  // Aquí se podría agregar cualquier lógica de negocio adicional, como validaciones, cálculos, etc.
  return findAllBooks();
};

export const getBookById = (id) => {
  // Podrías agregar alguna lógica adicional si necesitas
  return findBookById(id);
};

export const createNewBook = (bookData) => {
  // Aquí podrías agregar validaciones, como asegurarte de que el libro no existe ya, etc.
  const newBook = {
    id: Date.now(),  // Por ejemplo, generas un ID único
    title: bookData.title,
    author: bookData.author
  };

  // Llamamos al repositorio para guardar el nuevo libro
  return createBook(newBook);
};
