const isbnsService = require('../isbns/isbns.service');
const minusOfferService = require('./minus-offer/minus-offer.service');
const percentageOfferService = require('./percentage-offer/percentage-offer.service');
const sliceOfferService = require('./slice-offer/slice-offer.service');

class CommercialOffersService {
  constructor() {
    this.isbns = isbnsService;
    this.minusOffer = minusOfferService;
    this.percentageOffer = percentageOfferService;
    this.sliceOffer = sliceOfferService;
  }

  getByIds(ids) {
    const booksCount = this.isbns.filter(ids).length;
    let offers = [];
    this._add(offers, booksCount);
    return offers;
  }

  _add(offers, booksCount) {
    offers.push(this.percentageOffer.compute(booksCount));
    if (booksCount >= 2) {
      offers.push(
        this.minusOffer.compute(booksCount),
        this.sliceOffer.compute(booksCount)
      );
    }
  }
}

module.exports = new CommercialOffersService();
