const chai = require('chai');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const baseUrl = 'http://localhost:8080/blogpost';
chai.use(chaiHttp);

describe('Blogpost', () => {
    describe('list()', () => {
        it('response statusCode equal to 200', (done) => {
            chai.request(baseUrl)
                .get('/')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('find()', () => {
        it('response statusCode equal to 200', (done) => {
            chai.request(baseUrl)
                .get('/5aef5a75bf57fb33e86095ee')
                .end(function (err, res) {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it('response object id is exists', (done) => {
            chai.request(baseUrl)
                .get('/5aef5a7ebf57fb33e86095ef')
                .end(function (err, res) {
                    expect(res.body._id).to.exist;
                    done();
                });
        });
    });
});