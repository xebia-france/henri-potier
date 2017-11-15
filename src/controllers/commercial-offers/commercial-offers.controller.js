const commercialOffersService = require('../../services/commercial-offers/commercial-offers.service');

class CommercialOffersController {
  constructor() {
    this.offers = commercialOffersService;
  }

  initRoutes(router) {
    router.get('/books/:ids/commercialOffers', this._getByIds.bind(this))
  }

  _getByIds(request, response) {
    let ids = request.params.ids.split(',').map((id) => id.trim());
    response.json(this.offers.getByIds(ids));
  }
}

module.exports = new CommercialOffersController();