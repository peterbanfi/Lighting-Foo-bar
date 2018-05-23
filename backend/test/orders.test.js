// const chai = require('chai');
// const {
//   expect,
// } = require('chai');
// const should = require('chai').should();

// const chaiHttp = require('chai-http');

// const orderUrl = 'http://localhost:8080/orders';
// const account = {
//   username: 'admin@admin.com',
//   password: 'admin',
// };

// const comment = {
//   user: '5afc439634a9371cf8fca12bb',
//   products: [{
//     product: '5af99826722bf5522c3d40a1',
//     quantity: 3,
//   },
//   {
//     product: '5afc2bc465eb1eabd8370ab6',
//     quantity: 6,
//   },
//   ],
// };

// const put = {
//   user: '5afc439634a9371cf8fca12bb',
//   products: [{
//     product: '5af99826722bf5522c3d40a1',
//     quantity: 9,
//   },
//   {
//     product: '5afc2bc465eb1eabd8370ab6',
//     quantity: 6,
//   },
//   ],
// };
// let cookie;
// let id = '/';

// chai.use(chaiHttp);


// describe('Orders', () => {
//   // login
//   beforeEach((done) => {
//     chai.request('http://localhost:8080/orders')
//       .get('/')
//       .send(account)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         cookie = res.headers['set-cookie'].pop().split(';')[0];
//         done();
//       });
//   });

//   // Orders list test
//   describe('list()', () => {
//     it('response statusCode equal to 200', (done) => {
//       chai.request(orderUrl)
//         .get('/')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Array');
//           res.body[0].user.username.should.be.eql('Marton17');
//           done();
//         });
//     });
//   });

//   // Order find test
//   describe('find()', () => {
//     it('should find order specified by id', (done) => {
//       chai.request(orderUrl)
//         .get('/5afbe4943f04ab3b18e53303')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Object');
//           res.body.user.username.should.be.eql('admin');
//           done();
//         });
//     });
//   });

//   // Order post test
//   describe('create()', () => {
//     it('should create order in database', (done) => {
//       chai.request(orderUrl)
//         .post('/')
//         .set('Cookie', cookie)
//         .send(order)
//         .end((err, res) => {
//           id += res.body._id;
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Object');
//           res.body.products[0].quantity.should.be.eql(3);
//           done();
//         });
//     });
//   });

//   // Order update test
//   describe('update()', () => {
//     it('should update specified order with given data', (done) => {
//       chai.request(orderUrl)
//         .put(id)
//         .set('Cookie', cookie)
//         .send(put)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Object');
//           res.body.products[0].quantity.should.be.eql(9);
//           done();
//         });
//     });
//   });

//   // Order delete test
//   describe('remove()', () => {
//     it('should delete specified order', (done) => {
//       chai.request(orderUrl)
//         .delete(id)
//         .set('Cookie', cookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Object');
//           res.body.productName.should.be.eql('put');
//           done();
//         });
//     });
//   });
// });