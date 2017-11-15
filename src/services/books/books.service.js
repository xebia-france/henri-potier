const booksRepository = require('../../repositories/books/books.repository');

class BooksService {
  constructor() {
    this.offers = booksRepository;
  }

  getAll() {
    return this.offers.getAll();
  }
}

module.exports = new BooksService();