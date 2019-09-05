// var assert = require('assert');
// var userRouter = require('../routes/user-routes');

// /*
//  * 2) Tests for changing user type:
//  */

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const user = {
  email: '1@gmail.com'
};

describe('User should be changed to a mentor', () => {
  it('Expect change to pass', (done) => {
    chai.request(server)
      .patch('/api/v1/user/' + user.email)
      .set('token', global.savedUser.token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Expect change to fail', (done) => {
    chai.request(server)
      .patch('/api/v1/user/' + user.email)
      .send()
      .end((err, res) => {
        console.log(res.body);
        
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
