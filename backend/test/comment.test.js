const chai = require('chai');
const {
  expect,
} = require('chai');
const should = require('chai').should();
const chaiHttp = require('chai-http');
const commentUrl = 'http://localhost:8080/comments';
chai.use(chaiHttp);
const account = {
  username: 'admin@admin.com',
  password: 'admin',
};
const comment = {
  "user": {
    "_id": "5af98ca9a7580c1f4cb83099",
    "username": "Marton17"
  },
  "text": "Test test test!",
}
const commentUpdate = {
  "user": {
    "_id": "5af98ca9a7580c1f4cb83099",
    "username": "Marton17"
  },
  "text": "Updated Comment Test!",
}

let cookie;
let id = '/';
describe('Comments', () => {
  // login
  beforeEach((done) => {
    chai.request('http://localhost:8080/comments')
      .get('/')
      .send(account)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        cookie = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  // Comments list test
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(commentUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Array');
          res.body[0].user.username.should.be.eql('Bánfi Péter');
          done();
        });
    });
  });
  // Comments find test
  describe('find()', () => {
    it('should find comment specified by id', (done) => {
      chai.request(commentUrl)
        .get('/5b047dc5b881cc2e481a42bf')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.user.username.should.be.eql('Bánfi Péter');
          done();
        });
    });
  });
  // Comment post test
  describe('create()', () => {
    it('should create comment in database', (done) => {
      chai.request(commentUrl)
        .post('/5af99826722bf5522c3d40a1')
        .set('Cookie', cookie)
        .send(comment)
        .end((err, res) => {
          id += res.body._id;
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.productName.should.be.eql('Jack Daniels');
          done();
        });
    });
  });
  //comment update test
  describe('update()', () => {
    it('should update specified comment with given data', (done) => {
      chai.request(commentUrl)
        .put('/5b05e72b4b3f911bf027ad0e')
        .set('Cookie', cookie)
        .send(commentUpdate)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.text.should.be.eql('Updated Comment Test!');
          done();
        });
    });
  });
  // comment delete test
  describe('remove()', () => {
    it('should delete specified comment', (done) => {
      chai.request(commentUrl)
        .delete('/5af99826722bf5522c3d40a1/5b05eace4e520c1c3014e75b')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          //res.body.should.be.eql({});
          done();
        });
    });
  });
});