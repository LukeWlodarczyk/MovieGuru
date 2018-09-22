import * as app from '../../src/server/app';
import * as chai from 'chai';
import 'mocha';

import * as mongoose from 'mongoose'

const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const Movie = mongoose.model('movies')

before( async ()=>{
  await Movie.deleteMany({})
})

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

describe('GET /api/v1/movies/:id', () => {

  it('should return movie with provided id', (done) => {

    Movie
      .create({})
      .then(movie => {
        chai
          .request(app.default)
          .get('/api/v1/movies/' + movie.id)
          .end((err, res) => {
             chai.expect(res.status).to.eql(200);
             expect(res.body.data._id).to.eql(movie.id)
             done()
           });
      })
  })
  
})


describe('POST /api/v1/movies', () => {

  it('should add new movie to db', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/movies')
      .send({ title: 'Fight Club' })
      .end((err, res) => {
         chai.expect(res.status).to.eql(201);
         chai.expect(res.body.success).to.eql(true);
         done()
       });
  })


})
