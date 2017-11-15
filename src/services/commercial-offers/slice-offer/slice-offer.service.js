const CommercialOffer = require('../../../schemas/commercial-offer');

class SliceOfferService {
  constructor() {
    this.TYPE = 'slice';
  }

  compute(count) {
    if (count < 4) {
      return new CommercialOffer(this.TYPE, 12, 100);
    } else {
      return new CommercialOffer(this.TYPE, 14, 80);
    }
  }
}

module.exports = new SliceOfferService();