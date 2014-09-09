var express = require('express');
var path = require('path');
var app = express();
var db = require('./models');

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req,res,next){
  res.render('index');
});

app.get('/:hash_code', function(req,res,next){
 var hash_code = req.param('hash_code');
 res.send(hash_code);
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
        console.log('shrt.ly listening on port ' + app.get('port'));
      });
    }
  });
}

initServer(app);