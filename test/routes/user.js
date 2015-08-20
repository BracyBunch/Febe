var Promise = require('bluebird');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
chai.request.addPromises(Promise);

var app = require('../../app');
var models = require('../../db');

var http = chai.request.agent(app);

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() OPTIONAL MATCH (te:TimelineEntry)<-[r2]->(n) DELETE n,r,r2,te', {'ids': ids}, function() {
    cb();
  }, function() {
    cb();
  });
};

describe('User Route Tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep@gmail.com', 'password': '$2a$10$rRuOCaxfc4p16.cjoAYI2els/JeZvqB9kb707zNcWpFB6ZlP1yzYe'}).then(function(user) {
      instances.user = user;
      ids_to_be_deleted.push(instances.user.id);
      return http.post('/auth/login').send({'email': 'p_test_rep@gmail.com', 'password': 'testtest'});
    }).then(function() {
      done();
    });
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('should be able to get User info', function(done) {
    http.get('/user/' + instances.user.id).send().then(function(res) {
      expect(res).to.be.json;
      expect(res.body.first_name).to.be.eql('test');
      done();
    });
  });

  it('should be able to update a User', function(done) {
    http.put('/user')
    .send({
      'first_name': 'updated_test'
    }).then(function(res) {
      expect(res).to.have.status(200);
      return models.User.read(instances.user.id);
    }).then(function(user) {
      expect(user.first_name).to.be.eql('updated_test');
      done();
    });
  });

});
