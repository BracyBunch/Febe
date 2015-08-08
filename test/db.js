var Promise   = require('bluebird');
var expect    = require('chai').expect;

var models = require('../db');

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() DELETE n,r', {'ids': ids}, function() {
    cb();
  });
};

describe('DB tests', function() {
  before(function(done) {
    done();
  });

  after(function(done) {
   done();
  });

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
      models.User.create({'first_name': 'test', 'last_name': 'dev', 'email': 'test_dev@gmail.com'}).then(function(user) {
        ids_to_be_deleted.push(user.id);
        instances.dev = user;

        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('dev');
        expect(user.email).to.eql('test_dev@gmail.com');
        expect(user.kind).to.eql('dev');
        done();
      }, done);
    });

    it('should be able to update a User', function(done) {
      models.User.update(instances.dev.id, {'last_name': 'updated'}).then(function(user) {
        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('updated');
        expect(user.email).to.eql('test_dev@gmail.com');
        expect(user.kind).to.eql('dev');

        models.User.read(instances.dev.id).then(function(n_user) {
          expect(n_user).to.be.an('object');
          expect(n_user.first_name).to.eql('test');
          expect(n_user.last_name).to.eql('updated');
          expect(n_user.email).to.eql('test_dev@gmail.com');
          expect(n_user.kind).to.eql('dev');
          done();
        });
      }, done);
    });

    it('should be able to update a User without an id parameter', function(done) {
      models.User.update({'id': instances.dev.id, 'last_name': 'updated again'}).then(function(user) {
        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('updated again');
        expect(user.email).to.eql('test_dev@gmail.com');
        expect(user.kind).to.eql('dev');

        models.User.read(instances.dev.id).then(function(n_user) {
          expect(n_user).to.be.an('object');
          expect(n_user.first_name).to.eql('test');
          expect(n_user.last_name).to.eql('updated again');
          expect(n_user.email).to.eql('test_dev@gmail.com');
          expect(n_user.kind).to.eql('dev');
          done();
        });
      }, done);
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
        instances.rep = user;

        expect(user).to.be.an('object');
        expect(user.first_name).to.eql('test');
        expect(user.last_name).to.eql('rep');
        expect(user.email).to.eql('test_rep@gmail.com');
        expect(user.kind).to.eql('rep');
        done();
      }, done);
    });

  });

  describe('Project tests', function() {
    var ids_to_be_deleted = [];
    var instances = {};

    before(function(done) {
      Promise.props({
        'rep': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'rep', 'email': 'p_test_rep@gmail.com'}),
        'dev1': models.User.create({'first_name': 'test1', 'last_name': 'dev', 'email': 'p_test_dev1@gmail.com'}),
        'dev2': models.User.create({'first_name': 'test2', 'last_name': 'dev', 'email': 'p_test_dev2@gmail.com'}),
        'dev3': models.User.create({'first_name': 'test3', 'last_name': 'dev', 'email': 'p_test_dev3@gmail.com'})
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
      models.Project.create({'name': 'test_project', 'description': 'just a test', 'complete_by': new Date(2015, 6, 14)}, instances.org, instances.users.rep).then(function(t_project) {
        ids_to_be_deleted.push(t_project.id);
        instances.project = t_project;

        expect(t_project).to.be.an('object');
        expect(t_project.name).to.be.a('string');
        expect(t_project.description).to.be.a('string');
        expect(t_project.published).to.eql(false);
        done();
      }, done);
    });

    it('should be able to update a Project', function(done) {
      models.Project.update(instances.project.id, {'published': 'true'}).then(function(t_project) {
        expect(t_project).to.be.an('object');
        expect(t_project.name).to.be.a('string');
        expect(t_project.description).to.be.a('string');
        expect(t_project.published).to.eql(true);

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
      models.Project.update({'id': instances.project.id, 'description': 'updated'}).then(function(t_project) {
        expect(t_project).to.be.an('object');
        expect(t_project.name).to.be.a('string');
        expect(t_project.description).to.be.a('string');
        expect(t_project.published).to.eql(true);
        expect(t_project.description).to.eql('updated');

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

  describe('Tag tests', function() {
    var ids_to_be_deleted = [];
    var instances = {};

    before(function(done) {
      done();
    });

    after(function(done) {
      clean_up(ids_to_be_deleted, done);
    });

    it('should be able to create a Tag', function(done) {
      models.Tag.create({'kind': 'skill', 'name': 'test'}).then(function(tag) {
        ids_to_be_deleted.push(tag.id);
        instances.tag = tag;

        expect(tag).to.be.an('object');
        expect(tag.kind).to.eql('skill');
        expect(tag.name).to.eql('test');
        done();
      }, done);
    });

    it('should be able to update a Tag', function(done) {
      models.Tag.update(instances.tag.id, {'name': 'updated'}).then(function(tag) {
        expect(tag).to.be.an('object');
        expect(tag.kind).to.eql('skill');
        expect(tag.name).to.eql('updated');

        models.Tag.read(instances.tag.id).then(function(tag) {
        expect(tag).to.be.an('object');
        expect(tag.kind).to.eql('skill');
        expect(tag.name).to.eql('updated');
          done();
        });
      }, done);
    });

    it('should be able to update a Tag without an id parameter', function(done) {
      models.Tag.update({'id': instances.tag.id, 'name': 'updated again'}).then(function(tag) {
        instances.tag = tag;

        expect(tag).to.be.an('object');
        expect(tag.kind).to.eql('skill');
        expect(tag.name).to.eql('updated again');

        models.Tag.read(instances.tag.id).then(function(tag) {
        expect(tag).to.be.an('object');
        expect(tag.kind).to.eql('skill');
        expect(tag.name).to.eql('updated again');
          done();
        });
      }, done);

    });

  });

  describe('Organization tests', function() {
    var ids_to_be_deleted = [];
    var instances;

    before(function(done) {
      Promise.props({
        'rep': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'rep', 'email': 'p_test_rep@gmail.com'})
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

  });

  describe('Integration tests', function() {
    var ids_to_be_deleted = [];
    var instances = {};

    before(function(done) {
      Promise.props({
        'rep': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'rep', 'email': 'p_test_rep@gmail.com'}),
        'dev1': models.User.create({'first_name': 'test1', 'last_name': 'dev', 'email': 'p_test_dev1@gmail.com'}),
        'dev2': models.User.create({'first_name': 'test2', 'last_name': 'dev', 'email': 'p_test_dev2@gmail.com'}),
        'dev3': models.User.create({'first_name': 'test3', 'last_name': 'dev', 'email': 'p_test_dev3@gmail.com'})
      }).then(function(users) {
        instances.users = users;
        for (var key in instances.users) {
          ids_to_be_deleted.push(instances.users[key].id);
        }

        return models.Organization.create({'ein': '0', 'name': 'test_org', 'description': 'just a test', 'website_url': 'http://test.com', 'location': 'Testville'}, instances.users.rep).then(function(org) {
          instances.org = org;
          ids_to_be_deleted.push(instances.org.id);
        });
      }).then(function() {
        return models.Project.create({'name': 'test_project', 'description': 'just a test', 'complete_by': new Date(2015, 6, 14)}, instances.org, instances.users.rep).then(function(project) {
          instances.project = project;
          ids_to_be_deleted.push(instances.project.id);
        });
      }).then(function() {
        Promise.props({
          'skill1': models.Tag.create({'kind': 'skill', 'name': 'test1'}),
          'skill2': models.Tag.create({'kind': 'skill', 'name': 'test2'})
        }).then(function(tags) {
          instances.tags = tags;
          for (var key in instances.tags) {
            ids_to_be_deleted.push(instances.tags[key].id);
          }
          done();
        });
      });
    });

    after(function(done) {
      clean_up(ids_to_be_deleted, done);
    });

    it('should be able to add Users as members of a Project', function(done) {
      models.Project.add_members(instances.project, [instances.users.dev1, instances.users.dev2, instances.users.dev3]).then(function() {
        models.Project.with_extras(instances.project.id, {'members': true}).then(function(t_project) {
          expect(t_project.members).to.be.an('array');
          expect(t_project.members).to.have.length(3);
          expect(t_project.members[0]).to.be.an('object');
          expect(t_project.members[0].kind).to.eql('dev');
          done();
        }, done);
      }, done);
    });

    it('shouldn\'t be able to add User as a member of a Project more than once', function(done) {
      models.Project.add_member(instances.project, instances.users.dev1).then(function() {
        done(new Error('Added User as a member multiple times'));
      }).catch(function() {
        var query = [
          'MATCH (u:User) WHERE id(u)={user_id}',
          'MATCH (p:Project) WHERE id(p)={project_id}',
          'MATCH r=(u)-[:member_of]->(p)',
          'RETURN COUNT(r) AS num'
        ].join(' ');

        models.db.query(query, {'user_id': instances.users.dev1.id, 'project_id': instances.project.id}).then(function(row) {
          if (row.num === 1) {
            done();
          } else {
            done(new Error('Added User as a member multiple times'));
          }
        }, done);
      });
    });

    it('should be able to add Tags to Users as strengths', function(done) {
      models.User.add_strengths(instances.users.dev1, [instances.tags.skill1, instances.tags.skill2]).then(function() {
        models.User.with_extras(instances.users.dev1.id, {'strengths': true}).then(function(user) {
          expect(user.strengths).to.be.an('array');
          expect(user.strengths).to.have.length(2);
          expect(user.strengths[0]).to.be.an('object');
          expect(user.strengths[0].kind).to.eql('skill');
          done();
        }, done);
      }, done);
    });

    it('shouldn\'t be able to add Tag as a strength more than once', function(done) {
      models.User.add_strength(instances.users.dev1, instances.tags.skill1).then(function() {
        done(new Error('Added Tag as a strength multiple times'));
      }).catch(function() {
        var query = [
          'MATCH (u:User) WHERE id(u)={user_id}',
          'MATCH (t:Tag) WHERE id(t)={tag_id}',
          'MATCH r=(u)-[:strength]->(t)',
          'RETURN COUNT(r) AS num'
        ].join(' ');

        models.db.query(query, {'user_id': instances.users.dev1.id, 'tag_id': instances.tags.skill1.id}).then(function(row) {
          if (row.num === 1) {
            done();
          } else {
            done(new Error('Added Tag as a strength multiple times'));
          }
        }, done);
      });
    });

  });

});
