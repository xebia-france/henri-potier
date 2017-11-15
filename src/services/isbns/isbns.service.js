const booksService = require('../books/books.service');

class IsbnsService {
  constructor() {
    this.books = booksService;
  }

  getAll() {
    return this.books
      .getAll()
      .map((book) => book.isbn);
  }

  filter(ids) {
    return this.getAll()
      .filter((isbn) => ids.indexOf(isbn) !== -1);
  }
}

module.exports = new IsbnsService();