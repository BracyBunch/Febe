var Promise = require('bluebird');
var expect = require('chai').expect;

// process.env.GRAPHSTORY_URL = 'https://neo4j:neo4j@localhost:7473';

var models = require('../db');

describe('DB tests', function() {
  before(function(done) {
    models.db.query('MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r', function() {
      done();
    });
  });

  after(function(done) {
    models.db.query('MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r', function() {
      done();
    });
  });

  describe('User tests', function() {
    before(function(done) {
      done();
    });

    after(function(done) {
      done();
    });

    it('should be able to create a User', function(done) {
      models.User.create({'first_name': 'test', 'last_name': 'dev', 'email': 'test_dev@gmail.com'}).then(function(user) {
        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('dev');
        expect(user.email).to.eql('test_dev@gmail.com');
        expect(user.kind).to.eql('dev');
        done();
      });
    });

    it('shouldn\'t be able to create a User with an email already in use', function(done) {
      models.User.create({'first_name': 'failed', 'last_name': 'test', 'email': 'invalid_test_dev@gmail.com'}).then(function() {
        done('User was created.');
      }).catch(function() {
        done();
      });
    });

    it('should be able to create a User:rep', function(done) {
      models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'rep', 'email': 'test_rep@gmail.com'}).then(function(user) {
        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('rep');
        expect(user.email).to.eql('test_rep@gmail.com');
        expect(user.kind).to.eql('rep');
        done();
      });
    });

  });

});
