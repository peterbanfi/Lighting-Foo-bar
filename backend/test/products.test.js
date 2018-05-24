const chai = require('chai');
const {
  expect,
} = require('chai');
const should = require('chai').should();
const chaiHttp = require('chai-http');

const productsUrl = 'http://localhost:8080/products';
const account = {
  username: 'admin@admin.com',
  password: 'admin',
};
const product = {
  productName: 'test',
  productUrl: 'test',
  productPrice: 12345,
  productManufacturer: 'test',
  productCategory: '5b052bf5c1441623009d93d5',
};
const put = {
  productName: 'put',
  productUrl: 'put',
  productPrice: 54321,
  productManufacturer: 'put',
  productCategory: '5b052ca27e90f92b0d837bec',
};
let cookie;
let id = '/';

chai.use(chaiHttp);


describe('Products', () => {
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
      chai.request(productsUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Array');
          res.body[0]._id.should.be.eql('5af9917fbb6b544b14321638');
          res.body[0].productName.should.be.eql('kalinka');
          res.body[0].productPrice.should.be.eql(3599);
          res.body[0].productManufacturer.should.be.eql('zwack unicum');
          res.body[0].productUrl.should.be.eql('kalinka-vodka');
          res.body[0].productCategory.should.be.eql({
            _id: '5b052bf5c1441623009d93d5',
            categoryName: 'vodka',
          });
          res.body[0].createdAt.should.be.eql('2018-05-14T13:39:11.952Z');
          res.body[0].productImg.should.be.eql('http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg');
          done();
        });
    });
  });

  // Products find test
  describe('find()', () => {
    it('should find item', (done) => {
      chai.request(productsUrl)
        .get('/5af9917fbb6b544b14321638')
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body._id.should.be.eql('5af9917fbb6b544b14321638');
          res.body.productName.should.be.eql('kalinka');
          res.body.productPrice.should.be.eql(3599);
          res.body.productManufacturer.should.be.eql('zwack unicum');
          res.body.productUrl.should.be.eql('kalinka-vodka');
          res.body.productCategory.should.be.eql({
            _id: '5b052bf5c1441623009d93d5',
            categoryName: 'vodka',
          });
          res.body.createdAt.should.be.eql('2018-05-14T13:39:11.952Z');
          res.body.productImg.should.be.eql('http://localhost:8080/uploads/2018-05-14T13-39-11.938Z.jpeg');
          done();
        });
    });
  });

  // Products post test
  describe('create()', () => {
    it('should create give item', (done) => {
      chai.request(productsUrl)
        .post('/')
        .set('Cookie', cookie)
        .send(product)
        .end((err, res) => {
          id += res['body']['_id'];
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.productName.should.be.eql('test');
          res.body.productPrice.should.be.eql(12345);
          res.body.productManufacturer.should.be.eql('test');
          res.body.productUrl.should.be.eql('test');
          res.body.productCategory.should.be.eql('5b052bf5c1441623009d93d5');
          done();
        });
    });
  });

  // Products update test
  describe('update()', () => {
    it('should update given items with given data', (done) => {
      chai.request(productsUrl)
        .put(id)
        .set('Cookie', cookie)
        .send(put)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.productName.should.be.eql('test');
          res.body.productPrice.should.be.eql(12345);
          res.body.productManufacturer.should.be.eql('test');
          res.body.productUrl.should.be.eql('test');
          res.body.productCategory.should.be.eql('5b052bf5c1441623009d93d5');
          done();
        });
    });
  });

  // Products delete test
  describe('delete()', () => {
    it('should delete given item', (done) => {
      chai.request(productsUrl)
        .delete(id)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.productName.should.be.eql('put');
          res.body.productPrice.should.be.eql(54321);
          res.body.productManufacturer.should.be.eql('put');
          res.body.productUrl.should.be.eql('put');
          res.body.productCategory.should.be.eql('5b052ca27e90f92b0d837bec');
          done();
        });
    });
  });
});
