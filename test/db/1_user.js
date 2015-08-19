var expect    = require('chai').expect;

var models = require('../../db');

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() OPTIONAL MATCH (te:TimelineEntry)<-[r2]->(n) DELETE n,r,r2,te', {'ids': ids}, function() {
    cb();
  });
};

describe('User tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    done();
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('should be able to create a User', function(done) {
    models.User.create({'first_name': 'test', 'last_name': 'user', 'email': 'test_dev@gmail.com'}).then(function(user) {
      ids_to_be_deleted.push(user.id);
      instances.dev = user;

      expect(user).to.be.an('object');
      expect(user.first_name).to.eql('test');
      expect(user.email).to.eql('test_dev@gmail.com');
      expect(user.kind).to.eql('dev');
      done();
    }, done);
  });

  it('should be able to update a User', function(done) {
    models.User.update(instances.dev.id, {'first_name': 'updated'}).then(function(user) {
      expect(user).to.be.an('object');
      expect(user.first_name).to.eql('updated');
      expect(user.email).to.eql('test_dev@gmail.com');
      expect(user.kind).to.eql('dev');

      models.User.read(instances.dev.id).then(function(n_user) {
        expect(n_user).to.be.an('object');
        expect(n_user.first_name).to.eql('updated');
        expect(n_user.email).to.eql('test_dev@gmail.com');
        expect(n_user.kind).to.eql('dev');
        done();
      });
    }, done);
  });

  it('should be able to update a User without an id parameter', function(done) {
    models.User.update({'id': instances.dev.id, 'first_name': 'updated again'}).then(function(user) {
      expect(user).to.be.an('object');
      expect(user.first_name).to.eql('updated again');
      expect(user.email).to.eql('test_dev@gmail.com');
      expect(user.kind).to.eql('dev');

      models.User.read(instances.dev.id).then(function(n_user) {
        expect(n_user).to.be.an('object');
        expect(n_user.first_name).to.eql('updated again');
        expect(n_user.email).to.eql('test_dev@gmail.com');
        expect(n_user.kind).to.eql('dev');
        done();
      });
    }, done);
  });

  it('shouldn\'t be able to create a User with an email already in use', function(done) {
    models.User.create({'first_name': 'failed', 'last_name': 'user', 'email': 'test_dev@gmail.com'}).then(function(user) {
      ids_to_be_deleted.push(user.id);
      done(new Error('User was created.'));
    }).catch(function() {
      done();
    });
  });

  it('should be able to create a User:rep', function(done) {
    models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'test_rep@gmail.com'}).then(function(user) {
      ids_to_be_deleted.push(user.id);
      instances.rep = user;

      expect(user).to.be.an('object');
      expect(user.first_name).to.eql('test');
      expect(user.email).to.eql('test_rep@gmail.com');
      expect(user.kind).to.eql('rep');
      done();
    }, done);
  });

});
