const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('express')().use('/', require('./routes'));
//const app = require('../../app');

chai.should();

chai.use(chaiHttp);

describe('Test APIS', () => {
  describe('GET /list', () => {
    it('It should GET all available files list', (done) => {
      chai.request(app)
        .get('/list')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });

    it('It should GET all files data', (done) => {
      chai.request(app)
        .get('/data')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });

    it('It should GET a one file data by QueryParams', (done) => {
      chai.request(app)
        .get('/data?fileName=test2.csv')
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('array');
          done();
        });
    });

    it('It should GET a 404 status', (done) => {
      chai.request(app)
        .get('/data?fileName=test4.csv')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});
