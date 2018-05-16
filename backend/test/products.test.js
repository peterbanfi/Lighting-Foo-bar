const chai = require('chai');
const {
  expect,
} = require('chai');

const chaiHttp = require('chai-http');

const productsUrl = 'http://localhost:8080/products';

chai.use(chaiHttp);

// Products list test
describe('Products', () => {
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(productsUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});

// Products find test
describe('Products', () => {
  describe('find()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(productsUrl)
        .get('/5af9917fbb6b544b14321638')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});


// Products delete test
// Products update test
// Products post test
