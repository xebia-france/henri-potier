const moment = require('moment');
const CommercialOffer = require('../../../schemas/commercial-offer');

class PercentageOfferService {
  constructor() {
    this.TYPE = 'percentage';
  }

  compute(count) {
    const basePercentage = this._computeBasePercentage();
    if (count < 4) {
      return new CommercialOffer(this.TYPE, basePercentage);
    } else {
      return new CommercialOffer(this.TYPE, this._computeExtendedPercentage());
    }
  }

  _computeBasePercentage() {
    return moment().hour() > 12 ? 4 : 5;
  }

  _computeExtendedPercentage(basePercentage) {
    return basePercentage * 2;
  }
}

module.exports = new PercentageOfferService();