var chai = require('chai');
var expect = require('chai').expect;
var Promise = require('bluebird');
var chaiHttp = require('chai-http');
var devs = require('../routes/developers');
var app = require('../app');

chai.use(chaiHttp);

describe('Developer Tests', function() {

    it('should return with status code 200 after adding /devs/add', function(done) {
      var randomEmail = function(){
        return Math.floor(Math.random(100000) * 100000).toString();
      };
      chai.request(app)
        .post('/devs/add')
        .send({
          'kind': 'dev',
          'first_name': 'Test_first',
          'last_name': 'Test_last',
          'email': randomEmail().concat('@test.com')
        }).then(function(res){
          expect(res.req.method).to.be('POST')
          expect(res).to.have.status(200)
        })
        done();
    });

    it('should use delete method on /remove', function(done) {
      // var randomEmail = function(){
      //   return Math.floor(Math.random(100000) * 100000).toString();
      // };
      chai.request(app)
        .delete('/devs/remove')
        .send({'Test': 'text'})
        .then(function(res){
          expect(res).to.have.status(404);
          expect(res.req.method).to.equal('derp derp');
        })
        done();
    });

    it('should use put method on /update', function(done) {
      // var randomEmail = function(){
      //   return Math.floor(Math.random(100000) * 100000).toString();
      // };
      chai.request(app)
        .put('/devs/update')
        .send({})
        .end(function(err, res){
          expect(res.req.method).to.equal('PUT');
          expect(res).to.have.status(200);
        })
        done();
    });


});