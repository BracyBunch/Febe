var expect    = require('chai').expect;

var models = require('../../db');

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() OPTIONAL MATCH (te:TimelineEntry)<-[r2]->(n) DELETE n,r,r2,te', {'ids': ids}, function() {
    cb();
  });
};

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
