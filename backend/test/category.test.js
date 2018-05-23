const chai = require('chai');
const {
  expect,
} = require('chai');
const should = require('chai').should();

const chaiHttp = require('chai-http');

const categoryUrl = 'http://localhost:8080/categories';
const account = {
  username: 'admin@admin.com',
  password: 'admin',
};
const category = {
  categoryName: 'test',
  categoryPlace: 5655,
};
const put = {
  categoryName: 'put',
  categoryPlace: 5565,
};
let cookie;
let id = '/';

chai.use(chaiHttp);


describe('Categories', () => {
  // login
  beforeEach((done) => {
    chai.request('http://localhost:8080/user')
      .post('/login')
      .send(account)
      .end((err, res) => {
        if (err) {
          throw err;
        }
        cookie = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });

  // Products list test
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(categoryUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Array');
          res.body[0]._id.should.be.eql('5b0415072bde2917381cb271');
          res.body[0].categoryName.should.be.eql('világos sör');
          res.body[0].categoryPlace.should.be.eql(1);
          res.body[0].createdAt.should.be.eql('2018-05-22T13:03:03.686Z');
          done();
        });
    });
  });

  // Products find test
  describe('find()', () => {
    it('should find item', (done) => {
      chai.request(categoryUrl)
        .get('/5b0415072bde2917381cb271')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body._id.should.be.eql('5b0415072bde2917381cb271');
          res.body.categoryName.should.be.eql('világos sör');
          res.body.categoryPlace.should.be.eql(1);
          res.body.createdAt.should.be.eql('2018-05-22T13:03:03.686Z');
          done();
        });
    });
  });

  // Products post test
  describe('create()', () => {
    it('should create give item', (done) => {
      chai.request(categoryUrl)
        .post('/')
        .set('Cookie', cookie)
        .send(category)
        .end((err, res) => {
          id += res['body']['_id'];
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.categoryName.should.be.eql('test');
          res.body.categoryPlace.should.be.eql(5655);
          done();
        });
    });
  });

  // Products update test
  describe('update()', () => {
    it('should update given items with given data', (done) => {
      chai.request(categoryUrl)
        .put(id)
        .set('Cookie', cookie)
        .send(put)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.categoryName.should.be.eql('test');
          res.body.categoryPlace.should.be.eql(5655);
          done();
        });
    });
  });

  // Products delete test
  describe('delete()', () => {
    it('should delete given item', (done) => {
      chai.request(categoryUrl)
        .delete(id)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.categoryName.should.be.eql('put');
          res.body.categoryPlace.should.be.eql(5565);
          done();
        });
    });
  });
});

