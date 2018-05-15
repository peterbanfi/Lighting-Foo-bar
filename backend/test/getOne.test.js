const chai = require('chai');
const {
    expect,
} = require('chai');
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';
chai.use(chaiHttp);

/**
 * testing finding specified user
 */
describe('User', () => {
    describe('getOne()', () => {
        it('response statusCode equal to 200', (done) => {
            chai.request(baseUrl)
                .get('/getOne/5af98ca9a7580c1f4cb83099')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});