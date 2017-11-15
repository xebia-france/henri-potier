const booksService = require('../../services/books/books.service');

class BooksController {
  constructor() {
    this.offers = booksService;
  }

  initRoutes(router) {
    router.get('/books', this._getAll.bind(this));
  }

  _getAll(request, response) {
    response
      .status(200)
      .json(this.offers.getAll());
  }
}

module.exports = new BooksController();