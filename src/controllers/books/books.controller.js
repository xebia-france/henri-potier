const booksService = require('../../services/books/books.service');

class BooksController {
  constructor(service = booksService) {
    this.service = service;
  }

  getAll(request, response) {
    response
      .status(200)
      .json(this.service.getAll());
  }
}

module.exports = new BooksController();