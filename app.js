var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var _ = require('lodash');

var app = express();
var shrt = require('./shrt');

var shrts = [];
var db = require('./models');

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
  var hash_code = shrt.getCode(data.url);
  var result = _.find(shrts, function(s) { return s.hash_code == hash_code });

  if (!result) {
    result = shrt.create(data.url);
    shrts.push(result);
  };

  if (result && result.hash_code) {
    res.send(result);
  } else {
    response.send(400);
  };
});

app.get('/r/:hash_code', function(req, res, next)  {
  var hash_code = req.param('hash_code');
  var shrt = _.find(shrts, function(s) { return s.hash_code == hash_code });
  if (shrt) {
    shrt.clicks++;
    res.redirect(shrt.url);
  } else {
    res.redirect('/');
  }
});

function initDb(callback) {
  db
    .sequelize
    .sync({ force: true })
    .complete(function(err) {

      if (err) {
        callback(err[0]);
      } else {
        callback();
      }
    })
}

function initServer(app) {
  initDb(function(error){
    if(error)
      throw error
    else {
      // Start Server
      app.listen(app.get('port'),function() {
        console.log('shrtn.ly listening on port ' + app.get('port'));
      });
    }
  });
}

initServer(app);
