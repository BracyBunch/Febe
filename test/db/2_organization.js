var Promise   = require('bluebird');
var expect    = require('chai').expect;

var models = require('../../db');

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() DELETE n,r', {'ids': ids}, function() {
    cb();
  });
};

describe('Organization tests', function() {
  var ids_to_be_deleted = [];
  var instances;

  before(function(done) {
    Promise.props({
      'rep': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep@gmail.com'})
    }).then(function(n_instances) {
      instances = n_instances;
      for (var key in n_instances) {
        ids_to_be_deleted.push(n_instances[key].id);
      }
      done();
    });
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('shouldn\'t be able to create an Organization without an owner', function(done) {
    models.Organization.create({'ein': '0', 'name': 'test_org', 'description': 'just a test', 'website_url': 'http://test.com', 'location': 'Testville'}).then(function() {
      done(new Error('Organization was created'));
    }).catch(function() {
      done();
    });
  });

  it('should be able to create an Organization', function(done) {
    models.Organization.create({'ein': '0', 'name': 'test_org', 'description': 'just a test', 'website_url': 'http://test.com', 'location': 'Testville'}, instances.rep).then(function(t_org) {
      ids_to_be_deleted.push(t_org.id);
      instances.org = t_org;

      expect(t_org).to.be.an('object');
      expect(t_org.name).to.be.a('string');
      expect(t_org.description).to.be.a('string');
      expect(t_org.description).to.eql('just a test');
      expect(t_org.website_url).to.be.a('string');
      done();
    }, done);
  });

  it('should be able to update an Organization', function(done) {
    models.Organization.update(instances.org.id, {'description': 'updated'}).then(function(t_org) {
      expect(t_org).to.be.an('object');
      expect(t_org.name).to.be.a('string');
      expect(t_org.description).to.be.a('string');
      expect(t_org.description).to.eql('updated');
      expect(t_org.website_url).to.be.a('string');

      models.Organization.read(instances.org.id).then(function(t_org) {
        expect(t_org).to.be.an('object');
        expect(t_org.name).to.be.a('string');
        expect(t_org.description).to.be.a('string');
        expect(t_org.description).to.eql('updated');
        expect(t_org.website_url).to.be.a('string');
        done();
      });
    }, done);
  });

  it('should be able to update an Organization without an id parameter', function(done) {
    models.Organization.update({'id': instances.org.id, 'description': 'updated again'}).then(function(t_org) {
      expect(t_org).to.be.an('object');
      expect(t_org.name).to.be.a('string');
      expect(t_org.description).to.be.a('string');
      expect(t_org.description).to.eql('updated again');
      expect(t_org.website_url).to.be.a('string');

      models.Organization.read(instances.org.id).then(function(t_org) {
        expect(t_org).to.be.an('object');
        expect(t_org.name).to.be.a('string');
        expect(t_org.description).to.be.a('string');
        expect(t_org.description).to.eql('updated again');
        expect(t_org.website_url).to.be.a('string');
        done();
      });
    }, done);
  });

  it('shouldn\'t include private information in Organization.with_extras', function(done) {
    models.Organization.with_extras(instances.org, true).then(function(org) {
      for(var key in org.owner) {
        expect(models.User.public_fields.indexOf(key)).to.be.gt(-1);
      }
      done();
    }, done);
  });

});
