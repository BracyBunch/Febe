var Promise   = require('bluebird');
var expect    = require('chai').expect;

var models = require('../../db');

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() DELETE n,r', {'ids': ids}, function() {
    cb();
  });
};


describe('Project tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    Promise.props({
      'rep': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep@gmail.com'}),
      'dev1': models.User.create({'first_name': 'test1', 'last_name': 'user', 'email': 'p_test_dev1@gmail.com'}),
      'dev2': models.User.create({'first_name': 'test2', 'last_name': 'user', 'email': 'p_test_dev2@gmail.com'}),
      'dev3': models.User.create({'first_name': 'test3', 'last_name': 'user', 'email': 'p_test_dev3@gmail.com'})
      // 'tag1': models.Tag.create
    }).then(function(p_users) {
      instances.users = p_users;
      for (var key in instances.users) {
        ids_to_be_deleted.push(instances.users[key].id);
      }

      return models.Organization.create({'ein': '0', 'name': 'test_org', 'description': 'just a test', 'website_url': 'http://test.com', 'location': 'Testville'}, instances.users.rep).then(function(org) {
        instances.org = org;
        ids_to_be_deleted.push(instances.org.id);
      }).then(function() {
        done();
      });
    });
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('shouldn\'t be able to create a Project without an owner', function(done) {
    models.Project.create({'name': 'test_project', 'description': 'just a test'}).then(function(project) {
      ids_to_be_deleted.push(project.id);

      done(new Error('Project was created'));
    }).catch(function() {
      done();
    });
  });

  it('should be able to create a Project', function(done) {
    models.Project.create({'name': 'test_project', 'description': 'just a test', 'complete_by': new Date(2015, 6, 14)}, instances.org, instances.users.rep).then(function(project) {
      ids_to_be_deleted.push(project.id);
      instances.project = project;

      expect(project).to.be.an('object');
      expect(project.name).to.be.a('string');
      expect(project.description).to.be.a('string');
      expect(project.published).to.eql(false);
      done();
    }, done);
  });

  it('should be able to update a Project', function(done) {
    models.Project.update(instances.project.id, {'published': 'true'}).then(function(project) {
      expect(project).to.be.an('object');
      expect(project.name).to.be.a('string');
      expect(project.description).to.be.a('string');
      expect(project.published).to.eql(true);

      models.Project.read(instances.project.id).then(function(t_project) {
        expect(t_project).to.be.an('object');
        expect(t_project.name).to.be.a('string');
        expect(t_project.description).to.be.a('string');
        expect(t_project.published).to.eql(true);
        done();
      });
    }, done);
  });

  it('should be able to update a Project without an id parameter', function(done) {
    models.Project.update({'id': instances.project.id, 'description': 'updated'}).then(function(project) {
      expect(project).to.be.an('object');
      expect(project.name).to.be.a('string');
      expect(project.description).to.be.a('string');
      expect(project.published).to.eql(true);
      expect(project.description).to.eql('updated');

      models.Project.read(instances.project.id).then(function(t_project) {
        expect(t_project).to.be.an('object');
        expect(t_project.name).to.be.a('string');
        expect(t_project.description).to.be.a('string');
        expect(t_project.published).to.eql(true);
        expect(t_project.description).to.eql('updated');
        done();
      });
    }, done);
  });

});
