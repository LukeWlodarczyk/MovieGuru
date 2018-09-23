import * as app from '../../src/server/app';
import * as chai from 'chai';
import 'mocha';
import * as mongoose from 'mongoose';
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const expect = chai.expect;

const Movie = mongoose.model('movies');
const Comment = mongoose.model('comments');

before( async ()=>{
  await Movie.deleteMany({})
  await Comment.deleteMany({})
})

describe('GET /api/v1/comments', () => {

  it('should return all comments', (done) => {
    chai
      .request(app.default)
      .get('/api/v1/comments')
      .end((err, res) => {
         chai.expect(res.status).to.eql(200);
         expect(res.body.data).to.be.an('array')
         done()
       });
  })

  it('should return all comments with provided movieId', (done) => {

    const promises = [
      Comment.create({ text: 'Hello!', movieId: '5ba4304f6cccb81a9ebc6bdb' }),
      Comment.create({ text: 'Hello!', movieId: '5ba4304f6cccb81a9ebc6bdb' }),
      Comment.create({ text: 'Hello!', movieId: '5ba4304f6cccbasdf768asdf' })
    ]

    Promise
      .all([promises])
      .then(()=> {
        chai
          .request(app.default)
          .get('/api/v1/comments/?movieId=5ba4304f6cccb81a9ebc6bdb')
          .end((err, res) => {
             expect(res.status).to.eql(200);
             expect(res.body.data).to.be.an('array');
             expect(res.body.data[0].movieId).to.be.eql('5ba4304f6cccb81a9ebc6bdb');
             expect(res.body.data[1].movieId).to.be.eql('5ba4304f6cccb81a9ebc6bdb');
             expect(res.body.data).to.have.lengthOf(2);
             done()
           });
      })
  })

})

describe('POST /api/v1/comments', () => {

  it('should not add comment without id', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/comments')
      .send({ text: 'Awsome' })
      .end((err, res) => {
         expect(res.status).to.eql(400);
         expect(res.body.success).to.be.false;
         expect(res.body.message).to.eql('Validation failed. Check data property for more details.');
         done()
       });
  })

  it('should not add comment with invalid id', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/comments')
      .send({ text: 'Awsome', movieId: 'asdq' })
      .end((err, res) => {
         expect(res.status).to.eql(400);
         expect(res.body.success).to.be.false;
         expect(res.body.message).to.eql('Validation failed. Check data property for more details.');
         done()
       });
  })

  it('should not add comment without text', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/comments')
      .send({ text: '', movieId: '5ba4304f6cccb81a9ebc6bdb' })
      .end((err, res) => {
         expect(res.status).to.eql(400);
         expect(res.body.success).to.be.false;
         expect(res.body.message).to.eql('Validation failed. Check data property for more details.');
         done()
       });
  })

  it('should not add comment to nonexistent movie', (done) => {
    chai
      .request(app.default)
      .post('/api/v1/comments')
      .send({ text: 'Awsome', movieId: '5ba4304f6cccb81a9ebc6bdb' })
      .end((err, res) => {
         expect(res.status).to.eql(404);
         expect(res.body.success).to.be.false;
         expect(res.body.message).to.eql('Movie with provided id does not exist. You cannot add comment to nonexistent movie.');
         done()
       });
  })

  it('should add comment to movie', (done) => {

    Movie
      .create({})
      .then(movie => {
        chai
          .request(app.default)
          .post('/api/v1/comments')
          .send({ text: 'Awsome', movieId: movie.id })
          .end((err, res) => {
             expect(res.status).to.eql(201);
             expect(res.body.success).to.be.true;
             expect(res.body.message).to.eql('Comment successfully created.');
             expect(res.body.data.text).to.eql('Awsome');
             expect(res.body.data.movieId).to.eql(movie.id);
             done()
           });
      })
  })


})
