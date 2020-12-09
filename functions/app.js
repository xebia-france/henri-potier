const functions = require('firebase-functions');
const express = require('express');
const app = express();
const _ = require('lodash');
const moment = require('moment');
const books = require('./books.json');

app.set('port', (process.env.PORT || 5000));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'x-requested-with, origin, content-type, accept');
  next();
 });

app.get('/', function(request, response) {
  response.send('Bienvenue dans la bibliothèque de Henri Potier');
});

const BOOKS = books;

const BOOKS_BY_ISBN = _.indexBy(BOOKS, 'isbn');
const ISBNS = _.keys(BOOKS_BY_ISBN);

app.get('/books', function(request, response) {
  response.json(BOOKS);
});

app.get('/books/:ids/commercialOffers', function (request, response) {
  let ids = request.params.ids.split(',');
  ids = _.map(ids, function(s) {
    return s.trim();
  });

  const matchingIds = _.filter(ids, function (id) {
    return _.contains(ISBNS, id);
  });

  const baseReduction = moment().hour() > 12 ? 4 : 5;
  const booksCount = matchingIds.length;

  let offers;
  if (booksCount < 2) {
    offers = [
      {type:"percentage", value: baseReduction}
    ];
  } else if (booksCount >= 2 && booksCount < 4) {
    offers = [
      {type:"percentage", value: baseReduction},
	    {type:"minus", value: 15},
      {type:"slice", sliceValue: 100, value: 12}
    ];
  } else {
    offers = [
      {type:"percentage", value: baseReduction * 2},
      {type:"minus", value: 30},
      {type:"slice", sliceValue: 80, value: 14}
    ];
  }

  response.json({offers:offers});
});

exports.app = functions.https.onRequest(app);
