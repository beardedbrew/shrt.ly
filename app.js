var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var app = module.exports = express();

var shrt = require('./shrt');

var shrts = [];
var db = require('./models');
var initializeRoutes = require('./routes');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res, next) {
  res.render('index');
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

initializeRoutes(app);
initServer(app);
