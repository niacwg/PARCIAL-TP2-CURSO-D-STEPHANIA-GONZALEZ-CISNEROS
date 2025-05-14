// src/models/Book.js

export class Book {
  constructor({ id, title, author }) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  // Puedes agregar validaciones o métodos propios del libro
  isValid() {
    return this.title && this.author;
  }
}
