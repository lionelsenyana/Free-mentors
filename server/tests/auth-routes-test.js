// var assert = require('assert');
// var authorizationRouter = require('../routes/auth-routes');

import chai from 'chai';
import chaiHttp from 'chai-http';
// import mocha from 'mocha';
import server from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const newUser = {
  email: '1@gmail.com',
  password: '123456',
};

/*
 * 1) Tests for sign up:
 */
describe('User should signup', () => {
  it('Expect signup to pass', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Expect signup to fail', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send({})
      .end((err, res) => {
        console.log(res.body);
        
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});