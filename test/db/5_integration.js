var Promise   = require('bluebird');
var expect    = require('chai').expect;

var models = require('../../db');

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() DELETE n,r', {'ids': ids}, function() {
    cb();
  });
};

describe('Integration tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    Promise.props({
      'rep': models.User.create({'kind': 'rep', 'first_name': 'test', 'last_name': 'user', 'email': 'p_test_rep@gmail.com'}),
      'dev1': models.User.create({'first_name': 'test1', 'last_name': 'user', 'email': 'p_test_dev1@gmail.com'}),
      'dev2': models.User.create({'first_name': 'test2', 'last_name': 'user', 'email': 'p_test_dev2@gmail.com'}),
      'dev3': models.User.create({'first_name': 'test3', 'last_name': 'user', 'email': 'p_test_dev3@gmail.com'})
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
        'skill2': models.Tag.create({'kind': 'skill', 'name': 'test2'}),
        'cause1': models.Tag.create({'kind': 'cause', 'name': 'cause1'}),
        'cause2': models.Tag.create({'kind': 'cause', 'name': 'cause2'})
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
      models.Project.with_extras(instances.project, {'members': true}).then(function(t_project) {
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

  it('shouldn\'t include private information in Project.with_extras', function(done) {
    models.Project.with_extras(instances.project, true).then(function(project) {
      expect(project.owner).to.have.all.keys(models.User.public_fields);
      expect(project.organization).to.contain.any.keys(models.Organization.public_fields);

      for(var key in project.organization) {
        expect(models.Organization.public_fields.indexOf(key)).to.be.gt(-1);
      }

      project.members.forEach(function(member) {
        expect(member).to.have.all.keys(models.User.public_fields);
      });

      done();
    }, done);
  });

  it('should be able to add Tags to Users as strengths', function(done) {
    models.User.add_strengths(instances.users.dev1, [instances.tags.skill1, instances.tags.skill2]).then(function() {
      models.User.with_extras(instances.users.dev1, {'strengths': true}).then(function(user) {
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

  it('should be able to add Tags to Users as interests', function(done) {
    models.User.add_interests(instances.users.dev1, [instances.tags.cause1, instances.tags.cause2]).then(function() {
      models.User.with_extras(instances.users.dev1, {'interests': true}).then(function(user) {
        expect(user.interests).to.be.an('array');
        expect(user.interests).to.have.length(2);
        expect(user.interests[0]).to.be.an('object');
        expect(user.interests[0].kind).to.eql('cause');
        done();
      }, done);
    }, done);
  });

  it('shouldn\'t be able to add Tag as an interest more than once', function(done) {
    models.User.add_interest(instances.users.dev1, instances.tags.cause1).then(function() {
      done(new Error('Added Tag as an interest multiple times'));
    }).catch(function() {
      var query = [
        'MATCH (u:User) WHERE id(u)={user_id}',
        'MATCH (t:Tag) WHERE id(t)={tag_id}',
        'MATCH r=(u)-[:interest]->(t)',
        'RETURN COUNT(r) AS num'
      ].join(' ');

      models.db.query(query, {'user_id': instances.users.dev1.id, 'tag_id': instances.tags.cause1.id}).then(function(row) {
        if (row.num === 1) {
          done();
        } else {
          done(new Error('Added Tag as an interest multiple times'));
        }
      }, done);
    });
  });

  it('should be able to add Tags to Organizations as causes', function(done) {
    models.Organization.add_causes(instances.org, [instances.tags.cause1, instances.tags.cause2]).then(function() {
      models.Organization.with_extras(instances.org, {'causes': true}).then(function(org) {
        expect(org.causes).to.be.an('array');
        expect(org.causes).to.have.length(2);
        expect(org.causes[0]).to.be.an('object');
        expect(org.causes[0].kind).to.eql('cause');
        done();
      }, done);
    }, done);
  });

  it('shouldn\'t be able to add Tag as a cause more than once', function(done) {
    models.Organization.add_cause(instances.org, instances.tags.cause1).then(function() {
      done(new Error('Added Tag as a cause multiple times'));
    }).catch(function() {
      var query = [
        'MATCH (o:Organization) WHERE id(o)={org_id}',
        'MATCH (t:Tag) WHERE id(t)={tag_id}',
        'MATCH r=(o)-[:cause]->(t)',
        'RETURN COUNT(r) AS num'
      ].join(' ');

      models.db.query(query, {'org_id': instances.org.id, 'tag_id': instances.tags.cause1.id}).then(function(row) {
        if (row.num === 1) {
          done();
        } else {
          done(new Error('Added Tag as a cause multiple times'));
        }
      }, done);
    });
  });

  it('should be able to add Tags to Projects as skills', function(done) {
    models.Project.add_skills(instances.project, [instances.tags.skill1, instances.tags.skill2]).then(function() {
      models.Project.with_extras(instances.project, {'skills': true}).then(function(project) {
        expect(project.skills).to.be.an('array');
        expect(project.skills).to.have.length(2);
        expect(project.skills[0]).to.be.an('object');
        expect(project.skills[0].kind).to.eql('skill');
        done();
      }, done);
    }, done);
  });

  it('shouldn\'t be able to add Tag as a skill more than once', function(done) {
    models.Project.add_skill(instances.project, instances.tags.skill1).then(function() {
      done(new Error('Added Tag as a skill multiple times'));
    }).catch(function() {
      var query = [
        'MATCH (p:Project) WHERE id(p)={project_id}',
        'MATCH (t:Tag) WHERE id(t)={tag_id}',
        'MATCH r=(p)-[:skill]->(t)',
        'RETURN COUNT(r) AS num'
      ].join(' ');

      models.db.query(query, {'project_id': instances.project.id, 'tag_id': instances.tags.skill1.id}).then(function(row) {
        if (row.num === 1) {
          done();
        } else {
          done(new Error('Added Tag as a skill multiple times'));
        }
      }, done);
    });
  });

});
