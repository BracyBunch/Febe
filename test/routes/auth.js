var Promise = require('bluebird');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);
chai.request.addPromises(Promise);

var app = require('../../app');
var models = require('../../db');

var clean_up = function(ids, cb) {
  models.db.query('MATCH (n) WHERE id(n) IN {ids} OPTIONAL MATCH (n)-[r]-() DELETE n,r', {'ids': ids}, function() {
    cb();
  });
};

describe('Auth tests', function() {
  var ids_to_be_deleted = [];
  var instances = {};

  before(function(done) {
    done();
  });

  after(function(done) {
    clean_up(ids_to_be_deleted, done);
  });

  it('shouldn\'t be able to signup using without required fields', function(done) {
    chai.request(app).post('/auth/signup').send({'last_name': 'user', 'email': 'test@testy.com', 'password': 'charlixcx'}).then(function(res) {
      expect(res.status).to.eql(400);
      done();
    }, done);
  });

  it('should be able to signup as a dev with a password', function(done) {
    chai.request(app).post('/auth/signup').send({'first_name': 'test', 'last_name': 'user', 'email': 'test@testy.com', 'password': 'iconapop'}).then(function(res) {
      expect(res.status).to.eql(200);

      models.User.where({'email': 'test@testy.com'}).then(function(user) {
        if (user.length === 1){
          instances.user = user[0];
          ids_to_be_deleted.push(user[0].id);
        }

        expect(user).to.have.length(1);
        expect(user[0].first_name).to.eql('test');
        expect(user[0].kind).to.eql('dev');
        done();
      }, done);
    }, done);
  });

  it('shouldn\'t be able to signup using an already used email', function(done) {
    chai.request(app).post('/auth/signup').send({'first_name': 'test2', 'last_name': 'user', 'email': 'test@testy.com', 'password': 'charlixcx'}).then(function(res) {
      expect(res.status).to.eql(409);
      done();
    }, done);
  });

  it('should be able to signup as a rep with a password', function(done) {
    chai.request.agent(app).post('/auth/signup').send({'user_kind': 'rep', 'first_name': 'test rep', 'last_name': 'user', 'email': 'test@reppy.com', 'password': 'billyg'}).then(function(res) {
      expect(res.status).to.eql(200);

      models.User.where({'email': 'test@reppy.com'}).then(function(user) {
        if (user.length === 1) ids_to_be_deleted.push(user[0].id);

        expect(user).to.have.length(1);
        expect(user[0].first_name).to.eql('test rep');
        expect(user[0].kind).to.eql('rep');
        done();
      }, done);
    }, done);
  });

  it('should be able to login with a password', function(done) {
    chai.request(app).post('/auth/login').send({'email': 'test@testy.com', 'password': 'iconapop'}).then(function(res) {
      expect(res.status).to.eql(200);
      expect(res).to.have.cookie('connect.sid');
      done();
    }, done);
  });

  it('shouldn\'t be able to login with the wrong password', function(done) {
    chai.request(app).post('/auth/login').send({'email': 'test@testy.com', 'password': 'iloveit'}).then(function(res) {
      expect(res.status).to.eql(401);
      done();
    }, done);
  });

  it('should be able to logout', function(done) {
    var http = chai.request.agent(app);
    http.post('/auth/login').send({'email': 'test@testy.com', 'password': 'iconapop'}).then(function() {
      return http.get('/auth/logout').send().then(function() {
        return http.get('/user/timeline').send();
      });
    }).then(function(res) {
      expect(res.status).to.eql(403);
      done();
    }, done);
  });

});
