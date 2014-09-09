var express = require('express');
var app = express();
var _ = require('lodash');
var moment = require('moment');

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'x-requested-with, origin, content-type, accept');
  next();
 });

app.get('/', function(request, response) {
  response.send('Welcome to Henri Potier\'s books.');
});

var BOOKS = [
    {isbn: "c8fabf68-8374-48fe-a7ea-a00ccd07afff", title: "Henri Potier à l'école des sorciers", price: 35.0},
    {isbn: "a460afed-e5e7-4e39-a39d-c885c05db861", title: "Henri Potier et la Chambre des secrets", price: 30.0},
    {isbn: "fcd1e6fa-a63f-4f75-9da4-b560020b6acc", title: "Henri Potier et le Prisonnier d'Azkaban", price: 30.0},
    {isbn: "c30968db-cb1d-442e-ad0f-80e37c077f89", title: "Henri Potier et la Coupe de feu", price: 29.0},
    {isbn: "78ee5f25-b84f-45f7-bf33-6c7b30f1b502", title: "Henri Potier et l'Ordre du phénix", price: 28.0},
    {isbn: "cef179f2-7cbc-41d6-94ca-ecd23d9f7fd6", title: "Henri Potier et le Prince de sang-mêlé", price: 30.0},
    {isbn: "bbcee412-be64-4a0c-bf1e-315977acd924", title: "Henri Potier et les Reliques de la Mort", price: 35.0},
  ];

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
})
