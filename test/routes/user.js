var chai     = require('chai');
var expect   = require('chai').expect;
var chaiHttp = require('chai-http');
var user     = require('../../routes/user');
var app      = require('../../app');

chai.use(chaiHttp);

xdescribe('User Route Tests', function() {

    it('should return with status code 200 after POST to /user/add', function(done) {
      chai.request(app)
        .post('/user/add')
        .send({'Test': 'test'})
        .end(function(res){
          expect(res.req.method).to.equal('POST');
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should return with status code 404 after GET to /user/add', function(done) {
      chai.request(app)
        .get('/user/add')
        .end(function(res){
          expect(res.res.body.status).to.equal(404);
          done();
        });
    });

    it('should use delete method on /remove', function(done) {
      chai.request(app)
        .delete('/user/remove')
        .send({'Test': 'text'})
        .then(function(res){
          expect(res.req.method).to.equal('DELETE');
          expect(res).to.have.status(200);
          done();
        });
    });

    it('should use put method on /update', function(done) {
      chai.request(app)
        .put('/user/update')
        .send({'Test': 'text'})
        .end(function(err, res){
          expect(res.req.method).to.equal('PUT');
          expect(res).to.have.status(200);
          done();
        });
    });

});
