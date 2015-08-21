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
    Promise.props({
      'user': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep@gmail.com', 'password': '$2a$10$rRuOCaxfc4p16.cjoAYI2els/JeZvqB9kb707zNcWpFB6ZlP1yzYe'}),
      'user2': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep2@gmail.com'}),
      'cause': models.Tag.create({'kind': 'cause', 'name': 'test_cause'}),
      'skill': models.Tag.create({'kind': 'skill', 'name': 'test_skill'})
    }).then(function(models) {
      instances = models;
      ids_to_be_deleted.push(instances.user.id, instances.user2.id, instances.cause.id, instances.skill.id);
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
    http.put('/user')    .send({
      'first_name': 'updated_test',
      'links': ['http://test.com'],
      'strengths': [instances.skill.id],
      'interests': [instances.cause.id]
    }).then(function(res) {
      expect(res).to.have.status(200);
      return models.User.with_extras(instances.user);
    }).then(function(user) {
      expect(user.first_name).to.be.eql('updated_test');
      expect(user.strengths).to.have.length(1);
      expect(user.strengths[0].name).to.be.eql('test_skill');
      expect(user.interests).to.have.length(1);
      expect(user.interests[0].name).to.be.eql('test_cause');
      done();
    });
  });

  it('shouldn\'t be able to update a Users email to one that\'s already in use', function(done) {
    http.put('/user').send({'email': 'p_test_rep2@gmail.com'}).then(function() {
      return models.User.read(instances.user.id);
    }).then(function(user) {
      expect(user.email).to.be.eql('p_test_rep@gmail.com');
      done();
    });
  });

});
