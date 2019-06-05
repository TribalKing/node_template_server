const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const request = require('request');
const assert = require('assert');
const config = require('config');

const serverPath = 'http://' + config.get('db.host') + ':' + config.get('db.port');


describe('API Calls', function() {

    describe('User', function() {
        it('API Working - Server Started', function(done) {
            request(serverPath + '/', function(error, response, body) {
                expect(body).to.equal('"Success! API is working!"');
                done();
            });
        });

        it('Get all users', function(done) {
            request(serverPath + '/api/users', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('Create a new user', function(done) {
            chai.request(serverPath)
                .post('/api/users')
                .send({
                    username: 'test',
                    email: 'test@email.com',
                    password: 'myPassword',
                    passwordConf: 'myPassword',
                })
                .end(function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
        });

        it('Login', function(done) {
            chai.request(serverPath)
                .post('/api/users/login')
                .send({
                    password: 'myPassword',
                    email: 'user@email.com'
                })
                .end(function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
        });        

        it('Get all currently logged users', function(done) {
            request(serverPath + '/api/users/current', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });        

        it('Logout', function(done) {
            request(serverPath + '/api/users/logout', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

    });

    describe('Country', function() {

        it('Get all countries', function(done) {
            request(serverPath + '/api/countries', function(error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });        

        it('Create a new country', function(done) {
            chai.request(serverPath)
                .post('/api/users')
                .send({
                    name: 'test',
                })
                .end(function(error, response, body) {
                    expect(response.statusCode).to.equal(200);
                    done();
                });
        });

    });

});