const chai = require('chai');
const {
    expect,
} = require('chai');
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';
chai.use(chaiHttp);

/**
 * testing listing
 */
describe('User', () => {
    describe('remove()', () => {
        it('response statusCode equal to 204', (done) => {
            chai.request(baseUrl)
                .delete('/remove/5af978175590e71398bd7380')
                .end((err, res) => {
                    expect(res).to.have.status(204);
                    done();
                });
        });
    });
});