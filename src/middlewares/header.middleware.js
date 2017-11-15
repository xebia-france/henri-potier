class HeaderMiddleware {
  constructor() {}

  resolve() {
    return (request, response, next) => {
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
      response.header('Access-Control-Allow-Headers', 'x-requested-with, origin, content-type, accept');
      next();
    };
  }
}

module.exports = new HeaderMiddleware();