
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const mentor = {
  mentorId: '1234',
};

/*
 * 1) Tests for creating a session:
 */
describe('User should create sessions', () => {
  it('Expect to create sessions', (done) => {
    chai.request(server)
      .post('/api/v1/sessions')
      .set('token', global.savedUser.token)
      .send(mentor)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Expect to fail to create sessions', (done) => {
    chai.request(server)
      .post('/api/v1/sessions')
      .send(mentor)
      .end((err, res) => {
        console.log(res.body);
        
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
