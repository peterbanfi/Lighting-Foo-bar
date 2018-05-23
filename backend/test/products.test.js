// const chai = require('chai');
// const {
//   expect,
// } = require('chai');
// const should = require('chai').should();

// const chaiHttp = require('chai-http');

// const productsUrl = 'http://localhost:8080/products';
// const account = {
//   username: 'admin@admin.com',
//   password: 'admin',
// };
// const product = {
//   productName: 'test',
//   productUrl: 'test',
//   productPrice: 12345,
//   productManufacturer: 'test',
// };
// const put = {
//   productName: 'put',
//   productUrl: 'put',
//   productPrice: 12345,
//   productManufacturer: 'put',
// };
// let cookie;
// let id = '/';

// chai.use(chaiHttp);


// describe('Products', () => {
//   // login
//   beforeEach((done) => {
//     chai.request('http://localhost:8080/user')
//       .post('/login')
//       .send(account)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         cookie = res.headers['set-cookie'].pop().split(';')[0];
//         done();
//       });
//   });

//   // Products list test
//   describe('list()', () => {
//     it('response statusCode equal to 200', (done) => {
//       chai.request(productsUrl)
//         .get('/')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Array');
//           res.body[0].productName.should.be.eql('kalinka');
//           done();
//         });
//     });
//   });

//   // Products find test
//   describe('find()', () => {
//     it('should find item', (done) => {
//       chai.request(productsUrl)
//         .get('/5af9917fbb6b544b14321638')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Object');
//           res.body.productName.should.be.eql('kalinka');
//           done();
//         });
//     });
//   });

//   // Products post test
//   describe('create()', () => {
//     it('should create give item', (done) => {
//       chai.request(productsUrl)
//         .post('/')
//         .set('Cookie', cookie)
//         .send(product)
//         .end((err, res) => {
//           id += res['body']['_id'];
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Object');
//           res.body.productName.should.be.eql('test');
//           done();
//         });
//     });
//   });

//   // Products update test
//   describe('update()', () => {
//     it('should update given items with given data', (done) => {
//       chai.request(productsUrl)
//         .put(id)
//         .set('Cookie', cookie)
//         .send(put)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           res.body.should.be.a('Object');
//           res.body.productName.should.be.eql('test');
//           done();
//         });
//     });
//   });

//   // Products delete test
//   describe('delete()', () => {
//     it('should delete given item', (done) => {
//       chai.request(productsUrl)
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