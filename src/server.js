const express = require('express');

const server = express();
const router = express.Router();

router.use(require('./middlewares/header.middleware').resolve());
router.get('/', (request, response) => response.send('Bienvenue dans la librairie de Henri Potier'));
require('./controllers/books/books.controller').initRoutes(router);
require('./controllers/commercial-offers/commercial-offers.controller').initRoutes(router);

server.use(router);
module.exports = server;

