import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../app';

const { expect } = chai;
chai.use(chaiHttp);

const mentor = {
  email: '1@gmail.com',
  mentorId: '1234'
};

/*
 * 1) Tests for getting a list of mentors:
 */
describe('User should get all mentors', () => {
  it('Expect to get all mentors', (done) => {
    chai.request(server)
      .get('/api/v1/mentor/mentors')
      .set('token',global.savedUser.token)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('Expect to fail to get all mentors', (done) => {
    chai.request(server)
      .get('/api/v1/mentor/mentors')
      .send()
      .end((err, res) => {
        console.log(res.body);
        
        expect(res).to.have.status(401);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});