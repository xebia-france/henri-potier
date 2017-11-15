const booksRepository = require('../../repositories/books/books.repository');

class BooksService {
  constructor() {
    this.books = booksRepository;
  }

  getAll() {
    return this.books.getAll();
  }
}

module.exports = new BooksService();