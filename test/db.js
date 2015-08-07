var Promise = require('bluebird');
var expect = require('chai').expect;

var models = require('../db');
var ids_to_be_deleted = [];

describe('DB tests', function() {
  before(function(done) {
    done();
  });

  after(function(done) {
    models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() DELETE n,r', {'ids': ids_to_be_deleted}, function() {
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
        ids_to_be_deleted.push(user.id);
        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('dev');
        expect(user.email).to.eql('test_dev@gmail.com');
        expect(user.kind).to.eql('dev');
        done();
      });
    });

    it('shouldn\'t be able to create a User with an email already in use', function(done) {
      models.User.create({'first_name': 'failed', 'last_name': 'test', 'email': 'test_dev@gmail.com'}).then(function(user) {
        ids_to_be_deleted.push(user.id);
        done(new Error('User was created.'));
      }).catch(function() {
        done();
      });
    });

    it('should be able to create a User:rep', function(done) {
      models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'rep', 'email': 'test_rep@gmail.com'}).then(function(user) {
        ids_to_be_deleted.push(user.id);
        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('rep');
        expect(user.email).to.eql('test_rep@gmail.com');
        expect(user.kind).to.eql('rep');
        done();
      });
    });

  });

  describe('Project tests', function() {
    var users, project;

    before(function(done) {
      Promise.props({
        'rep': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'rep', 'email': 'p_test_rep@gmail.com'}),
        'dev1': models.User.create({'first_name': 'test1', 'last_name': 'dev', 'email': 'p_test_dev1@gmail.com'}),
        'dev2': models.User.create({'first_name': 'test2', 'last_name': 'dev', 'email': 'p_test_dev2@gmail.com'}),
        'dev3': models.User.create({'first_name': 'test3', 'last_name': 'dev', 'email': 'p_test_dev3@gmail.com'})
        // 'tag1': models.Tag.create
      }).then(function(p_users) {
        users = p_users;
        for (var key in users) {
          ids_to_be_deleted.push(users[key].id);
        }
        done();
      });
    });

    after(function(done) {
      done();
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
      models.Project.create({'name': 'test_project', 'description': 'just a test', 'complete_by': new Date(2015, 6, 14)}, users.rep).then(function(t_project) {
        ids_to_be_deleted.push(t_project.id);
        console.log(ids_to_be_deleted);
        expect(t_project).to.be.an('object');
        expect(t_project.name).to.be.a('string');
        expect(t_project.description).to.be.a('string');
        expect(t_project.published).to.eql(false);
        project = t_project;
        done();
      });
    });

    it('should be able to add Users as members', function(done) {
      models.Project.add_members(project, [users.dev1, users.dev2, users.dev3]).then(function() {
        models.Project.with_extras(project.id, {'members': true}).then(function(t_project) {
          expect(t_project.members).to.be.an('array');
          expect(t_project.members).to.have.length(3);
          expect(t_project.members[0]).to.be.an('object');
          expect(t_project.members[0].kind).to.eql('dev');
          done();
        });
      });
    });

    it('shouldn\'t be able to add User as a member more than once', function(done) {
      models.Project.add_member(project, users.dev1).then(function() {
        done(new Error('Added User as a member multiple times'));
      }).catch(function() {
        done();
      });
    });


  });

  xdescribe('Tag tests', function() {
    before(function(done) {
      done();
    });

    after(function(done) {
      done();
    });

    it('be able to create an Tag', function(done) {
    });

  });

  xdescribe('Organization tests', function() {
    before(function(done) {
      done();
    });

    after(function(done) {
      done();
    });

    it('be able to create an Organization', function(done) {
    });

  });

});
