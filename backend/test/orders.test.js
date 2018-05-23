const chai = require('chai');
const {
  expect,
} = require('chai');
const should = require('chai').should();

const chaiHttp = require('chai-http');

const orderUrl = 'http://localhost:8080/orders';
const account = {
  username: 'admin@admin.com',
  password: 'admin',
};

<<<<<<< HEAD
const order = {
  user: '5afa961c9454c01ea4b35bfc',
  address: {
    city: 'test',
    address: 'test',
    address2: 'test',
    zip: 1234,
  },
  invoiceAddress: {
    city: 'test2',
    address: 'test2',
    address2: 'test2',
    zip: 4321,
  },
=======
const comment = {
  user: '5afc439634a9371cf8fca12bb',
>>>>>>> 0d826dca7bca3f5efef454095b521095f70c4806
  products: [{
    product: '5af9917fbb6b544b14321638',
    quantity: 1,
  },
  {
    product: '5af99826722bf5522c3d40a1',
    quantity: 2,
  },
  ],
};

const put = {
  user: '5afa961c9454c01ea4b35bfc',
  address: {
    city: 'put',
    address: 'put',
    address2: 'put',
    zip: 2345,
  },
  invoiceAddress: {
    city: 'put2',
    address: 'put2',
    address2: 'put2',
    zip: 3456,
  },
  products: [{
    product: '5af99826722bf5522c3d40a1',
    quantity: 3,
  },
  {
    product: '5af9917fbb6b544b14321638',
    quantity: 4,
  },
  ],
};
let cookie;
let id = '/';

chai.use(chaiHttp);


describe('Orders', () => {
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

  // Orders list test
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(orderUrl)
        .get('/')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Array');
          res.body[0].user._id.should.be.eql('5af98ca9a7580c1f4cb83099');
          res.body[0].user.username.should.be.eql('Marton17');
          res.body[0]._id.should.be.eql('5afa9f505557c213f0fa864b');
          res.body[0].createdAt.should.be.eql('2018-04-24T08:50:24.408Z');
          done();
        });
    });
  });

  // Order find test
  describe('find()', () => {
    it('should find order specified by id', (done) => {
      chai.request(orderUrl)
        .get('/5afbe4943f04ab3b18e53303')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.user.username.should.be.eql('admin');
          res.body.user._id.should.be.eql('5afa961c9454c01ea4b35bfc');
          res.body._id.should.be.eql('5afbe4943f04ab3b18e53303');
          res.body.createdAt.should.be.eql('2018-05-01T07:58:12.584Z');
          res.body.products[0].quantity.should.be.eql(10);
          res.body.products[1].quantity.should.be.eql(4);
          res.body.products[2].quantity.should.be.eql(15);
          done();
        });
    });
  });

  // Order post test
  describe('create()', () => {
    it('should create order in database', (done) => {
      chai.request(orderUrl)
        .post('/')
        .set('Cookie', cookie)
        .send(order)
        .end((err, res) => {
          id += res.body._id;
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.user.should.be.eql('5afa961c9454c01ea4b35bfc');
          res.body.products[0].product.should.be.eql('5af9917fbb6b544b14321638');
          res.body.products[0].quantity.should.be.eql(1);
          res.body.products[1].product.should.be.eql('5af99826722bf5522c3d40a1');
          res.body.products[1].quantity.should.be.eql(2);
          res.body.address.should.be.eql({
            city: 'test', address: 'test', address2: 'test', zip: 1234,
          });
          res.body.invoiceAddress.should.be.eql({
            city: 'test2', address: 'test2', address2: 'test2', zip: 4321,
          });
          done();
        });
    });
  });

  // Order update test
  describe('update()', () => {
    it('should update specified order with given data', (done) => {
      chai.request(orderUrl)
        .put(id)
        .set('Cookie', cookie)
        .send(put)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.user.should.be.eql('5afa961c9454c01ea4b35bfc');
          res.body.products[0].product.should.be.eql('5af9917fbb6b544b14321638');
          res.body.products[0].quantity.should.be.eql(1);
          res.body.products[1].product.should.be.eql('5af99826722bf5522c3d40a1');
          res.body.products[1].quantity.should.be.eql(2);
          res.body.address.should.be.eql({
            city: 'test', address: 'test', address2: 'test', zip: 1234,
          });
          res.body.invoiceAddress.should.be.eql({
            city: 'test2', address: 'test2', address2: 'test2', zip: 4321,
          });
          done();
        });
    });
  });

  // Order delete test
  describe('remove()', () => {
    it('should delete specified order', (done) => {
      chai.request(orderUrl)
        .delete(id)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.user.should.be.eql('5afa961c9454c01ea4b35bfc');
          res.body.products[0].product.should.be.eql('5af99826722bf5522c3d40a1');
          res.body.products[0].quantity.should.be.eql(3);
          res.body.products[1].product.should.be.eql('5af9917fbb6b544b14321638');
          res.body.products[1].quantity.should.be.eql(4);
          res.body.address.should.be.eql({
            city: 'put', address: 'put', address2: 'put', zip: 2345,
          });
          res.body.invoiceAddress.should.be.eql({
            city: 'put2', address: 'put2', address2: 'put2', zip: 3456,
          });
          done();
        });
    });
  });
});
