var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();
var shrt = require('./shrt');

var shrts = [];

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/shrts', function(req, res, next) {
  res.send(shrts);
});

app.post('/shrts', function(req, res, next) {
  var data = req.body || {};
  var result = shrt.create(data.url);
  if (result && result.hash_code) {
    shrts.push(result);
    res.send(result);
  } else {
    response.send(400);
  };
});

app.get('/r/:hash_code', function(req, res, next)  {
  var hash_code = req.param('hash_code');
  res.redirect('/shrt/' + hash_code);
});

app.get('/shrt/:hash_code', function(req, res, next)  {
  var hash_code = req.param('hash_code');
  res.send('Redirected to ' + hash_code);
});

// Start Server
app.listen(app.get('port'),function() {
  console.log('shrt.ly listening on port ' + app.get('port'));
});
