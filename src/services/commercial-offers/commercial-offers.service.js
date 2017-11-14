const _ = require('lodash');
const moment = require('moment');

const BOOKS = require('../../../public/books.json');
const BOOKS_BY_ISBN = _.indexBy(BOOKS, 'isbn');
const ISBNS = _.keys(BOOKS_BY_ISBN);

class CommercialOffersService {
  constructor() {}

  getByIds(ids) {
    const matchingIds = _.filter(ids, (id) => _.contains(ISBNS, id));
    const booksCount = matchingIds.length;
    let offers = [];
    this._add(offers, booksCount);
    return offers;
  }

  _add(offers, booksCount) {
    offers.push(this._computePercentageOffer(booksCount));
    if (booksCount >= 2) {
      offers.push(
        this._computeMinusOffer(booksCount),
        this._computeSliceOffer(booksCount)
      );
    }
  }

  _computeMinusOffer(booksCount) {
    if (booksCount < 4) {
      return {type: "minus", value: 15};
    } else {
      return {type: "minus", value: 30};
    }
  }

  _computePercentageOffer(booksCount) {
    const baseReduction = moment().hour() > 12 ? 4 : 5;
    if (booksCount < 4) {
      return {type: "percentage", value: baseReduction};
    } else {
      return {type: "percentage", value: baseReduction * 2};
    }
  }

  _computeSliceOffer(booksCount) {
    if (booksCount < 4) {
      return {type: "slice", sliceValue: 100, value: 12};
    } else {
      return {type: "slice", sliceValue: 80, value: 14};
    }
  }
}

module.exports = new CommercialOffersService();
