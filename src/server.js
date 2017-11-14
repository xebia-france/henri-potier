const express = require('express');
const _ = require('lodash');
const moment = require('moment');

const server = express();

// default headers middleware
server.all('*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'x-requested-with, origin, content-type, accept');
  next();
});

// root resources
server.get('/', (request, response) => {
  response.send('Bienvenue dans la librairie de Henri Potier');
});

// books resources
const booksController = require('./controllers/books/books.controller');
server.get('/books', booksController.getAll.bind(booksController));

// commercial offer resources
const BOOKS = require('../public/books.json');
const BOOKS_BY_ISBN = _.indexBy(BOOKS, 'isbn');
const ISBNS = _.keys(BOOKS_BY_ISBN);
server.get('/books/:ids/commercialOffers', (request, response) => {
  let ids = request.params.ids.split(',');

  ids = _.map(ids, (s) => s.trim());
  const matchingIds = _.filter(ids, (id) => _.contains(ISBNS, id));
  const baseReduction = moment().hour() > 12 ? 4 : 5;
  const booksCount = matchingIds.length;

  let offers = [];
  if (booksCount < 2) {
    offers = [
      {type: "percentage", value: baseReduction}
    ];
  } else if (booksCount >= 2 && booksCount < 4) {
    offers = [
      {type: "percentage", value: baseReduction},
      {type: "minus", value: 15},
      {type: "slice", sliceValue: 100, value: 12}
    ];
  } else {
    offers = [
      {type: "percentage", value: baseReduction * 2},
      {type: "minus", value: 30},
      {type: "slice", sliceValue: 80, value: 14}
    ];
  }
  response.json({offers: offers});
});

module.exports = server;

