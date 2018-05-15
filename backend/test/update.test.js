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
    describe('update()', () => {
        it('response statusCode equal to 200', (done) => {
            chai.request(baseUrl)
                .put('/update/5af978175590e71398bd7380')
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
});