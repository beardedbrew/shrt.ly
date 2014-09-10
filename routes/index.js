var express = require('express');
var bodyParser = require('body-parser');
var Hashids = require("hashids");
var db = require('../models');
var _ = require('lodash');
var ShortUrl = db.ShortUrl;
var salt = "Shrt.ly Salt String"
var hasher = new Hashids(salt, 8, "bcdfghjklmnpqrstvwxyz❀❃❆❇❊❋%/⌿#⌗");


module.exports = function(app) {
  var api_endpoint = '/api';
  // Middleware config
  app.use(bodyParser.json());

  app.get(api_endpoint + '/shrts', function(req, res, next) {
    ShortUrl.findAll().success(function(results) {
      var list = _.map(results, function(s) {
        var values = s.dataValues;
        values.hash_code = hasher.encode(s.id);
        return values;
      });
      res.send(list);
    });
  });

  app.post(api_endpoint + '/shrts', function(req, res, next) {
    var url = req.body.url;
    ShortUrl.build({url:url}).save().complete(function(err,short) {
      if(!err) {
        var id = short.id;
        res.json({url: url, hash_code: hasher.encode(id), hits: short.hits });
      } else {
        next(err);
      }
    });
  });

  app.get('/r/:hash_code', function(req,res,next){
    var hash_code = req.param('hash_code');
    var id = hasher.decode(hash_code);
    if(id.length>0) {
      ShortUrl.find(id[0]).success(function(shortUrl) {
        if (shortUrl) {
          shortUrl.hits++;
          shortUrl.save();
          res.redirect(shortUrl.url);
        } else {
          res.status(404).send({"message":"URL does not exist"});
        }
      });
    } else {
      res.status(404).send({"message":"URL does not exist"});
    }
  });

  app.all(api_endpoint + '*',function(req,res){
    res.status(501).json({message:'Shrt.ly API does not support this endpoint'});
  });
}
