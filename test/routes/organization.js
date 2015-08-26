var _ = require('lodash');
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

describe('Organization Route Tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    Promise.props({
      'rep1': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep@gmail.com', 'password': '$2a$10$rRuOCaxfc4p16.cjoAYI2els/JeZvqB9kb707zNcWpFB6ZlP1yzYe'}),
      'rep2': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep2@gmail.com'})
    }).then(function(users) {
      instances.users = users;
      ids_to_be_deleted = ids_to_be_deleted.concat(_.pluck(instances.users, 'id'));
      return http.post('/auth/login').send({'email': 'p_test_rep@gmail.com', 'password': 'testtest'});
    }).then(function() {
      done();
    });
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('should be able to create an Organization', function(done) {
    http.post('/organization')
    .send({
      'ein': '123',
      'name': 'test_org',
      'description': 'abc',
      'website_url': 'http://cats.com',
      'location': 'cat city'
    }).then(function(res) {
      instances.organization = res.body;
      ids_to_be_deleted.push(instances.organization.id);

      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body.name).to.be.eql('test_org');
      done();
    }, done);
  });

  it('should be able to update an Organization', function(done) {
    http.put('/organization/' + instances.organization.id)
    .send({
      'name': 'updated_test_org'
    }).then(function(res) {
      expect(res).to.have.status(200);
      return models.Organization.read(instances.organization.id);
    }).then(function(organization) {
      expect(organization.name).to.be.eql('updated_test_org');
      done();
    });
  });

  it('should be able to add a User to an Organization', function(done) {
    http.put('/organization/' + instances.organization.id + '/add_rep/' + instances.users.rep2.id).send().then(function(res) {
      expect(res).to.have.status(201);
      return models.Organization.with_extras(instances.organization, true);
    }).then(function(organization) {
      expect(organization.reps).to.be.an.array;
      expect(organization.reps).to.have.length(1);
      done();
    });
  });

  it('shouldn\'t be able to add a User to an Organization more than once', function(done) {
    http.put('/organization/' + instances.organization.id + '/add_rep/' + instances.users.rep2.id).send().then(function(res) {
      expect(res).to.have.status(400);

      var query = [
        'MATCH (u:User) WHERE id(u)={user_id}',
        'MATCH (o:Organization) WHERE id(o)={organization_id}',
        'MATCH r=(u)-[:represents]->(o)',
        'RETURN COUNT(r) AS num'
      ].join(' ');

      models.db.query(query, {'user_id': instances.users.rep2.id, 'organization_id': instances.organization.id}).then(function(row) {
        if (row.num === 1) {
          done();
        } else {
          done(new Error('Added User as a rep multiple times'));
        }
      }, done);
    });
  });

});
