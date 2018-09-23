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
         expect(res.status).to.eql(200);
         expect(res.body.data).to.be.an('array')
         done()
       });
  })

})

describe('GET /api/v1/movies?filters', () => {

  it('should return all movies with "happy" in title ', (done) => {

    const promises = [
      Movie.create({ title: 'Happy Life' }),
      Movie.create({ title: 'Happy Sad' }),
      Movie.create({ title: 'The Babadoock' })
    ]

    Promise
      .all(promises)
      .then(() => {
        chai
          .request(app.default)
          .get('/api/v1/movies?title=happy')
          .end((err, res) => {
             expect(res.status).to.eql(200);
             expect(res.body.data).to.be.an('array');
             expect(res.body.data).to.have.lengthOf(2);
             expect(res.body.data[0].title.toLowerCase()).to.include('happy');
             expect(res.body.data[1].title.toLowerCase()).to.include('happy');
             done()
           });
      })
  })

  it('should return all movies shorter than 120 min and longer or equal 45 min ', (done) => {

    const promises = [
      Movie.create({ runtime: 45 }),
      Movie.create({ runtime: 120 }),
      Movie.create({ runtime: 93 })
    ]

    Promise
      .all(promises)
      .then(() => {
        chai
          .request(app.default)
          .get('/api/v1/movies?runtim[gte]=45&runtime[lt]=120')
          .end((err, res) => {
             expect(res.status).to.eql(200);
             expect(res.body.data).to.be.an('array');
             expect(res.body.data).to.have.lengthOf(2);
             expect(res.body.data[0].runtime).to.be.within(45, 119);
             expect(res.body.data[1].runtime).to.be.within(45, 119);
             done()
           });
      })
  })

  it('should return all movies containing provided genres', (done) => {

    const promises = [
      Movie.create({ genre: ['Drama', 'Fantasy', 'Thriller'] }),
      Movie.create({ genre: ['Drama', 'Horror'] }),
      Movie.create({ genre: ['Horror', 'Gore'] }),
      Movie.create({ genre: ['Comic', 'Anime'] }),
    ]

    Promise
      .all(promises)
      .then(() => {
        chai
          .request(app.default)
          .get('/api/v1/movies?genre=horror,fantasy')
          .end((err, res) => {
             expect(res.status).to.eql(200);
             expect(res.body.data).to.be.an('array');
             expect(res.body.data).to.have.lengthOf(3);
             expect(res.body.data[0].genre).to.include('Fantasy');
             expect(res.body.data[1].genre).to.include('Horror');
             expect(res.body.data[2].genre).to.include('Horror');
             done()
           });
      })
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
             expect(res.status).to.eql(200);
             expect(res.body.data._id).to.eql(movie.id)
             done()
           });
      })
  })

})


describe('POST /api/v1/movies', () => {

  it('should not add new movie without title provided', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/movies')
      .send({})
      .end((err, res) => {
         expect(res.status).to.eql(400);
         expect(res.body.success).to.be.false;
         expect(res.body.message).to.eql('Request body should contain movie title.');
         done()
       });
  })

  it('should not add new movie with provided title too short', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/movies')
      .send({ title: 'aa'})
      .end((err, res) => {
         expect(res.status).to.eql(400);
         expect(res.body.success).to.be.false;
         expect(res.body.message).to.eql('Title should be at least 3 characters long.');
         done()
       });
  })

  it('should not add new movie if movie is not found in omdb API', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/movies')
      .send({ title: 'asdfasdfasdfs'})
      .end((err, res) => {
         expect(res.status).to.eql(404);
         expect(res.body.success).to.be.false;
         expect(res.body.message).to.eql('Movie with provided title does not exist.');
         done()
       });
  })

  it('should add new movie to db', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/movies')
      .send({ title: 'Fight Club' })
      .end((err, res) => {
         expect(res.status).to.eql(201);
         expect(res.body.success).to.be.true;
         expect(res.body.data.title).to.eql('Fight Club');
         done()
       });
  })


})
