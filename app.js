var express = require('express');
var app = express();
var _ = require('lodash');
var moment = require('moment');
var books = require('./public/books.json');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'x-requested-with, origin, content-type, accept');
  next();
 });

app.get('/', function(request, response) {
  response.send('Bienvenue dans la librairie de Henri Potier');
});

var BOOKS = books;

var BOOKS_BY_ISBN = _.indexBy(BOOKS, 'isbn');
var ISBNS = _.keys(BOOKS_BY_ISBN);

app.get('/books', function(request, response) {
  response.json(BOOKS);
});

app.get('/books/:ids/commercialOffers', function (request, response) {
  var ids = request.params.ids.split(',');
  ids = _.map(ids, function(s) {
    return s.trim();
  });

  var matchingIds = _.filter(ids, function(id) {
    return _.contains(ISBNS, id);
  });

  var baseReduction = moment().hour() > 12 ? 4 : 5;
  var booksCount = matchingIds.length;

  var offers = [];
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


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
