// src/services/generalService.js
import { getAllBooks } from './bookService.js';
import { getAllFiles } from './fileService.js';

export const getAllBooksAndFiles = async () => {
  const books = await getAllBooks();
  const files = await getAllFiles();
  return { books, files };
};
