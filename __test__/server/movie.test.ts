import * as app from '../../src/server/app';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import 'mocha';

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /api/v1/movies', () => {

  it('should return all movies', (done) => {
    chai
      .request(app.default)
      .get('/api/v1/movies')
      .end((err, res) => {
         chai.expect(res.status).to.eql(200);
         expect(res.body.data).to.be.an('array')
         done()
       });
  })

})

describe('POST /api/v1/movies', () => {

  it('should add new movie to db', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/comments')
      .send({ title: 'Fignt Club' })
      .end((err, res) => {
         chai.expect(res.status).to.eql(201);
         chai.expect(res.body.success).to.eql(true);
         done()
       });
  })


})
