const booksRepository = require('../../repositories/books/books.repository');

class BooksService {
  constructor(repository = booksRepository) {
    this.repository = repository;
  }

  getAll() {
    return this.repository.getAll();
  }
}

module.exports = new BooksService();