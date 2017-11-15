const CommercialOffer = require('../../../schemas/commercial-offer');

class MinusOfferService {
  constructor() {
    this.TYPE = 'minus';
  }

  compute(count) {
    if (count < 4) {
      return new CommercialOffer(this.TYPE, 15);
    } else {
      return new CommercialOffer(this.TYPE, 30);
    }
  }
}

module.exports = new MinusOfferService();