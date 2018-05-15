const chai = require('chai');
const {
    expect,
} = require('chai');
const chaiHttp = require('chai-http');

const server = 'http://localhost:8080/user';
chai.use(chaiHttp);
const User = require('../models/user.js');
const should = chai.should();

chai.use(chaiHttp);


/**
 * testing listing
 */
/* describe('User', () => {
    describe('login()', () => {
        it('response statusCode equal to 200', (done) => {
            chai.request(baseUrl)
                .post('/login')
                .send({
                    'username': 'admin@admin.com',
                    'password': 'admin',
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
}); */


const loginDetails = {
    'username': 'admin@admin.com',
    'password': 'admin',
}

const registerDetails = {
    'email': 'email@email.com',
    'username': 'username',
    'password': 'example',
};


/**
 * Test the following in on scoop:
 * - Create an account, login with details, and check if token comes
 */

describe('Create Account, Login and Check Token', () => {
    beforeEach((done) => {
        // Reset user mode before each test
        User.remove({}, (err) => {
            console.log(err);
            done();
        });
    });

    describe('User', () => {
        it('it should Register, Login, and check token', (done) => {
            chai.request(server)
                .post('/register')
                .send(registerDetails) // this is like sending $http.post or this.http.post in Angular
                .end((err, res) => { // when we get a response from the endpoint
                    // in other words,
                    // the res object should have a status of 201
                    res.should.have.status(200);
                    // the property, res.body.state, we expect it to be true.
                    expect(res.body.state).to.be.true;

                    // follow up with login
                    chai.request(server)
                        .post('/login')
                        .send(loginDetails)
                        .end((err, res) => {
                            console.log('this was run the login part');
                            res.should.have.status(200);
                            expect(res.body.state).to.be.true;
                            res.body.should.have.property('token');

                            let token = res.body.token;
                            // follow up with requesting user protected page
                            chai.request(server)
                                .get('/profile')
                                // we set the auth header with our token
                                .set('Authorization', token)
                                .end((err, res) => {
                                    res.should.have.status(200);
                                    expect(res.body.state).to.be.true;
                                    res.body.data.should.be.an('object');
                                    done(); // Don't forget the done callback to indicate we're done!
                                });
                        });
                });
        });
    });
});