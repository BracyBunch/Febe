var _ = require('lodash');
var Promise = require('bluebird');
var chai     = require('chai');
var expect   = require('chai').expect;
var chaiHttp = require('chai-http');
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

describe('Tag Route Tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    Promise.props({
      'skill1': models.Tag.create({'name': 'skill1', 'kind': 'skill'}),
      'skill2': models.Tag.create({'name': 'skill2', 'kind': 'skill'}),
      'cause1': models.Tag.create({'name': 'cause1', 'kind': 'cause'}),
      'cause2': models.Tag.create({'name': 'cause2', 'kind': 'cause'})
    }).then(function(tags) {
      instances.skills = {'skill1': tags.skill1, 'skill2': tags.skill2};
      instances.causes = {'cause1': tags.cause1, 'cause2': tags.cause2};

      ids_to_be_deleted = ids_to_be_deleted.concat(_.pluck(instances.skills, 'id'));
      ids_to_be_deleted = ids_to_be_deleted.concat(_.pluck(instances.causes, 'id'));
      done();
    });
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('should be able search for skills', function(done) {
    http.get('/tag/search').query({'kind': 'skill', 'fragment': 'skill'}).then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an.array;
      expect(res.body).to.have.length(2);

      done();
    });
  });

  it('should be able search for skills (pt2)', function(done) {
    http.get('/tag/search').query({'kind': 'skill', 'fragment': 'skill1'}).then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an.array;
      expect(res.body).to.have.length(1);
      expect(res.body[0]).to.be.an.array;
      expect(res.body[0].id).to.be.eql(instances.skills.skill1.id);
      expect(res.body[0].kind).to.be.eql('skill');

      done();
    });
  });

  it('should be able search for causes', function(done) {
    http.get('/tag/search').query({'kind': 'cause', 'fragment': 'cause'}).then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an.array;
      expect(res.body).to.have.length(2);

      done();
    });
  });

  it('should be able search for causes (pt2)', function(done) {
    http.get('/tag/search').query({'kind': 'cause', 'fragment': 'cause1'}).then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an.array;
      expect(res.body).to.have.length(1);
      expect(res.body[0]).to.be.an.array;
      expect(res.body[0].id).to.be.eql(instances.causes.cause1.id);

      done();
    });
  });

  it('should be able search for both skills and causes', function(done) {
    http.get('/tag/search').query({'fragment': '1'}).then(function(res) {
      expect(res).to.have.status(200);
      expect(res).to.be.json;
      expect(res.body).to.be.an.array;
      expect(res.body).to.have.length(2);

      done();
    });
  });

});
