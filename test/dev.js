var chai     = require('chai');
var expect   = require('chai').expect;
var chaiHttp = require('chai-http');
var devs     = require('../routes/developers');
var app      = require('../app');

chai.use(chaiHttp);

describe('Developer Tests', function() {

    it('should return with status code 200 after POST to /devs/add', function(done) {
      chai.request(app)
        .post('/devs/add')
        .send('test')
        .end(function(res){
          expect(res.req.method).to.equal('POST')
          expect(res).to.have.status(200)
          done();
        })
    });

    it('should return with status code 404 after GET to /devs/add', function(done) {
      chai.request(app)
        .get('/devs/add')
        .end(function(res){
          expect(res.res.body.status).to.equal(404)
          done();
        })
    });

    it('should use delete method on /remove', function(done) {
      // var randomEmail = function(){
      //   return Math.floor(Math.random(100000) * 100000).toString();
      // };
      chai.request(app)
        .delete('/devs/remove')
        .send({'Test': 'text'})
        .then(function(res){
          expect(res.req.method).to.equal('DELETE');
          expect(res).to.have.status(200);
          done();
        })
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
          done();
        })
    });


});