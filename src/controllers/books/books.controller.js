const booksService = require('../../services/books/books.service');

class BooksController {
  constructor(service = booksService) {
    this.books = service;
  }

  initRoutes(router) {
    router.get('/books', this._getAll.bind(this));
  }

  _getAll(request, response) {
    response
      .status(200)
      .json(this.books.getAll());
  }
}

module.exports = new BooksController();