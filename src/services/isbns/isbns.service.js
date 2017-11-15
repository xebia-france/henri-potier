const booksService = require('../books/books.service');

class IsbnsService {
  constructor() {
    this.offers = booksService;
  }

  getAll() {
    return this.offers
      .getAll()
      .map((book) => book.isbn);
  }

  filter(ids) {
    return this.getAll()
      .filter((isbn) => ids.indexOf(isbn) !== -1);
  }
}

module.exports = new IsbnsService();