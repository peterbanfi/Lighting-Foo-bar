const chai = require('chai');
const {
    expect,
} = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';
chai.use(chaiHttp);

/**
 * testing listing
 */
describe('User', () => {
    describe('listAll()', () => {
        it('response statusCode equal to 200', (done) => {
            chai.request(baseUrl)
                .post('/listAll')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});