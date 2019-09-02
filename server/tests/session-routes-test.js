
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

/*
 * 2) Tests for accepting a session:
 */
describe('Mentor should accept a session', () => {
    it('Expect to accept a session', (done) => {
      chai.request(server)
        .patch('/api/v1/sessions/' + global.savedUser.sessionId + '/accept')
        .set('token', global.savedUser.token)
        .send(mentor)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('Expect to fail to accept a session', (done) => {
      chai.request(server)
      .patch('/api/v1/sessions/' + '12345' + '/accept')
        .send(mentor)
        .end((err, res) => {
          console.log(res.body);
          
          expect(res).to.have.status(401);
          expect(res.body).to.be.an('object');
          done();
        });
    });
  });
