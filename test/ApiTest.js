var express = require('express')();
var api = require('../routes')(express);
var should = require('should');
var assert = require('assert');
var request = require('supertest');
var agent = request.agent(express);

describe('Shrt.ly API', function () {
  var api_endpoint = '/api'
  describe(api_endpoint + '/shorten', function () {
    var endpoint = api_endpoint + '/shorten';
    describe('GET', function () {
      it("should return a 501 Unsupported", function(done){
        agent
          .get(endpoint)
          .expect(501)
          .end(done)
      });
    });
    describe('PUT', function () {
      it("should return a 501 Unsupported", function(done){
        agent
          .put(endpoint)
          .expect(501)
          .end(done)
      });
    });
    describe('DELETE', function () {
      it("should return a 501 Unsupported", function(done){
        agent
          .del(endpoint)
          .expect(501)
          .end(done)
      });
    });
    describe('POST', function () {
      it("should return a new, shortened URL", function(done){
        var payload = {
          url: "http://www.technologyreview.com/view/530561/the-revolutionary-technique-that-quietly-changed-machine-vision-forever/"
        }

        agent
          .post(endpoint)
          .set('Content-Type', 'application/json')
          .send(payload)
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function (err, res) {
            var ret = res.body;
            ret.should.have.property('url');
            ret.url.should.eql(payload.url);
            ret.should.have.property('short_url');
            ret.short_url.should.not.eql(payload.url);
            console.log(ret.short_url)
            done();
          });
      });
    });
  });
});