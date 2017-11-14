const express = require('express');

const server = express();
const router = express.Router();

// default headers middleware
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'x-requested-with, origin, content-type, accept');
  next();
});

router.get('/', (request, response) => response.send('Bienvenue dans la librairie de Henri Potier'));
require('./controllers/books/books.controller').initRoutes(router);
require('./controllers/commercial-offers/commercial-offers.controller').initRoutes(router);

server.use(router);
module.exports = server;

