const chai = require('chai');
const {
  expect,
} = require('chai');
const should = require('chai').should();
const chaiHttp = require('chai-http');
const userUrl = 'http://localhost:8080/user';
const account = {
  username: 'test@test.com',
  password: 'testtest',
};
const newAccount = {
  email: 'test8@test.com',
  username: 'test8',
  password: 'testtest8',
  rights: true,
};
const newAccount2 = {
  email: 'admin@admin.com',
  username: 'admin',
  password: 'admin',
  rights: true,
};
const put = {
  email: 'put@put.com',
  username: 'put',
  password: 'testtest',
  rights: false,
};
const put2 = {
  email: 'put@put.com',
  username: 'put',
  password: 'testtest',
  rights: false,
};
let cookie;
let id = '/';
chai.use(chaiHttp);
describe('User', () => {
  // User register new test
  describe('register()', () => {
    it('registers new user', (done) => {
      chai.request(userUrl)
        .post('/register')
        .send(newAccount)
        .end((err, res) => {
          id += res.body._id;
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.username.should.be.eql('test8');
          done();
        });
    });
  });
  // User register existing test
  describe('register()', () => {
    it('tries to registers existing user', (done) => {
      chai.request(userUrl)
        .post('/register')
        .send(newAccount)
        .end((err, res) => {
          expect(res).to.have.status(500);
          res.body.should.be.a('Object');
          res.body.error.name.should.be.eql('UserExistsError');
          done();
        });
    });
  });
  // User login test
  describe('login()', () => {
    it('login with new user', (done) => {
      chai.request(userUrl)
        .post('/login')
        .send({
          username: 'admin@admin.com',
          password: 'admin'
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.should.be.eql({
            "login": true,
            "user": {
              "username": "admin@admin.com",
              "password": "admin"
            }
          });
          done();
        });
    });
  });
  // login
  beforeEach((done) => {
    chai.request('http://localhost:8080/user')
      .post('/login')
      .send({
        username: 'admin@admin.com',
        password: 'admin'
      })
      .end((err, res) => {
        if (err) {
          console.log(err);
          throw err;
        }
        cookie = res.headers['set-cookie'].pop().split(';')[0];
        done();
      });
  });
  // User logout test
  describe('logout()', () => {
    it('log new user out', (done) => {
      chai.request(userUrl)
        .get('/logout')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.success.should.be.eql('Sikeres kilépés');
          done();
        });
    });
  });
  // Users list test
  describe('listall()', () => {
    it('list all users', (done) => {
      chai.request(userUrl)
        .get('/listAll')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Array');
          res.body[0].username.should.be.eql('Marton17');
          done();
        });
    });
  });
  // Users getOne test
  describe('getOne()', () => {
    it('finds one users', (done) => {
      chai.request(userUrl)
        .get(`/getOne/5afa961c9454c01ea4b35bfc`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.username.should.be.eql('admin');
          done();
        });
    });
  });
  // Users update test
  describe('update()', () => {
    it('should update user without auth', (done) => {
      chai.request(userUrl)
        .put(`/update/5b05cf80630cbd1b54682c8c`)
        .set('Cookie', cookie)
        .send(put)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.username.should.be.eql('put');
          done();
        });
    });
  });
  // Users update2 test
  describe('update()', () => {
    it('should update user with auth', (done) => {
      chai.request(userUrl)
        .put(`/update/5b05cf80630cbd1b54682c8c`)
        .set('Cookie', cookie)
        .send(put2)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.username.should.be.eql('put');
          done();
        });
    });
  });
  // User delete test
  describe('remove()', () => {
    it('deletes user', (done) => {
      chai.request(userUrl)
        .delete(`/remove${id}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          res.body.should.be.a('Object');
          res.body.success.should.be.eql('Sikeres törlés');
          done();
        });
    });
  });
});